import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import "../src/index.css";
import Providers from "@/components/Providers";
import BackToTop from "@/components/BackToTop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL("https://invitvo.com"),
    title: {
        default: "Research Compounds & Microbial Metabolites | InVitvo Pharmaceuticals",
        template: "%s | InVitvo Pharmaceuticals",
    },
    description:
        "Canadian supplier of high-purity research compounds from microbial sources. Terrein and natural product metabolites with COA/SDS documentation. For research use only.",
    icons: {
        icon: [
            { url: "/favicon.png", type: "image/png" },
        ],
        apple: [
            { url: "/favicon.png" },
        ],
    },
    keywords: [
        "InVitvo",
        "Pharmaceuticals",
        "Terrein",
        "research compounds",
        "microbial metabolites",
        "natural products",
        "Edmonton",
        "Canada",
        "RUO",
        "COA",
        "SDS",
    ],
    authors: [{ name: "InVitvo Pharmaceuticals Ltd." }],
    robots: { index: true, follow: true },
    alternates: {
        canonical: "https://invitvo.com",
    },
    openGraph: {
        type: "website",
        locale: "en_CA",
        url: "https://invitvo.com",
        siteName: "InVitvo Pharmaceuticals",
        title: "InVitvo Pharmaceuticals | Research Compounds & Microbial Metabolites",
        description:
            "Canadian supplier of high-purity research compounds from microbial sources. Terrein with full analytical documentation. For research use only.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "InVitvo Pharmaceuticals",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "InVitvo Pharmaceuticals | Research Compounds",
        description: "Canadian supplier of high-purity research compounds from microbial sources.",
        images: ["/og-image.png"],
    },
    other: {
        "geo.region": "CA-AB",
        "geo.placename": "Edmonton",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                {/* Schema.org Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "InVitvo Pharmaceuticals Ltd.",
                            url: "https://invitvo.com",
                            logo: "https://invitvo.com/logo-email.png",
                            description:
                                "Canadian supplier of high-purity research compounds from microbial sources. Terrein and natural product metabolites with COA/SDS documentation.",
                            address: {
                                "@type": "PostalAddress",
                                addressLocality: "Edmonton",
                                addressRegion: "AB",
                                addressCountry: "CA",
                            },
                            contactPoint: {
                                "@type": "ContactPoint",
                                telephone: "+1-780-709-5678",
                                contactType: "sales",
                                email: "info@invitvo.com",
                            },
                            sameAs: [
                                "https://www.linkedin.com/company/invitvo-pharmaceuticals",
                            ],
                        }),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Product",
                            name: "Terrein >95%",
                            description:
                                "High-purity Terrein (>95%) isolated from Aspergillus terreus. Available in 5mg and 10mg quantities for research use only.",
                            brand: { "@type": "Brand", name: "InVitvo Pharmaceuticals" },
                            manufacturer: {
                                "@type": "Organization",
                                name: "InVitvo Pharmaceuticals Ltd.",
                            },
                            category: "Research Compounds",
                            offers: {
                                "@type": "AggregateOffer",
                                priceCurrency: "CAD",
                                lowPrice: "450",
                                highPrice: "800",
                                offerCount: "2",
                            },
                            aggregateRating: {
                                "@type": "AggregateRating",
                                ratingValue: "5.0",
                                reviewCount: "1",
                            },
                            review: {
                                "@type": "Review",
                                reviewRating: {
                                    "@type": "Rating",
                                    ratingValue: "5",
                                    bestRating: "5",
                                },
                                author: {
                                    "@type": "Person",
                                    name: "Verified Researcher",
                                },
                            },
                        }),
                    }}
                />
            </head>
            <body className={`${inter.variable} ${outfit.variable}`}>
                {/* Google Analytics (Only in Production) */}
                {process.env.NODE_ENV === "production" && (
                    <>
                        <Script
                            src="https://www.googletagmanager.com/gtag/js?id=G-1C75KSQYCL"
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){window.dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'G-1C75KSQYCL');
                            `}
                        </Script>
                    </>
                )}

                <Providers>
                    <BackToTop />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
