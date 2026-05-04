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
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title="Privacy Policy" />

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <FadeInOnScroll>
                            <p className="text-muted-foreground mb-8">
                                <strong>Effective Date:</strong> May 4, 2026<br />
                                <strong>Last Updated:</strong> May 4, 2026
                            </p>
                        </FadeInOnScroll>

                        <FadeInOnScroll delay={0.1}>
                            <div className="prose prose-lg max-w-none">
                                <h2 className="text-2xl font-medium text-foreground mb-4">1. Introduction</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    InVitvo Pharmaceuticals Ltd. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting personal information and confidential research details submitted through our website. This Privacy Policy describes how we collect, use, disclose, retain, and safeguard information when you visit invitvo.com, submit a Request for Quotation (RFQ), or contact us. It is intended to align with applicable Canadian privacy requirements, including PIPEDA.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">2. Information We Collect</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We collect only the information needed to respond to inquiries, qualify RFQs, prepare quotes, and operate the website:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li><strong>RFQ information:</strong> Name, institutional email, optional phone number, institution or organization, optional department, optional principal investigator name, selected compound and quantity, intended research application, how you heard about us, optional notes, and required RUO, qualified researcher, and terms acknowledgements.</li>
                                    <li><strong>Order information after quote acceptance:</strong> Shipping address, billing details, purchase order information, customs/import information, and correspondence needed to complete a confirmed order.</li>
                                    <li><strong>Contact form information:</strong> Name, email, optional phone number, message content, and related correspondence.</li>
                                    <li><strong>Technical and security data:</strong> IP address, user agent, submission timestamps, consent preferences, and limited website usage data used for security, abuse prevention, analytics, and troubleshooting.</li>
                                </ul>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    We treat intended research applications and related RFQ details as confidential business information. We do not place customer names, email addresses, institutional affiliations, or research details in public URL parameters.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">3. How We Use Your Information</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We use the collected information for the following purposes:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li>Processing, qualifying, and responding to product RFQs</li>
                                    <li>Documenting RUO qualification, intended research use, and required customer acknowledgements</li>
                                    <li>Communicating with you about your orders, inquiries, and our products</li>
                                    <li>Providing technical documentation and certificates of analysis</li>
                                    <li>Improving our website, products, and services</li>
                                    <li>Complying with legal obligations and regulatory requirements</li>
                                    <li>Preventing fraud and ensuring the security of our operations</li>
                                </ul>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">4. Cookies and Tracking Technologies</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    We use a consent-based analytics preference on the website. Google Analytics is loaded only after you accept analytics. Analytics events are designed to measure activity such as RFQ submissions, contact submissions, phone clicks, email clicks, and product page views without sending names, email addresses, institutions, phone numbers, or research-use details to analytics. You may decline analytics without affecting your ability to submit an RFQ or contact us.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">5. Information Sharing and Disclosure</h2>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information with:
                                </p>
                                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                                    <li><strong>Website hosting:</strong> Vercel, used to host and secure the website and server-side RFQ/contact endpoints.</li>
                                    <li><strong>Database storage:</strong> Supabase, used to store RFQ and contact submissions.</li>
                                    <li><strong>Transactional email:</strong> Resend and Microsoft 365, used to send RFQ confirmations, internal RFQ notifications, and business correspondence.</li>
                                    <li><strong>Analytics:</strong> Google Analytics, only after consent, and without customer names, emails, institutions, or research details.</li>
                                    <li><strong>Shipping, customs, and payment providers:</strong> Used only after quote acceptance when needed to fulfill a confirmed order.</li>
                                    <li><strong>Legal Compliance:</strong> When required by law, regulation, court order, sanctions/export review, customs process, or other legal process.</li>
                                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                </ul>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    These providers may process or store information in Canada, the United States, or other jurisdictions where they or their subprocessors operate. Information may be subject to lawful access requests in those jurisdictions.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">6. Data Security</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Form submissions are transmitted over HTTPS. We use access controls, server-side validation, spam controls, rate limiting, and restricted server credentials to protect RFQ and contact records. However, no method of transmission over the Internet or electronic storage is 100% secure.
                                </p>

                                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">7. Data Retention</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    We retain RFQ, quote, order, compliance acknowledgement, and related business records for up to seven (7) years unless a longer period is required for accounting, tax, export, regulatory, dispute, or legal purposes. Contact-form messages that do not become RFQs or orders are generally retained for up to three (3) years. We may retain limited technical logs for security and abuse-prevention purposes.
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
                                    To exercise these rights or ask about cross-border processing, please contact us using the information provided below. We may need to verify your identity before responding.
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
                                    <p className="text-muted-foreground">Phone: +1-780-709-5678</p>
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
