"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Beaker, Home, Mail } from "lucide-react";

const NotFoundContent = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main id="main-content" tabIndex={-1} className="flex-grow flex items-center justify-center bg-gradient-to-b from-background to-muted/30 py-20">
                <div className="container mx-auto px-4 text-center max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-primary font-medium text-sm tracking-widest uppercase mb-4">Error 404</p>
                        <h1 className="text-7xl md:text-9xl font-bold text-foreground/10 mb-2 select-none">404</h1>
                        <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 -mt-8 md:-mt-12">
                            Page Not Found
                        </h2>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            The page you&apos;re looking for doesn&apos;t exist or has been moved.
                            Please check the URL or navigate back to our homepage.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link href="/">
                                <Button className="gap-2">
                                    <Home className="w-4 h-4" />
                                    Back to Home
                                </Button>
                            </Link>
                            <Link href="/products/terrein">
                                <Button variant="secondary" className="gap-2">
                                    <Beaker className="w-4 h-4" />
                                    View Terrein
                                </Button>
                            </Link>
                            <Link href="/contact-us">
                                <Button variant="outline" className="gap-2">
                                    <Mail className="w-4 h-4" />
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFoundContent;
