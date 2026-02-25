import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, FileCheck, Clock, Home, ArrowLeft } from "lucide-react";

interface OrderSummary {
    product_name: string;
    product_catalog: string;
    product_amount: string;
    product_price: string;
    customer_name: string;
    customer_email: string;
}

const ThankYou = () => {
    const location = useLocation();
    const order = location.state?.order as OrderSummary | undefined;

    const steps = [
        { icon: Mail, title: "RFQ Review", description: "Our team will review your request within 1-2 business days." },
        { icon: FileCheck, title: "Formal Quote", description: "You'll receive a detailed quotation with pricing and lead times." },
        { icon: Clock, title: "Order Confirmation", description: "Confirm your order via email and submit payment or PO." },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow bg-gradient-to-b from-background to-muted/30 py-16 md:py-24">
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
                            Thank You{order?.customer_name ? `, ${order.customer_name.split(" ")[0]}` : ""}!
                        </h1>
                        <p className="text-muted-foreground text-lg mb-2">
                            Your Request for Quotation has been submitted successfully.
                        </p>
                        {order?.customer_email && (
                            <p className="text-sm text-muted-foreground mb-8">
                                A confirmation email has been sent to <strong className="text-foreground">{order.customer_email}</strong>
                            </p>
                        )}
                    </motion.div>

                    {/* Order Summary Card */}
                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            className="bg-card border border-border rounded-lg p-6 mb-10 text-left"
                        >
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Order Summary</h3>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Product</span>
                                    <p className="font-medium text-foreground">{order.product_name}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Catalog #</span>
                                    <p className="font-medium text-foreground font-mono">{order.product_catalog}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Amount</span>
                                    <p className="font-medium text-foreground">{order.product_amount}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Listed Price</span>
                                    <p className="font-medium text-foreground">{order.product_price}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

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
                        <Link to="/">
                            <Button className="gap-2">
                                <Home className="w-4 h-4" />
                                Back to Home
                            </Button>
                        </Link>
                        <Link to="/products">
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Browse Products
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ThankYou;
