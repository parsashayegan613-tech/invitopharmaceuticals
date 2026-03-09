"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import FAQ from "@/components/FAQ";

const ContactUsContent = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const getFieldError = (field: string, value: string, label: string) => {
        if (!touched[field]) return null;
        if (!value.trim()) return `${label} is required`;
        if (field === "email" && !isValidEmail(value)) return "Please enter a valid email address";
        return null;
    };

    const fieldClass = (field: string, value: string) =>
        `transition-all duration-300 focus:shadow-md ${touched[field] && !value.trim() ? "border-red-400 focus:border-red-500" : ""}${touched.email && field === "email" && value.trim() && !isValidEmail(value) ? "border-red-400 focus:border-red-500" : ""}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert({
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone: formData.phone || null,
                    email: formData.email,
                    message: formData.message,
                });

            if (error) throw error;

            // Invoke the edge function to send an email notification
            const { error: edgeError } = await supabase.functions.invoke('send-contact-email', {
                body: formData,
            });

            if (edgeError) {
                console.error("Error sending email notification:", edgeError);
                // We still show success since the DB insert succeeded, but we log the email error
            }

            // Redirect to Thank You page using query params (Next.js App Router has no router state)
            const params = new URLSearchParams({
                type: "contact",
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
            });
            router.push(`/thank-you?${params.toString()}`);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            toast({
                title: "Submission failed",
                description: "There was an error sending your message. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: MapPin, label: "Address", value: "9407-20 Ave, NW, Edmonton, AB, Canada, T6N 1E5" },
        { icon: Phone, label: "Phone", value: "780.709.5678" },
        { icon: Mail, label: "Email", value: "info@invitvo.com" },
        { icon: Clock, label: "Business Hours", value: "Monday - Friday: 9:00 AM - 5:00 PM MST" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <PageHero title="Contact Us" />

                {/* Contact Info & Form */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Contact Information */}
                            <FadeInOnScroll direction="left">
                                <div>
                                    <h3 className="text-2xl font-light text-foreground mb-8">Get in Touch</h3>
                                    <div className="space-y-6">
                                        {contactInfo.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-start gap-4 group"
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                                                    <item.icon className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                                    <p className="text-foreground">{item.value}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            {/* Contact Form */}
                            <FadeInOnScroll direction="right" delay={0.2}>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Name <span className="text-primary">*</span>
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Input
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    onBlur={() => handleBlur("firstName")}
                                                    className={fieldClass("firstName", formData.firstName)}
                                                    required
                                                />
                                                {getFieldError("firstName", formData.firstName, "First name") && (
                                                    <span className="text-xs text-red-500">{getFieldError("firstName", formData.firstName, "First name")}</span>
                                                )}
                                                <span className="text-xs text-muted-foreground mt-1 block">First</span>
                                            </div>
                                            <div>
                                                <Input
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    onBlur={() => handleBlur("lastName")}
                                                    className={fieldClass("lastName", formData.lastName)}
                                                    required
                                                />
                                                {getFieldError("lastName", formData.lastName, "Last name") && (
                                                    <span className="text-xs text-red-500">{getFieldError("lastName", formData.lastName, "Last name")}</span>
                                                )}
                                                <span className="text-xs text-muted-foreground mt-1 block">Last</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Phone</label>
                                        <Input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="transition-all duration-300 focus:shadow-md"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Email <span className="text-primary">*</span>
                                        </label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            onBlur={() => handleBlur("email")}
                                            className={fieldClass("email", formData.email)}
                                            required
                                        />
                                        {getFieldError("email", formData.email, "Email") && (
                                            <span className="text-xs text-red-500 mt-1">{getFieldError("email", formData.email, "Email")}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Comment or Message</label>
                                        <Textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={5}
                                            className="transition-all duration-300 focus:shadow-md"
                                        />
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Sending..." : "Submit"}
                                        </Button>
                                    </motion.div>
                                </form>
                            </FadeInOnScroll>
                        </div>
                    </div>
                </section>

                {/* Map */}
                <section className="bg-section-alt">
                    <div className="container mx-auto px-4 max-w-5xl py-16">
                        <FadeInOnScroll>
                            <h3 className="text-2xl font-light text-foreground mb-8 text-center">Our Location</h3>
                        </FadeInOnScroll>
                        <FadeInOnScroll delay={0.2}>
                            <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
                                <iframe
                                    src="https://maps.google.com/maps?q=9407+20+Ave+NW,+Edmonton,+AB+T6N+1E5,+Canada&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="InVitvo Pharmaceuticals Location"
                                    className="w-full h-full"
                                />
                            </div>
                            <p className="text-center text-muted-foreground mt-4">
                                9407-20 Ave, NW, Edmonton, AB, Canada, T6N 1E5
                            </p>
                        </FadeInOnScroll>
                    </div>
                </section>

                {/* FAQ */}
                <FAQ className="py-16 bg-background" />
            </main>
            <Footer />
        </div>
    );
};

export default ContactUsContent;
