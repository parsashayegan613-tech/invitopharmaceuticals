import type { Metadata } from "next";
import OurTeamContent from "@/components/pages/OurTeamContent";

export const metadata: Metadata = {
    title: "Our Team",
    description:
        "Meet the team behind InVitvo Pharmaceuticals — experienced pharmaceutical scientists dedicated to natural product research and microbial secondary metabolite discovery.",
    alternates: { canonical: "https://www.invitvo.com/our-team" },
};

export default function OurTeamPage() {
    return <OurTeamContent />;
}
