import type { Metadata } from "next";
import Script from "next/script";
import TerreinProductContent from "@/components/pages/TerreinProductContent";
import terreinMolecule from "@/assets/terrein-molecule.png";
import { terrein } from "@/lib/terrein";
import { standardProducts } from "@/lib/products";

export const metadata: Metadata = {
    title: { absolute: `Terrein CAS ${terrein.cas} >95% | InVitvo` },
    description:
        `Terrein CAS ${terrein.cas}, >95% UHPLC, from Aspergillus terreus. RUO compound shipped from Canada.`,
    alternates: { canonical: "https://www.invitvo.com/products/terrein" },
    openGraph: {
        title: `Terrein CAS ${terrein.cas} >95% | InVitvo`,
        description: `Terrein CAS ${terrein.cas}, >95% UHPLC, isolated from Aspergillus terreus for RUO laboratory research.`,
        url: terrein.productUrl,
        type: "website",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: `Terrein molecular structure ${terrein.formula} CAS ${terrein.cas}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `Terrein CAS ${terrein.cas} >95% | InVitvo`,
        description: `Terrein CAS ${terrein.cas}, >95% UHPLC, isolated from Aspergillus terreus for RUO laboratory research.`,
        images: ["/og-image.png"],
    },
};

export default function TerreinPage() {
    const productUrl = terrein.productUrl;
    const terreinImageUrl = `https://www.invitvo.com${terreinMolecule.src}`;

    const productJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Product",
                "@id": `${productUrl}#product`,
                name: "Terrein",
                alternateName: terrein.synonyms,
                sku: "INV-TER",
                description: `Terrein CAS ${terrein.cas}, ${terrein.purity}, isolated from ${terrein.source}. Supplied for Research Use Only (RUO), not for human or veterinary use.`,
                url: productUrl,
                image: terreinImageUrl,
                brand: { "@type": "Brand", name: "InVitvo Pharmaceuticals" },
                manufacturer: { "@id": "https://www.invitvo.com/#organization" },
                category: "Research Compounds",
                isRelatedTo: { "@id": `${productUrl}#chemical` },
                additionalProperty: [
                    { "@type": "PropertyValue", name: "CAS Number", value: terrein.cas },
                    { "@type": "PropertyValue", name: "Molecular Formula", value: terrein.formula },
                    { "@type": "PropertyValue", name: "Molecular Weight", value: terrein.molecularWeight },
                    { "@type": "PropertyValue", name: "Purity", value: terrein.purity },
                    { "@type": "PropertyValue", name: "Source", value: terrein.source },
                    { "@type": "PropertyValue", name: "Use", value: "Research Use Only (RUO)" },
                ],
                offers: standardProducts.map((product) => ({
                    "@type": "Offer",
                    sku: product.catalog,
                    price: String(product.priceCad),
                    priceCurrency: "CAD",
                    availability: "https://schema.org/InStock",
                    itemCondition: "https://schema.org/NewCondition",
                    url: product.orderUrl,
                })),
            },
            {
                "@type": "ChemicalSubstance",
                "@id": `${productUrl}#chemical`,
                name: "Terrein",
                alternateName: terrein.synonyms,
                url: productUrl,
                image: terreinImageUrl,
                molecularFormula: terrein.formula,
                molecularWeight: terrein.molecularWeight,
                iupacName: terrein.iupacName,
                inChI: terrein.inChI,
                inChIKey: terrein.inChIKey,
                smiles: terrein.smiles,
                sameAs: [terrein.pubChemUrl],
                identifier: [
                    { "@type": "PropertyValue", propertyID: "CAS", value: terrein.cas },
                    { "@type": "PropertyValue", propertyID: "InChIKey", value: terrein.inChIKey },
                    { "@type": "PropertyValue", propertyID: "PubChem CID", value: "6436830" },
                ],
            },
            {
                "@type": "BreadcrumbList",
                "@id": `${productUrl}#breadcrumb`,
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.invitvo.com/" },
                    { "@type": "ListItem", position: 2, name: "Products", item: "https://www.invitvo.com/products" },
                    { "@type": "ListItem", position: 3, name: "Terrein", item: productUrl },
                ],
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
