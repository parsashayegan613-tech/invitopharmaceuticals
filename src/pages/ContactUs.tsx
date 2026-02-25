import { useState } from "react";
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
import { MapPin, Phone, Mail, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We will get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
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

  const faqs = [
    {
      question: "How can I place an order for Terrein?",
      answer: "You can place an order through our Order page. Select your desired quantity and fill out the order request form. Our team will contact you to process your order and discuss payment and shipping details."
    },
    {
      question: "What is the purity level of your Terrein?",
      answer: "Our Terrein is purified to >95% purity, verified by UHPLC analysis. The structure is confirmed using Tandem Mass spectroscopy and NMR."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to research institutions worldwide. Shipping costs and delivery times vary by location. Please contact us for specific shipping inquiries."
    },
    {
      question: "Can I request a custom quantity?",
      answer: "Yes, we can accommodate custom quantity requests for research purposes. Please contact us directly to discuss your specific needs."
    },
    {
      question: "How can I invest in InVitvo Pharmaceuticals?",
      answer: "We welcome investor inquiries. Please contact our research team through this form or email us directly at info@invitvo.com for more information about investment opportunities."
    },
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
                          required
                          className="transition-all duration-300 focus:shadow-md"
                        />
                        <span className="text-xs text-muted-foreground mt-1 block">First</span>
                      </div>
                      <div>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
                          className="transition-all duration-300 focus:shadow-md"
                        />
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
                      required
                      className="transition-all duration-300 focus:shadow-md"
                    />
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
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://maps.google.com/maps?q=9407+20+Ave+NW,+Edmonton,+AB+T6N+1E5,+Canada&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="InVitvo Pharmaceuticals Location"
                  className="w-full"
                />
              </div>
              <p className="text-center text-muted-foreground mt-4">
                9407-20 Ave, NW, Edmonton, AB, Canada, T6N 1E5
              </p>
            </FadeInOnScroll>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <FadeInOnScroll>
              <h3 className="text-2xl font-light text-foreground mb-8 text-center">Frequently Asked Questions</h3>
            </FadeInOnScroll>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FadeInOnScroll key={index} delay={index * 0.1}>
                  <motion.div
                    className="bg-card border border-border rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium text-foreground">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
