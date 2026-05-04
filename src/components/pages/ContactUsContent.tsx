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
import FAQ from "@/components/FAQ";
import { trackEmailClick, trackEvent, trackPhoneClick } from "@/lib/analytics";

const ContactUsContent = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [submissionId] = useState(() =>
        typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : undefined
    );
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        companyWebsite: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [formAlert, setFormAlert] = useState("");

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
        setFormAlert("");

        const requiredFields = ["firstName", "lastName", "email", "message"];
        setTouched((prev) => ({
            ...prev,
            ...Object.fromEntries(requiredFields.map((field) => [field, true])),
        }));

        const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData].trim());
        const invalidEmail = formData.email.trim() && !isValidEmail(formData.email);

        if (missingFields.length > 0 || invalidEmail) {
            setFormAlert("Please fix the highlighted fields before submitting your message.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    submission_id: submissionId,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone || null,
                    email: formData.email,
                    message: formData.message,
                    company_website: formData.companyWebsite,
                }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || "Contact submission failed");
            }

            trackEvent("contact_submit", {
                form_type: "contact",
                has_phone: Boolean(formData.phone.trim()),
            });

            router.push("/thank-you?type=contact");
        } catch {
            toast({
                title: "Submission failed",
                description: "There was an error sending your message. Please try again later.",
                variant: "destructive",
            });
            setFormAlert("Your message could not be sent. Please try again or email info@invitvo.com.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { icon: MapPin, label: "Address", value: "9407-20 Ave, NW, Edmonton, AB, Canada, T6N 1E5" },
        { icon: Phone, label: "Phone", value: "+1-780-709-5678", href: "tel:+17807095678" },
        { icon: Mail, label: "Email", value: "info@invitvo.com", href: "mailto:info@invitvo.com" },
        { icon: Clock, label: "Business Hours", value: "Monday - Friday: 9:00 AM - 5:00 PM MST" },
    ];

    const firstNameError = getFieldError("firstName", formData.firstName, "First name");
    const lastNameError = getFieldError("lastName", formData.lastName, "Last name");
    const emailError = getFieldError("email", formData.email, "Email");
    const messageError = getFieldError("message", formData.message, "Message");

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
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
                                                    {item.href ? (
                                                        <a
                                                            href={item.href}
                                                            onClick={() => {
                                                                if (item.label === "Phone") trackPhoneClick("contact_page");
                                                                if (item.label === "Email") trackEmailClick("contact_page");
                                                            }}
                                                            className="inline-flex min-h-11 items-center text-foreground hover:text-primary transition-colors"
                                                        >
                                                            {item.value}
                                                        </a>
                                                    ) : (
                                                        <p className="text-foreground">{item.value}</p>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            {/* Contact Form */}
                            <FadeInOnScroll direction="right" delay={0.2}>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-6"
                                    noValidate
                                    aria-describedby={formAlert ? "contact-form-alert" : undefined}
                                >
                                    {formAlert && (
                                        <div
                                            id="contact-form-alert"
                                            role="alert"
                                            aria-live="assertive"
                                            className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                                        >
                                            {formAlert}
                                        </div>
                                    )}
                                    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                                        <label htmlFor="contact_company_website">Company website</label>
                                        <input
                                            id="contact_company_website"
                                            name="company_website"
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={formData.companyWebsite}
                                            onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                                        />
                                    </div>
                                    <fieldset>
                                        <legend className="block text-sm font-medium mb-2">
                                            Name <span className="text-primary">*</span>
                                        </legend>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="contact_first_name" className="sr-only">First name</label>
                                                <Input
                                                    id="contact_first_name"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    onBlur={() => handleBlur("firstName")}
                                                    className={fieldClass("firstName", formData.firstName)}
                                                    aria-invalid={Boolean(firstNameError)}
                                                    aria-describedby={firstNameError ? "contact_first_name_error" : "contact_first_name_hint"}
                                                    aria-required="true"
                                                    required
                                                />
                                                {firstNameError && (
                                                    <span id="contact_first_name_error" role="alert" className="text-xs text-red-500">{firstNameError}</span>
                                                )}
                                                <span id="contact_first_name_hint" className="text-xs text-muted-foreground mt-1 block">First</span>
                                            </div>
                                            <div>
                                                <label htmlFor="contact_last_name" className="sr-only">Last name</label>
                                                <Input
                                                    id="contact_last_name"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    onBlur={() => handleBlur("lastName")}
                                                    className={fieldClass("lastName", formData.lastName)}
                                                    aria-invalid={Boolean(lastNameError)}
                                                    aria-describedby={lastNameError ? "contact_last_name_error" : "contact_last_name_hint"}
                                                    aria-required="true"
                                                    required
                                                />
                                                {lastNameError && (
                                                    <span id="contact_last_name_error" role="alert" className="text-xs text-red-500">{lastNameError}</span>
                                                )}
                                                <span id="contact_last_name_hint" className="text-xs text-muted-foreground mt-1 block">Last</span>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div>
                                        <label htmlFor="contact_phone" className="block text-sm font-medium mb-2">Phone</label>
                                        <Input
                                            id="contact_phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="transition-all duration-300 focus:shadow-md"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="contact_email" className="block text-sm font-medium mb-2">
                                            Email <span className="text-primary">*</span>
                                        </label>
                                        <Input
                                            id="contact_email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            onBlur={() => handleBlur("email")}
                                            className={fieldClass("email", formData.email)}
                                            aria-invalid={Boolean(emailError)}
                                            aria-describedby={emailError ? "contact_email_error" : undefined}
                                            aria-required="true"
                                            required
                                        />
                                        {emailError && (
                                            <span id="contact_email_error" role="alert" className="mt-1 block text-xs text-red-500">{emailError}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="contact_message" className="block text-sm font-medium mb-2">Comment or Message <span className="text-primary">*</span></label>
                                        <Textarea
                                            id="contact_message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            onBlur={() => handleBlur("message")}
                                            rows={5}
                                            className="transition-all duration-300 focus:shadow-md"
                                            aria-invalid={Boolean(messageError)}
                                            aria-describedby={messageError ? "contact_message_error" : undefined}
                                            aria-required="true"
                                            required
                                        />
                                        {messageError && (
                                            <span id="contact_message_error" role="alert" className="mt-1 block text-xs text-red-500">{messageError}</span>
                                        )}
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button
                                            type="submit"
                                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
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
