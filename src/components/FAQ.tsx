"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
    className?: string;
}

const FAQ = ({ className = "py-20 bg-section-alt" }: FAQProps) => {
    const faqs = [
        {
            question: "How do I place an order or request a quote?",
            answer: "You can initiate an order by submitting a Request for Quotation (RFQ) through our website. Select your desired quantity or specify custom requirements, and our team will provide a formal quote within 1-2 business days including shipping and payment details."
        },
        {
            question: "What is your Minimum Order Quantity (MOQ)?",
            answer: "We offer flexible ordering for research labs. Our standard catalog sizes for Terrein are 5mg and 10mg, but we can accommodate bulk research requirements upon consultation."
        },
        {
            question: "What is the purity level and documentation provided?",
            answer: "Our Terrein is purified to >95% purity, verified by UHPLC analysis, with structures confirmed via Tandem Mass Spectroscopy and NMR. Every order is accompanied by a batch-specific Certificate of Analysis (COA) and a full Safety Data Sheet (SDS)."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes. While we are proudly based in Edmonton, Canada with 5-7 day domestic shipping, we regularly fulfill orders to research institutions across the US and internationally. International lead times vary by destination."
        },
        {
            question: "Are your products intended for clinical use?",
            answer: "No. All compounds provided by InVitvo Pharmaceuticals are strictly for Research Use Only (RUO). They are not intended for human, veterinary, diagnostic, or therapeutic use."
        }
    ];

    return (
        <section className={className}>
            <div className="container mx-auto px-4 max-w-3xl">
                <FadeInOnScroll>
                    <div className="text-center mb-12">
                        <h2 className="section-title mb-4">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground text-lg">Common inquiries from our research partners</p>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll delay={0.2}>
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className={index === faqs.length - 1 ? "border-b-0" : ""}>
                                    <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors py-4">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6 pt-1">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </FadeInOnScroll>
            </div>
        </section>
    );
};

export default FAQ;
