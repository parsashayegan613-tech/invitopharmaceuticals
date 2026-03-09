import type { Metadata } from "next";
import TerreinProductContent from "@/components/pages/TerreinProductContent";

export const metadata: Metadata = {
    title: "Terrein (>95% Purity) | Analytical Grade Research Compound",
    description:
        "Buy high-purity Terrein (>95% UHPLC) for biological research. Characterized via NMR & MS. COA & SDS included. Fast shipping for academic and industrial laboratories.",
    alternates: { canonical: "https://invitvo.com/products/terrein" },
};

export default function TerreinPage() {
    return <TerreinProductContent />;
}
