import type { Metadata } from "next";
import OrderContent from "@/components/pages/OrderContent";

export const metadata: Metadata = {
    title: "Order",
    description:
        "Submit a Request for Quotation for Terrein and other research compounds. InVitvo Pharmaceuticals ships worldwide to research institutions.",
    alternates: { canonical: "https://invitvo.com/order" },
};

export default function OrderPage() {
    return <OrderContent />;
}
