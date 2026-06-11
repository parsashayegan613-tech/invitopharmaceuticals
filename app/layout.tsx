import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "../src/index.css";
import Providers from "@/components/Providers";
import BackToTop from "@/components/BackToTop";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    variable: "--font-cormorant",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.invitvo.com"),
    title: {
        default: "Research Compounds & Microbial Metabolites | InVitvo",
        template: "%s | InVitvo Pharmaceuticals",
    },
    description:
        "Canadian supplier of high-purity microbial research compounds. Terrein with COA/SDS documentation. For research use only.",
    icons: {
        icon: [
            { url: "/favicon.png?v=2", type: "image/png", sizes: "512x512" },
        ],
        shortcut: ["/favicon.png?v=2"],
        apple: [
            { url: "/apple-touch-icon.png?v=2", type: "image/png", sizes: "512x512" },
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
        canonical: "https://www.invitvo.com",
    },
    openGraph: {
        type: "website",
        locale: "en_CA",
        url: "https://www.invitvo.com",
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
                            "@id": "https://www.invitvo.com/#organization",
                            name: "InVitvo Pharmaceuticals Ltd.",
                            legalName: "InVitvo Pharmaceuticals Ltd.",
                            url: "https://www.invitvo.com",
                            logo: "https://www.invitvo.com/logo-email.png",
                            foundingDate: "2021",
                            description:
                                "Canadian supplier of high-purity research compounds from microbial sources. Terrein and natural product metabolites with COA/SDS documentation. For research use only.",
                            telephone: "+1-780-709-5678",
                            email: "info@invitvo.com",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "9407 20 Ave NW",
                                addressLocality: "Edmonton",
                                addressRegion: "AB",
                                postalCode: "T6N 1E5",
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
            </head>
            <body className={`${inter.variable} ${cormorant.variable}`}>
                <a className="skip-link" href="#main-content">
                    Skip to main content
                </a>
                <Providers>
                    <Analytics />
                    <BackToTop />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
