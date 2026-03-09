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
            answer: "We offer flexible ordering specifically designed for research labs. Our standard catalog sizes for Terrein are 5mg and 10mg, but we frequently accommodate custom quantities to fit distinct experimental needs without enforcing massive industrial MOQs."
        },
        {
            question: "What is the purity level and documentation provided?",
            answer: "Our natural compound research products, such as Terrein, are purified to >95% purity, verified by UHPLC analysis. Structures are confirmed via Tandem Mass Spectroscopy and NMR. Every single order is accompanied by a batch-specific Certificate of Analysis (COA) and a detailed Safety Data Sheet (SDS) for compliance."
        },
        {
            question: "What payment methods are accepted for institutional orders?",
            answer: "We understand academic and corporate purchasing workflows. We accept Institutional Purchase Orders (Net 30 terms), Wire Transfers, major Credit Cards, and PayPal to ensure acquiring your research compounds is completely frictionless."
        },
        {
            question: "Can you accommodate custom synthesis or bulk scale-up?",
            answer: "Yes. For industry partners or academic laboratories requiring larger quantities of Terrein or other specific microbial metabolites, please submit a custom RFQ. We work closely with our partners to scope out bulk purification pipelines and scale-up timelines."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we proudly support global research. While we are based in Edmonton, Canada with rapid 5-7 day domestic shipping, we routinely fulfill and ship orders to research institutions across the US, Europe, and internationally. Lead times vary by destination."
        },
        {
            question: "What are your compounds typically used for?",
            answer: "Our compounds are highly sought after by academic institutions and pharmaceutical R&D labs for use in assay development, analytical chromatography calibration, reference standards, and as novel starting materials in preclinical pharmacological investigations."
        },
        {
            question: "Are your products intended for clinical use?",
            answer: "No. All compounds provided by InVitvo Pharmaceuticals are strictly for Research Use Only (RUO). They are absolutely not intended for human, veterinary, diagnostic, or therapeutic use under any circumstances."
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
