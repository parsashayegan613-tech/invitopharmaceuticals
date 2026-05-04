"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, FileCheck, Clock, Home, ArrowLeft, MessageSquare } from "lucide-react";
import { Suspense } from "react";

// Inner component uses useSearchParams — must be wrapped in Suspense
const ThankYouInner = () => {
    const searchParams = useSearchParams();

    const type = searchParams.get("type"); // "contact" | "order"
    const isContactForm = type === "contact";

    const orderSteps = [
        { icon: Mail, title: "RFQ Review", description: "Our team will review your request within 1-2 business days." },
        { icon: FileCheck, title: "Formal Quote", description: "You'll receive a detailed quotation with pricing and lead times." },
        { icon: Clock, title: "Order Confirmation", description: "Confirm your order via email and submit payment or PO." },
    ];

    const contactSteps = [
        { icon: Mail, title: "Message Received", description: "Our team has received your message and will review it shortly." },
        { icon: MessageSquare, title: "We'll Respond", description: "Expect a reply within 1-2 business days at the email you provided." },
        { icon: Clock, title: "Follow Up", description: "If your inquiry is urgent, call us at +1-780-709-5678." },
    ];

    const steps = isContactForm ? contactSteps : orderSteps;

    return (
        <main id="main-content" tabIndex={-1} className="flex-grow bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-2xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-3xl md:text-4xl font-light text-foreground mb-3">
                        Thank You!
                    </h1>
                    <p className="text-muted-foreground text-lg mb-2">
                        {isContactForm
                            ? "Your message has been sent successfully."
                            : "Your Request for Quotation has been submitted successfully."}
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                        {isContactForm
                            ? "We'll respond as soon as possible."
                            : "A confirmation email has been sent to the address provided in your RFQ."}
                    </p>
                </motion.div>

                {/* What Happens Next */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <h2 className="text-xl font-medium text-foreground mb-6">What Happens Next</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center">
                                    <step.icon className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">Step {index + 1}</p>
                                <h4 className="font-medium text-foreground text-sm mb-1">{step.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link href="/">
                        <Button className="gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/products/terrein">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            View Terrein
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
};

const ThankYouContent = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            {/* Suspense is required when useSearchParams is used in a client component */}
            <Suspense fallback={
                <main id="main-content" tabIndex={-1} className="flex-grow flex items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                </main>
            }>
                <ThankYouInner />
            </Suspense>
            <Footer />
        </div>
    );
};

export default ThankYouContent;
