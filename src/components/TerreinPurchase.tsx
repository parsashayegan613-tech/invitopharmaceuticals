"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { productList } from "@/lib/products";
import { trackEvent } from "@/lib/analytics";

export default function TerreinPurchase({ location }: { location: string }) {
    return (
        <section id="quantities" className="border-y border-border bg-section-alt py-10 scroll-mt-24">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-2xl font-semibold text-foreground">Terrein quantities & pricing</h2>
                <p className="mt-2 text-muted-foreground">CAS 582-46-7 · &gt;95% purity (UHPLC) · Research use only</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {productList.map((product) => (
                        <article key={product.id} className="flex flex-col rounded-lg border border-border bg-background p-5">
                            <h3 className="text-xl font-semibold">{product.isCustomQuantity ? "Custom / bulk" : product.amount}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{product.catalog}</p>
                            <p className="my-4 text-2xl font-semibold">{product.isCustomQuantity ? "Request pricing" : product.price}</p>
                            <Link
                                href={product.orderUrl.replace("https://www.invitvo.com", "")}
                                onClick={() => trackEvent("cta_clicked", { location, destination: "order", product_id: product.id, quantity: product.amount })}
                                className="mt-auto inline-flex min-h-11 items-center justify-between gap-2 rounded bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                            >
                                {product.isCustomQuantity ? "Request custom quote" : `Request ${product.amount} quote`}
                                <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
                            </Link>
                        </article>
                    ))}
                </div>
                <div className="mt-6 flex flex-col gap-4 text-sm sm:flex-row sm:justify-between">
                    <p className="max-w-xl text-muted-foreground">Quotes within 1-2 business days. Confirm current stock and lead time with your quote. Canadian delivery: 5-7 business days; international: typically 7-14 business days.</p>
                    <Link href="/contact-us?inquiry=documentation" onClick={() => trackEvent("documentation_request_click", { location, compound: "Terrein" })} className="inline-flex min-h-11 items-center gap-2 self-start font-medium text-primary underline underline-offset-4">
                        <FileText aria-hidden="true" className="h-4 w-4 shrink-0" />Request a sample COA & SDS
                    </Link>
                </div>
            </div>
        </section>
    );
}
