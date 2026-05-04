import OrderContent from "@/components/pages/OrderContent";
import { pageMetadata } from "@/lib/metadata";
import { terrein } from "@/lib/terrein";

export const metadata = pageMetadata({
    title: "Request a Terrein Quote",
    description: `Submit an RFQ for Terrein CAS ${terrein.cas}. Quote turnaround is typically 1-2 business days. For research use only.`,
    path: "/order",
});

export default function OrderPage() {
    return <OrderContent />;
}
