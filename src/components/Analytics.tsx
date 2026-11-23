"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CONSENT_KEY = "invitvo_analytics_consent";

export default function Analytics() {
    const pathname = usePathname();
    const initialized = useRef(false);
    const previousPage = useRef("");
    const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
    const [ready, setReady] = useState(false);
    const [excluded, setExcluded] = useState(false);
    const [liveHost, setLiveHost] = useState(false);

    useEffect(() => {
        setLiveHost(["invitvo.com", "www.invitvo.com"].includes(window.location.hostname));
        try {
            const value = window.localStorage.getItem(CONSENT_KEY);
            if (value === "accepted" || value === "declined") setConsent(value);
            setExcluded(window.localStorage.getItem("invitvo_analytics_exclude") === "true");
        } catch {
            setExcluded(true);
        }
        setReady(true);
    }, []);

    const enabled = process.env.NODE_ENV === "production" && Boolean(GA_ID) && liveHost && !excluded;

    useEffect(() => {
        if (!enabled || consent !== "accepted" || initialized.current) return;
        const analyticsWindow = window as Window & { dataLayer?: unknown[] };
        analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
        window.gtag = window.gtag || function () { analyticsWindow.dataLayer!.push(arguments); };
        window.gtag("consent", "default", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });
        window.gtag("js", new Date());
        window.gtag("config", GA_ID, { send_page_view: false });
        initialized.current = true;
    }, [enabled, consent]);

    useEffect(() => {
        if (!enabled || consent !== "accepted" || !initialized.current || previousPage.current === pathname) return;
        // Strip query strings and fragments so free-text URL values never enter analytics.
        const pageLocation = window.location.origin + pathname;
        let referrer = previousPage.current ? window.location.origin + previousPage.current : "";
        if (!referrer && document.referrer) {
            try { const url = new URL(document.referrer); referrer = url.origin + url.pathname; } catch { /* Invalid referrer. */ }
        }
        window.gtag?.("set", { page_location: pageLocation, page_referrer: referrer });
        trackEvent("page_view", { page_location: pageLocation, page_referrer: referrer, page_title: document.title });
        if (pathname === "/products/terrein") trackEvent("product_page_view", { compound: "Terrein", product_id: "INV-TER" });
        previousPage.current = pathname;
    }, [pathname, enabled, consent]);

    const updateConsent = (value: "accepted" | "declined") => {
        try { window.localStorage.setItem(CONSENT_KEY, value); } catch { setExcluded(true); }
        setConsent(value);
    };

    if (!enabled || !ready) return null;

    return (
        <>
            {consent === "accepted" && <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />}
            {consent === null && (
                <div role="region" aria-label="Analytics consent" className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background">
                    <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                        <p className="max-w-3xl">InVitvo uses optional analytics to understand quote and contact activity. Names, email addresses, institutions, and research details are not included.</p>
                        <div className="flex shrink-0 gap-2">
                            <button type="button" onClick={() => updateConsent("declined")} className="min-h-11 rounded border border-border px-4 py-2 text-foreground hover:bg-muted">Decline</button>
                            <button type="button" onClick={() => updateConsent("accepted")} className="min-h-11 rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">Accept</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
