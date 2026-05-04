"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = "G-1C75KSQYCL";
const CONSENT_KEY = "invitvo_analytics_consent";

const Analytics = () => {
    const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
    const [hasLoadedPreference, setHasLoadedPreference] = useState(false);

    useEffect(() => {
        const storedConsent = window.localStorage.getItem(CONSENT_KEY);
        if (storedConsent === "accepted" || storedConsent === "declined") {
            setConsent(storedConsent);
        }
        setHasLoadedPreference(true);
    }, []);

    const updateConsent = (value: "accepted" | "declined") => {
        window.localStorage.setItem(CONSENT_KEY, value);
        setConsent(value);

        if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
                analytics_storage: value === "accepted" ? "granted" : "denied",
            });
        }
    };

    if (process.env.NODE_ENV !== "production") {
        return null;
    }

    return (
        <>
            <Script id="google-consent-default" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('consent', 'default', {
                        analytics_storage: 'denied',
                        ad_storage: 'denied',
                        ad_user_data: 'denied',
                        ad_personalization: 'denied'
                    });
                `}
            </Script>

            {consent === "accepted" && (
                <>
                    <Script id="google-consent-granted" strategy="afterInteractive">
                        {`
                            gtag('consent', 'update', {
                                analytics_storage: 'granted'
                            });
                        `}
                    </Script>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}', { anonymize_ip: true });
                        `}
                    </Script>
                </>
            )}

            {hasLoadedPreference && consent === null && (
                <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
                    <div className="container mx-auto flex flex-col gap-3 px-4 py-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
                        <p className="max-w-3xl">
                            InVitvo uses analytics to understand RFQ and contact activity. We do not send names,
                            emails, institutions, or research details to analytics.
                        </p>
                        <div className="flex shrink-0 gap-2">
                            <button
                                type="button"
                                onClick={() => updateConsent("declined")}
                                className="rounded border border-border px-4 py-2 text-foreground transition-colors hover:bg-muted"
                            >
                                Decline
                            </button>
                            <button
                                type="button"
                                onClick={() => updateConsent("accepted")}
                                className="rounded bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Analytics;
