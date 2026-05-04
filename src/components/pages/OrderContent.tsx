"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import RuoDisclaimer from "@/components/RuoDisclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Check, Clock, Mail, FileCheck, ShieldCheck, Building2, LockKeyhole } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { trackEmailClick, trackEvent, trackPhoneClick } from "@/lib/analytics";
import { terrein } from "@/lib/terrein";

const products = [
    { id: "terrein-5mg", name: `Terrein ${terrein.purity}`, amount: "5 mg", price: "C$450", catalog: "INV-TER-005" },
    { id: "terrein-10mg", name: `Terrein ${terrein.purity}`, amount: "10 mg", price: "C$800", catalog: "INV-TER-010" },
    { id: "terrein-custom", name: `Terrein ${terrein.purity}`, amount: "Custom", price: "Quote", catalog: "INV-TER-XXX" },
];

const howHeardOptions = [
    "PubChem",
    "Paper citation",
    "Google/search",
    "Referral",
    "SciFinder/vendor platform",
    "Other",
];

const freeEmailDomains = new Set([
    "gmail.com",
    "googlemail.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "msn.com",
    "yahoo.com",
    "icloud.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
]);

const getEmailDomain = (email: string) => email.trim().toLowerCase().split("@")[1] || "";

const OrderContent = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState("terrein-5mg");
    const [formStartedAt] = useState(() => new Date().toISOString());
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        institution: "",
        department: "",
        piName: "",
        intendedUse: "",
        customQuantity: "",
        howHeard: "",
        additionalNotes: "",
        companyWebsite: "",
    });
    const [acceptRuo, setAcceptRuo] = useState(false);
    const [acceptQualified, setAcceptQualified] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const quantity = params.get("quantity")?.toLowerCase().replace(/\s+/g, "");
        const sku = params.get("sku")?.toLowerCase();

        if (quantity === "10mg" || sku === "inv-ter-010") {
            setSelectedProduct("terrein-10mg");
        } else if (quantity === "custom" || sku === "inv-ter-xxx") {
            setSelectedProduct("terrein-custom");
        } else if (quantity === "5mg" || sku === "inv-ter-005" || params.get("product") === "terrein") {
            setSelectedProduct("terrein-5mg");
        }
    }, []);

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const emailDomain = getEmailDomain(formData.email);
    const usesFreeEmailDomain = emailDomain ? freeEmailDomains.has(emailDomain) : false;

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

        const product = products.find((p) => p.id === selectedProduct);
        if (!product) {
            toast({
                title: "Please select a product",
                description: "Choose a product before submitting your RFQ.",
                variant: "destructive",
            });
            return;
        }

        if (selectedProduct === "terrein-custom" && !formData.customQuantity.trim()) {
            toast({
                title: "Custom quantity required",
                description: "Specify the quantity you want quoted.",
                variant: "destructive",
            });
            return;
        }

        if (!acceptRuo || !acceptQualified || !acceptTerms) {
            toast({
                title: "Please accept the required terms",
                description: "RUO, qualified researcher, and terms acknowledgements are required.",
                variant: "destructive",
            });
            return;
        }

        const payload = {
            product_id: product.id,
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone || null,
            institution: formData.institution,
            department: formData.department || null,
            pi_name: formData.piName || null,
            intended_use: formData.intendedUse,
            custom_quantity: formData.customQuantity || null,
            how_heard: formData.howHeard || null,
            additional_notes: formData.additionalNotes || null,
            ruo_acknowledged: acceptRuo,
            qualified_acknowledged: acceptQualified,
            terms_accepted: acceptTerms,
            company_website: formData.companyWebsite,
            form_started_at: formStartedAt,
        };

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/rfq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || "RFQ submission failed");
            }

            trackEvent("rfq_submit", {
                compound: terrein.name,
                cas: terrein.cas,
                quantity: product.amount,
                catalog: product.catalog,
                custom_quantity_requested: selectedProduct === "terrein-custom",
                free_email_domain: usesFreeEmailDomain,
                how_heard: formData.howHeard || "not_provided",
            });

            router.push("/thank-you?type=order");
        } catch (error) {
            console.error("RFQ submission error:", error);
            toast({
                title: "Submission failed",
                description: "There was an error sending your RFQ. Please try again or email us directly at info@invitvo.com.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatHappensNext = [
        { icon: Mail, title: "RFQ Review", description: "Our team reviews your request within 1-2 business days" },
        { icon: FileCheck, title: "Formal Quote", description: "You'll receive a quotation with final pricing and lead times" },
        { icon: Clock, title: "Order Confirmation", description: "Shipping details and payment are collected after quote acceptance" },
    ];

    const trustSignals = [
        { icon: Building2, title: "Founded in Edmonton", description: "Canadian research compound supplier founded in 2021" },
        { icon: FileCheck, title: "COA and SDS included", description: "Batch documentation is provided with every order" },
        { icon: LockKeyhole, title: "Confidential RFQs", description: "Research details are used only to qualify and quote the request" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <PageHero title="Request a Quote" />

                <section className="py-6 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <RuoDisclaimer />
                    </div>
                </section>

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <h3 className="text-2xl font-light text-foreground mb-2 text-center">
                                Request for Quotation (RFQ)
                            </h3>
                            <p className="text-muted-foreground text-center mb-8">
                                Submit the minimum details needed for a formal research-use quote within 1-2 business days.
                            </p>
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={0.05}>
                            <div className="grid md:grid-cols-3 gap-4 mb-10">
                                {trustSignals.map((signal) => (
                                    <div key={signal.title} className="border border-border rounded-lg p-4 bg-card h-full">
                                        <signal.icon className="w-5 h-5 text-primary mb-3" />
                                        <h4 className="font-medium text-foreground mb-1">{signal.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{signal.description}</p>
                                    </div>
                                ))}
                            </div>
                        </FadeInOnScroll>

                        <form onSubmit={handleSubmit}>
                            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                                <label htmlFor="company_website">Company website</label>
                                <input
                                    id="company_website"
                                    name="company_website"
                                    type="text"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    value={formData.companyWebsite}
                                    onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })}
                                />
                            </div>

                            <FadeInOnScroll delay={0.1}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">1. Product and Quantity</h4>
                                    <div className="overflow-hidden rounded-lg border border-border">
                                        <table className="w-full">
                                            <thead className="bg-muted">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Catalog #</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Product</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                                                    <th className="px-4 py-3 text-right text-sm font-medium text-foreground">Price</th>
                                                    <th className="px-4 py-3 text-center text-sm font-medium text-foreground">Select</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {products.map((product) => (
                                                    <motion.tr
                                                        key={product.id}
                                                        className={`cursor-pointer transition-colors duration-200 ${selectedProduct === product.id
                                                            ? "bg-primary/10"
                                                            : "hover:bg-muted/50"
                                                            }`}
                                                        onClick={() => setSelectedProduct(product.id)}
                                                        whileHover={{ scale: 1.002 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{product.catalog}</td>
                                                        <td className="px-4 py-3 text-sm text-muted-foreground">{product.name}</td>
                                                        <td className="px-4 py-3 text-sm text-muted-foreground">{product.amount}</td>
                                                        <td className="px-4 py-3 text-sm text-foreground font-medium text-right">{product.price}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            <div className={`w-5 h-5 mx-auto rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${selectedProduct === product.id
                                                                ? "border-primary bg-primary"
                                                                : "border-muted-foreground"
                                                                }`}>
                                                                {selectedProduct === product.id && (
                                                                    <Check className="w-3 h-3 text-primary-foreground" />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {selectedProduct === "terrein-custom" && (
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-2">
                                                Specify custom quantity <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.customQuantity}
                                                onChange={(e) => setFormData({ ...formData, customQuantity: e.target.value })}
                                                placeholder="e.g., 25 mg, 50 mg, 100 mg"
                                                className="max-w-xs"
                                                required
                                            />
                                        </div>
                                    )}
                                </div>
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={0.2}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">2. Contact and Institution</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Full Name <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                onBlur={() => handleBlur("name")}
                                                className={fieldClass("name", formData.name)}
                                                required
                                            />
                                            {getFieldError("name", formData.name, "Full name") && (
                                                <span className="text-xs text-red-500 mt-1">{getFieldError("name", formData.name, "Full name")}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Institutional Email <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                onBlur={() => handleBlur("email")}
                                                className={fieldClass("email", formData.email)}
                                                placeholder="name@institution.edu"
                                                required
                                            />
                                            {getFieldError("email", formData.email, "Email") && (
                                                <span className="text-xs text-red-500 mt-1">{getFieldError("email", formData.email, "Email")}</span>
                                            )}
                                            {isValidEmail(formData.email) && usesFreeEmailDomain && (
                                                <span className="text-xs text-amber-600 mt-1 block">
                                                    Institutional email is recommended for faster supplier qualification. This does not block submission.
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Phone</label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+1 780 709 5678"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Institution / Organization <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.institution}
                                                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                                onBlur={() => handleBlur("institution")}
                                                className={fieldClass("institution", formData.institution)}
                                                required
                                            />
                                            {getFieldError("institution", formData.institution, "Institution") && (
                                                <span className="text-xs text-red-500 mt-1">{getFieldError("institution", formData.institution, "Institution")}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Department</label>
                                            <Input
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Principal Investigator (PI) Name</label>
                                            <Input
                                                value={formData.piName}
                                                onChange={(e) => setFormData({ ...formData, piName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={0.3}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">3. Research Use</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2">
                                                Intended research application <span className="text-primary">*</span>
                                            </label>
                                            <Textarea
                                                value={formData.intendedUse}
                                                onChange={(e) => setFormData({ ...formData, intendedUse: e.target.value })}
                                                onBlur={() => handleBlur("intendedUse")}
                                                rows={4}
                                                placeholder="Briefly describe the in vitro, analytical, or other laboratory research use for this compound."
                                                required
                                            />
                                            {getFieldError("intendedUse", formData.intendedUse, "Intended research application") && (
                                                <span className="text-xs text-red-500 mt-1">{getFieldError("intendedUse", formData.intendedUse, "Intended research application")}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                                            <Select
                                                value={formData.howHeard}
                                                onValueChange={(value) => setFormData({ ...formData, howHeard: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select one" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {howHeardOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Additional notes</label>
                                            <Textarea
                                                value={formData.additionalNotes}
                                                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                                rows={3}
                                                placeholder="Special documentation needs, quote references, or timing constraints."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={0.4}>
                                <div className="mb-8 space-y-4">
                                    <h4 className="text-lg font-medium text-foreground mb-4">4. Required Acknowledgements</h4>

                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id="ruo"
                                            checked={acceptRuo}
                                            onCheckedChange={(checked) => setAcceptRuo(checked as boolean)}
                                        />
                                        <label htmlFor="ruo" className="text-sm text-muted-foreground cursor-pointer">
                                            I acknowledge that all products are for <strong>Research Use Only (RUO)</strong>. Not for human or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease. <span className="text-primary">*</span>
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id="qualified"
                                            checked={acceptQualified}
                                            onCheckedChange={(checked) => setAcceptQualified(checked as boolean)}
                                        />
                                        <label htmlFor="qualified" className="text-sm text-muted-foreground cursor-pointer">
                                            I confirm that I am submitting this RFQ on behalf of a qualified research entity or qualified researcher able to handle the compound in an appropriate laboratory setting. <span className="text-primary">*</span>
                                        </label>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Checkbox
                                            id="terms"
                                            checked={acceptTerms}
                                            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                                        />
                                        <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                                            I agree to the <a href="/terms-of-service" target="_blank" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">Privacy Policy</a>. <span className="text-primary">*</span>
                                        </label>
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            <FadeInOnScroll delay={0.5}>
                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                    <Button
                                        type="submit"
                                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                                        size="lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting RFQ..." : "Submit Request for Quotation"}
                                    </Button>
                                </motion.div>
                            </FadeInOnScroll>
                        </form>
                    </div>
                </section>

                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <h3 className="text-2xl font-light text-foreground mb-2 text-center">
                                What Happens Next?
                            </h3>
                            <p className="text-muted-foreground text-center mb-10">
                                Our typical response time is 1-2 business days.
                            </p>
                        </FadeInOnScroll>

                        <div className="grid md:grid-cols-3 gap-6">
                            {whatHappensNext.map((step, index) => (
                                <FadeInOnScroll key={index} delay={index * 0.1}>
                                    <motion.div
                                        whileHover={{ y: -3 }}
                                        className="bg-card border border-border rounded-lg p-6 text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mb-4">
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                        <h4 className="text-lg font-medium text-foreground mb-2">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </motion.div>
                                </FadeInOnScroll>
                            ))}
                        </div>

                        <FadeInOnScroll delay={0.4}>
                            <div className="mt-10 text-center">
                                <p className="text-muted-foreground">
                                    Questions? Contact us at <a href="mailto:info@invitvo.com" onClick={() => trackEmailClick("order_next_steps")} className="text-primary hover:underline">info@invitvo.com</a> or call <a href="tel:+17807095678" onClick={() => trackPhoneClick("order_next_steps")} className="text-primary hover:underline">+1-780-709-5678</a>
                                </p>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>

                <section className="py-10 bg-background">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-5">
                            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Shipping address, payment method, and purchase order details are collected only after quote acceptance.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default OrderContent;
