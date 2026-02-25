import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import FadeInOnScroll from "@/components/animations/FadeInOnScroll";
import RuoDisclaimer from "@/components/RuoDisclaimer";
import { usePageTitle } from "@/hooks/use-page-title";

const TermsOfService = () => {
  usePageTitle("Terms of Service");
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-grow">
        <PageHero title="Terms of Service" />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <FadeInOnScroll>
              <p className="text-muted-foreground mb-8">
                <strong>Effective Date:</strong> January 1, 2024<br />
                <strong>Last Updated:</strong> January 1, 2024
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
              <RuoDisclaimer className="mb-8" />
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-medium text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  By accessing or using the InVitvo Pharmaceuticals Ltd. website and purchasing our products, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">2. Research Use Only (RUO) Products</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  All products sold by InVitvo Pharmaceuticals Ltd. are intended for Research Use Only (RUO). By purchasing our products, you acknowledge and agree that:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                  <li>Products are not for human or veterinary diagnostic or therapeutic use</li>
                  <li>Products are not intended to diagnose, treat, cure, or prevent any disease</li>
                  <li>Products may only be used by qualified researchers in appropriate laboratory settings</li>
                  <li>You will not resell, distribute, or transfer products for any prohibited use</li>
                  <li>You assume all responsibility for ensuring compliance with applicable regulations in your jurisdiction</li>
                </ul>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">3. Ordering and Payment</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Request for Quotation (RFQ):</strong> Orders are placed through our RFQ system. Submission of an RFQ does not constitute a binding order until confirmed by InVitvo Pharmaceuticals Ltd.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Pricing:</strong> All prices are quoted in Canadian Dollars (CAD) unless otherwise specified. Prices are subject to change without notice. Applicable taxes (including GST/HST) will be added to the order total.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Payment Terms:</strong> Payment is due upon receipt of invoice unless alternative arrangements have been made. We accept payment by wire transfer, institutional purchase order, or credit card.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <strong>Order Confirmation:</strong> A formal quotation and order confirmation will be provided before shipment. Orders are processed upon receipt of payment or approved purchase order.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">4. Shipping and Delivery</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Shipping Terms:</strong> Products are shipped FOB origin. Risk of loss transfers to the buyer upon delivery to the carrier.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Lead Times:</strong> Standard lead times are 5-10 business days for in-stock items. Custom synthesis or bulk orders may require additional time.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <strong>International Orders:</strong> Buyer is responsible for all import duties, taxes, and customs clearance requirements. Additional documentation may be required for international shipments.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">5. Returns and Refunds</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Product Quality:</strong> All products are shipped with a Certificate of Analysis (COA). If a product does not meet stated specifications, please contact us within 30 days of receipt.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <strong>Damaged Shipments:</strong> Report any shipping damage within 48 hours of delivery. Retain all packaging materials for inspection.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <strong>No Returns:</strong> Due to the nature of our products, we generally do not accept returns unless the product is defective or does not meet specifications. Refunds or replacements are provided at our discretion.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">6. Intellectual Property</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  All content on this website, including text, graphics, logos, images, and documentation, is the property of InVitvo Pharmaceuticals Ltd. or its content suppliers and is protected by Canadian and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written consent.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">7. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, INVITVO PHARMACEUTICALS LTD. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OUR PRODUCTS OR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID FOR THE PRODUCT IN QUESTION. PRODUCTS ARE PROVIDED "AS IS" FOR RESEARCH USE ONLY, AND WE MAKE NO WARRANTIES REGARDING FITNESS FOR ANY PARTICULAR PURPOSE.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">8. Indemnification</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  You agree to indemnify, defend, and hold harmless InVitvo Pharmaceuticals Ltd., its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our products, violation of these terms, or infringement of any third-party rights.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">9. Regulatory Compliance</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Purchasers are responsible for ensuring that their use of products complies with all applicable local, provincial, federal, and international laws and regulations. This includes but is not limited to laboratory safety requirements, import/export regulations, and biosafety guidelines.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">10. Governing Law and Jurisdiction</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  These Terms of Service are governed by and construed in accordance with the laws of the Province of Alberta and the federal laws of Canada applicable therein. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Alberta, Canada.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">11. Severability</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">12. Changes to Terms</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
                </p>

                <h2 className="text-2xl font-medium text-foreground mb-4 mt-8">13. Contact Information</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  For questions regarding these Terms of Service, please contact us:
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

export default TermsOfService;
