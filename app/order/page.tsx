import type { Metadata } from "next";
import OrderContent from "@/components/pages/OrderContent";

export const metadata: Metadata = {
    title: "Request a Terrein Quote",
    description:
        "Submit a low-friction RFQ for Terrein CAS 16014-58-7. Quote turnaround is typically 1-2 business days. For research use only.",
    alternates: { canonical: "https://www.invitvo.com/order" },
};

export default function OrderPage() {
    return <OrderContent />;
}
