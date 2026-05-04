import ProductsContent from "@/components/pages/ProductsContent";
import { pageMetadata } from "@/lib/metadata";
import { terrein } from "@/lib/terrein";

export const metadata = pageMetadata({
    title: "Products",
    description: `Browse Terrein CAS ${terrein.cas}, >95% UHPLC purity, with COA/SDS documentation. For research use only.`,
    path: "/products",
    imageAlt: `Terrein molecular structure ${terrein.formula} CAS ${terrein.cas}`,
});

export default function ProductsPage() {
    return <ProductsContent />;
}
