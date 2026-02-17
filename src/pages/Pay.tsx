
import { useState } from "react";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Banknote } from "lucide-react";

// Placeholder links - YOU WILL NEED TO REPLACE THESE
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_placeholder"; // Create in Stripe Dashboard -> Payment Links
const PAYPAL_BUSINESS_EMAIL = "info@invitvo.com"; // Your PayPal email

const Pay = () => {
    const [amount, setAmount] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [organization, setOrganization] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("stripe");

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || !invoiceNumber) return;

        if (paymentMethod === "stripe") {
            // For Stripe Payment Links with custom amount, you typically need a pricing table or a specific link configuration
            // Or you can pass ?client_reference_id=INVOICE_NUM if configured
            // For now, we redirect to the main payment link
            window.location.href = STRIPE_PAYMENT_LINK;
        } else {
            // PayPal Standard Button Link
            const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
                PAYPAL_BUSINESS_EMAIL
            )}&item_name=${encodeURIComponent(
                `Invoice #${invoiceNumber} - ${organization}`
            )}&amount=${amount}&currency_code=CAD&return=${encodeURIComponent(
                window.location.origin + "/payment-success"
            )}`;
            window.location.href = paypalUrl;
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <PageHero title="Pay Invoice" />

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-lg">
                        <FadeInOnScroll>
                            <div className="bg-card border border-border rounded-lg shadow-sm p-8">
                                <h3 className="text-2xl font-light text-foreground mb-6 text-center">
                                    Secure Payment
                                </h3>

                                <form onSubmit={handlePayment} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="invoice">Invoice / Quote Number</Label>
                                        <Input
                                            id="invoice"
                                            placeholder="e.g., INV-001 or Q-2024-001"
                                            value={invoiceNumber}
                                            onChange={(e) => setInvoiceNumber(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="org">Organization / Name</Label>
                                        <Input
                                            id="org"
                                            placeholder="Your Institution or Company"
                                            value={organization}
                                            onChange={(e) => setOrganization(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="amount">Payment Amount (CAD)</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                            <Input
                                                id="amount"
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="pl-8"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <Label>Select Payment Method</Label>
                                        <RadioGroup
                                            defaultValue="stripe"
                                            value={paymentMethod}
                                            onValueChange={setPaymentMethod}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            <div>
                                                <RadioGroupItem value="stripe" id="stripe" className="peer sr-only" />
                                                <Label
                                                    htmlFor="stripe"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                                >
                                                    <CreditCard className="mb-3 h-6 w-6" />
                                                    <span className="text-sm font-medium">Credit Card</span>
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                                                <Label
                                                    htmlFor="paypal"
                                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                                >
                                                    <Banknote className="mb-3 h-6 w-6" />
                                                    <span className="text-sm font-medium">PayPal</span>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <Button type="submit" className="w-full mt-6" size="lg">
                                        Proceed to {paymentMethod === "stripe" ? "Stripe" : "PayPal"}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        You will be redirected to a secure payment page to complete your transaction.
                                    </p>
                                </form>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Pay;
