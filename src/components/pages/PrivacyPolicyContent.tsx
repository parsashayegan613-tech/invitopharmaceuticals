"use client";

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";

const PrivacyPolicyContent = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar />
            <Header />
            <main className="flex-grow">
                <PageHero title="Privacy Policy" />

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <p className="text-muted-foreground mb-8">
                                <strong>Effective Date:</strong> January 1, 2024<br />
                                <strong>Last Updated:</strong> January 1, 2024
                            </p>
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={0.1}>
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-2xl font-medium text-foreground mb-4">1. Introduction</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    InVitvo Pharmaceuticals Ltd. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">2. Information We Collect</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We may collect the following types of information:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li><strong>Personal Information:</strong> Name, email address, phone number, institutional affiliation, and job title when you submit inquiries or orders.</li>
                                    <li><strong>Business Information:</strong> Organization name, department, shipping addresses, and purchase order details.</li>
                                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and website usage data collected through cookies and similar technologies.</li>
                                    <li><strong>Communication Records:</strong> Records of correspondence when you contact us via email or our contact forms.</li>
                                </ul>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">3. How We Use Your Information</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We use the collected information for the following purposes:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li>Processing and fulfilling product orders and requests for quotations</li>
                                    <li>Communicating with you about your orders, inquiries, and our products</li>
                                    <li>Providing technical documentation and certificates of analysis</li>
                                    <li>Improving our website, products, and services</li>
                                    <li>Complying with legal obligations and regulatory requirements</li>
                                    <li>Preventing fraud and ensuring the security of our operations</li>
                                </ul>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">4. Cookies and Tracking Technologies</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand how visitors interact with our site. You may configure your browser to refuse cookies; however, some website features may not function properly without them.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">5. Information Sharing and Disclosure</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li><strong>Service Providers:</strong> Third parties who assist with shipping, payment processing, and website hosting</li>
                                    <li><strong>Legal Compliance:</strong> When required by law, regulation, or legal process</li>
                                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                </ul>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">6. Data Security</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">7. Data Retention</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Business records related to orders may be retained for up to seven (7) years for accounting and regulatory purposes.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">8. Your Rights</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    Subject to applicable law, you may have the right to:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li>Access the personal information we hold about you</li>
                                    <li>Request correction of inaccurate information</li>
                                    <li>Request deletion of your personal information</li>
                                    <li>Withdraw consent where processing is based on consent</li>
                                    <li>Object to certain processing activities</li>
                                </ul>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    To exercise these rights, please contact us using the information provided below.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">9. Third-Party Links</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">10. Children&apos;s Privacy</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">11. Changes to This Policy</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">12. Governing Law</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    This Privacy Policy is governed by and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">13. Contact Us</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                                </p>
                                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                                    <p className="text-foreground font-medium">InVitvo Pharmaceuticals Ltd.</p>
                                    <p className="text-muted-foreground">9407-20 Ave, NW</p>
                                    <p className="text-muted-foreground">Edmonton, AB, Canada T6N 1E5</p>
                                    <p className="text-muted-foreground mt-2">Email: info@invitvo.com</p>
                                    <p className="text-muted-foreground">Phone: 780.709.5678</p>
                                </div>
                            </div>
                        </FadeInOnScroll>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicyContent;
