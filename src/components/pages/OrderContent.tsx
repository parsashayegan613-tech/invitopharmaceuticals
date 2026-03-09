"use client";

import { useState } from "react";
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
import { Check, Clock, Mail, FileCheck, CreditCard, Building2, Banknote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Country, State } from "country-state-city";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const OrderContent = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        institution: "",
        department: "",
        piName: "",
        streetAddress: "",
        city: "",
        province: "",
        postalCode: "",
        country: "Canada",
        intendedUse: "",
        customQuantity: "",
        paymentMethod: "",
        poNumber: "",
        additionalNotes: "",
    });
    const [acceptRuo, setAcceptRuo] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countryCode, setCountryCode] = useState("CA");
    const [stateCode, setStateCode] = useState("");
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

    const products = [
        { id: "terrein-5mg", name: "Terrein >95%", amount: "5 mg", price: "C$450", catalog: "INV-TER-005" },
        { id: "terrein-10mg", name: "Terrein >95%", amount: "10 mg", price: "C$800", catalog: "INV-TER-010" },
        { id: "terrein-custom", name: "Terrein >95%", amount: "Custom", price: "Quote", catalog: "INV-TER-XXX" },
    ];

    const intendedUseOptions = [
        "Academic research",
        "Industrial R&D",
        "Analytical method development",
        "Reference standard",
        "Compound screening",
        "Other (specify in notes)",
    ];

    const paymentMethods = [
        { value: "invoice", label: "Invoice (Net 30)", icon: FileCheck },
        { value: "po", label: "Institutional Purchase Order", icon: Building2 },
        { value: "wire", label: "Wire Transfer", icon: Banknote },
        { value: "credit", label: "Credit Card", icon: CreditCard },
        { value: "paypal", label: "PayPal", icon: Banknote },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) {
            toast({
                title: "Please select a product",
                description: "Choose a product from the table before submitting your request.",
                variant: "destructive",
            });
            return;
        }
        if (!acceptRuo || !acceptTerms) {
            toast({
                title: "Please accept the required terms",
                description: "You must acknowledge the RUO disclaimer and accept the Terms of Service.",
                variant: "destructive",
            });
            return;
        }

        const product = products.find((p) => p.id === selectedProduct);
        const paymentLabel = paymentMethods.find((m) => m.value === formData.paymentMethod)?.label || formData.paymentMethod || "Not specified";

        const orderData = {
            product_name: product?.name || "",
            product_catalog: product?.catalog || "",
            product_amount: product?.amount || "",
            product_price: product?.price || "",
            custom_quantity: formData.customQuantity || null,
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone || null,
            institution: formData.institution,
            department: formData.department || null,
            pi_name: formData.piName || null,
            street_address: formData.streetAddress,
            city: formData.city,
            province: formData.province,
            postal_code: formData.postalCode,
            country: formData.country,
            intended_use: formData.intendedUse,
            payment_method: paymentLabel,
            po_number: formData.poNumber || null,
            additional_notes: formData.additionalNotes || null,
        };

        setIsSubmitting(true);

        try {
            // 1. Save order to the database
            const { error: dbError } = await supabase
                .from('orders')
                .insert([
                    {
                        product_name: orderData.product_name,
                        product_catalog: orderData.product_catalog,
                        product_amount: orderData.product_amount,
                        product_price: orderData.product_price,
                        custom_quantity: orderData.custom_quantity,
                        customer_name: orderData.customer_name,
                        customer_email: orderData.customer_email,
                        customer_phone: orderData.customer_phone,
                        institution: orderData.institution,
                        department: orderData.department,
                        pi_name: orderData.pi_name,
                        street_address: orderData.street_address,
                        city: orderData.city,
                        province: orderData.province,
                        postal_code: orderData.postal_code,
                        country: orderData.country,
                        intended_use: orderData.intended_use,
                        payment_method: orderData.payment_method,
                        po_number: orderData.po_number,
                        additional_notes: orderData.additional_notes,
                    }
                ]);

            if (dbError) throw dbError;

            // 2. Invoke the edge function securely to send the email
            const { data: edgeData, error: edgeError } = await supabase.functions.invoke('send-order-email', {
                body: orderData,
            });

            console.log("Edge function response:", edgeData);
            if (edgeError) throw new Error(edgeError.message || "Email submission failed");

            // 3. Send confirmation email to the customer
            const { error: confirmError } = await supabase.functions.invoke('send-order-confirmation', {
                body: orderData,
            });
            if (confirmError) {
                console.error("Customer confirmation email error:", confirmError);
                // Don't throw — the order was already submitted successfully
            }

            // 4. Redirect to the Thank You page with order summary via query params
            const params = new URLSearchParams({
                type: "order",
                name: orderData.customer_name,
                email: orderData.customer_email,
                product_name: orderData.product_name,
                product_catalog: orderData.product_catalog,
                product_amount: orderData.product_amount,
                product_price: orderData.product_price,
            });
            router.push(`/thank-you?${params.toString()}`);
        } catch (error) {
            console.error("Order submission error:", error);
            toast({
                title: "Submission Failed",
                description: "There was an error sending your request. Please try again or email us directly at info@invitvo.com.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const whatHappensNext = [
        { icon: Mail, title: "RFQ Review", description: "Our team reviews your request within 1-2 business days" },
        { icon: FileCheck, title: "Formal Quote", description: "You'll receive a detailed quotation with pricing and lead times" },
        { icon: Clock, title: "Order Confirmation", description: "Confirm your order via email and submit payment/PO" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <PageHero title="Request a Quote" />

                {/* RUO Disclaimer */}
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
                                Complete the form below to receive a formal quotation for your research needs
                            </p>
                        </FadeInOnScroll>

                        <form onSubmit={handleSubmit}>
                            {/* Product Selection */}
                            <FadeInOnScroll delay={0.1}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">1. Product Selection</h4>
                                    <div className="overflow-hidden rounded-lg border border-border">
                                        <table className="w-full">
                                            <thead className="bg-muted">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Catalog #</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Product</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                                                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Price</th>
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
                                                        <td className="px-4 py-3 text-sm text-foreground font-medium">{product.price}</td>
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
                                                Specify Custom Quantity
                                            </label>
                                            <Input
                                                value={formData.customQuantity}
                                                onChange={(e) => setFormData({ ...formData, customQuantity: e.target.value })}
                                                placeholder="e.g., 25 mg, 50 mg, 100 mg"
                                                className="max-w-xs"
                                            />
                                        </div>
                                    )}
                                </div>
                            </FadeInOnScroll>

                            {/* Contact Information */}
                            <FadeInOnScroll delay={0.2}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">2. Contact Information</h4>
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
                                            <label className="block text-sm font-medium mb-2">Phone</label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                            {/* Shipping Address */}
                            <FadeInOnScroll delay={0.3}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">3. Shipping Address</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2">
                                                Street Address <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.streetAddress}
                                                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                City <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.city}
                                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Province / State <span className="text-primary">*</span>
                                            </label>
                                            {State.getStatesOfCountry(countryCode).length > 0 ? (
                                                <Select
                                                    value={stateCode}
                                                    onValueChange={(code) => {
                                                        setStateCode(code);
                                                        const stateName = State.getStateByCodeAndCountry(code, countryCode)?.name || code;
                                                        setFormData({ ...formData, province: stateName });
                                                    }}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select state/province" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {State.getStatesOfCountry(countryCode).map((state) => (
                                                            <SelectItem key={state.isoCode} value={state.isoCode}>
                                                                {state.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Input
                                                    value={formData.province}
                                                    onChange={(e) => {
                                                        setStateCode("");
                                                        setFormData({ ...formData, province: e.target.value });
                                                    }}
                                                    required
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Postal / ZIP Code <span className="text-primary">*</span>
                                            </label>
                                            <Input
                                                value={formData.postalCode}
                                                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Country <span className="text-primary">*</span>
                                            </label>
                                            <Select
                                                value={countryCode}
                                                onValueChange={(code) => {
                                                    setCountryCode(code);
                                                    setStateCode("");
                                                    const countryName = Country.getCountryByCode(code)?.name || code;
                                                    setFormData({ ...formData, country: countryName, province: "" });
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select country" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Country.getAllCountries().map((country) => (
                                                        <SelectItem key={country.isoCode} value={country.isoCode}>
                                                            {country.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            {/* Intended Use & Payment */}
                            <FadeInOnScroll delay={0.4}>
                                <div className="mb-10">
                                    <h4 className="text-lg font-medium text-foreground mb-4">4. Order Details</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Intended Use <span className="text-primary">*</span>
                                            </label>
                                            <Select
                                                value={formData.intendedUse}
                                                onValueChange={(value) => setFormData({ ...formData, intendedUse: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select intended use" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {intendedUseOptions.map((option) => (
                                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Preferred Payment Method
                                            </label>
                                            <Select
                                                value={formData.paymentMethod}
                                                onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {paymentMethods.map((method) => (
                                                        <SelectItem key={method.value} value={method.value}>{method.label}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {formData.paymentMethod === "po" && (
                                            <div>
                                                <label className="block text-sm font-medium mb-2">PO Number (if available)</label>
                                                <Input
                                                    value={formData.poNumber}
                                                    onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
                                                    placeholder="Enter PO number"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">
                                            <strong>Tax Note:</strong> Canadian orders are subject to GST/HST. International orders may be subject to import duties and taxes payable by the recipient.
                                        </p>
                                    </div>
                                </div>
                            </FadeInOnScroll>

                            {/* Additional Notes */}
                            <FadeInOnScroll delay={0.5}>
                                <div className="mb-10">
                                    <label className="block text-sm font-medium mb-2">Additional Notes</label>
                                    <Textarea
                                        value={formData.additionalNotes}
                                        onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                        rows={3}
                                        placeholder="Special requirements, shipping instructions, or other notes..."
                                    />
                                </div>
                            </FadeInOnScroll>

                            {/* Terms Acceptance */}
                            <FadeInOnScroll delay={0.6}>
                                <div className="mb-8 space-y-4">
                                    <h4 className="text-lg font-medium text-foreground mb-4">5. Terms & Acknowledgements</h4>

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

                            {/* Submit Button */}
                            <FadeInOnScroll delay={0.7}>
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
                                        size="lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Request for Quotation"}
                                    </Button>
                                </motion.div>
                            </FadeInOnScroll>
                        </form>
                    </div>
                </section>

                {/* What Happens Next */}
                <section className="py-16 bg-section-alt">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <h3 className="text-2xl font-light text-foreground mb-2 text-center">
                                What Happens Next?
                            </h3>
                            <p className="text-muted-foreground text-center mb-10">
                                Our typical response time is 1-2 business days
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
                                    Questions? Contact us at <a href="mailto:info@invitvo.com" className="text-primary hover:underline">info@invitvo.com</a> or call <strong>780.709.5678</strong>
                                </p>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default OrderContent;
