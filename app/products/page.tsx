import type { Metadata } from "next";
import ProductsContent from "@/components/pages/ProductsContent";

export const metadata: Metadata = {
    title: "Products",
    description:
        "Browse InVitvo Pharmaceuticals' catalog of high-purity research compounds including Terrein (>95% purity) with full COA/SDS documentation. For research use only.",
    alternates: { canonical: "https://invitvo.com/products" },
};

export default function ProductsPage() {
    return <ProductsContent />;
}
