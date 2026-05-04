import type { Metadata } from "next";
import Script from "next/script";
import TerreinProductContent from "@/components/pages/TerreinProductContent";

export const metadata: Metadata = {
    title: "Terrein CAS 16014-58-7 (>95% UHPLC) | RUO Research Compound",
    description:
        "High-purity Terrein CAS 16014-58-7 (>95% UHPLC) for RUO laboratory research. COA and SDS included. 5mg, 10mg, and custom quantities.",
    alternates: { canonical: "https://www.invitvo.com/products/terrein" },
};

export default function TerreinPage() {
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Terrein >95%",
        sku: "INV-TER",
        description:
            "High-purity Terrein CAS 16014-58-7 (>95% UHPLC) isolated from Aspergillus terreus for research use only. Not for human or veterinary use.",
        url: "https://www.invitvo.com/products/terrein",
        brand: { "@type": "Brand", name: "InVitvo Pharmaceuticals" },
        manufacturer: {
            "@type": "Organization",
            name: "InVitvo Pharmaceuticals Ltd.",
            url: "https://www.invitvo.com",
        },
        category: "Research Compounds",
        additionalProperty: [
            { "@type": "PropertyValue", name: "CAS Number", value: "16014-58-7" },
            { "@type": "PropertyValue", name: "Purity", value: ">95% UHPLC" },
            { "@type": "PropertyValue", name: "Source", value: "Aspergillus terreus" },
            { "@type": "PropertyValue", name: "Use", value: "Research Use Only (RUO)" },
        ],
        offers: [
            {
                "@type": "Offer",
                sku: "INV-TER-005",
                price: "450",
                priceCurrency: "CAD",
                availability: "https://schema.org/InStock",
                url: "https://www.invitvo.com/order?product=terrein&quantity=5mg",
            },
            {
                "@type": "Offer",
                sku: "INV-TER-010",
                price: "800",
                priceCurrency: "CAD",
                availability: "https://schema.org/InStock",
                url: "https://www.invitvo.com/order?product=terrein&quantity=10mg",
            },
        ],
    };

    return (
        <>
            <Script
                id="terrein-product-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <TerreinProductContent />
        </>
    );
}
