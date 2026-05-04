"use client";

import { motion } from "framer-motion";
import FadeInOnScroll from "./animations/FadeInOnScroll";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/faqs";

interface FAQProps {
    className?: string;
}

const FAQ = ({ className = "py-20 bg-section-alt" }: FAQProps) => {
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
