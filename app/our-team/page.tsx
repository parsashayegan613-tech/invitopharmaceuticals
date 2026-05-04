import OurTeamContent from "@/components/pages/OurTeamContent";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Our Team",
    description: "Meet the InVitvo team focused on natural product research and microbial secondary metabolite discovery.",
    path: "/our-team",
});

export default function OurTeamPage() {
    return <OurTeamContent />;
}
