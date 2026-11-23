import Link from "next/link";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
    title: "Investors & Research Partnerships",
    description: "Explore InVitvo Pharmaceuticals' Canadian research compound business, Terrein offering, microbial metabolite research, and scientific team. Contact us about investment.",
    path: "/investors",
});

export default function InvestorsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <TopBar /><Header />
            <main id="main-content" tabIndex={-1} className="flex-grow">
                <PageHero title="Investors & Research Partners" />
                <section className="py-12 md:py-16">
                    <div className="container mx-auto max-w-5xl px-4">
                        <h2 className="text-3xl font-semibold">InVitvo Pharmaceuticals</h2>
                        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Founded in Edmonton in 2021, InVitvo isolates, purifies, and characterizes compounds from microorganisms. Its current commercial offering is Terrein for laboratory research.</p>
                        <Link href="/contact-us?inquiry=investment" className="mt-7 inline-flex min-h-11 items-center rounded bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90">Contact us about investment</Link>
                        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
                            <div>
                                <h3 className="text-xl font-semibold">Current business</h3>
                                <p className="mt-3 leading-relaxed text-muted-foreground">InVitvo offers research compounds to academic laboratories, pharmaceutical R&D teams, and contract research organizations. Terrein is listed in 5 mg and 10 mg quantities; custom quantities are quoted individually.</p>
                                <Link href="/products/terrein" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Review the Terrein offering</Link>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">Scientific focus</h3>
                                <p className="mt-3 leading-relaxed text-muted-foreground">The research focus is microbial secondary metabolites from Canadian environmental sources, including Terrein and its derivatives. Products are supplied for research use only; laboratory literature does not establish clinical effectiveness.</p>
                                <Link href="/research/terrein-in-vitro-models" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Explore the research context</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-section-alt py-12">
                    <div className="container mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-semibold">Meet the scientific team</h2>
                            <p className="mt-4 leading-relaxed text-muted-foreground">InVitvo is led by founder Anooshirvan Shayeganpour, Ph.D., and co-founder Heidi Rashidi, Pharm.D.</p>
                            <Link href="/our-team" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Team backgrounds</Link>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">Start a conversation</h2>
                            <p className="mt-4 leading-relaxed text-muted-foreground">Contact the team to discuss investment or research collaboration, including current development priorities, analytical evidence, and commercial plans.</p>
                            <Link href="/contact-us?inquiry=investment" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Investment inquiry</Link>
                            <Link href="/contact-us?inquiry=research" className="mt-2 flex min-h-11 items-center text-primary underline underline-offset-4">Research collaboration inquiry</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
