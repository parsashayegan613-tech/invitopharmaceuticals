type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

const cleanParams = (params: AnalyticsParams) =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
    );

export const trackEvent = (eventName: string, params: AnalyticsParams = {}) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
        return;
    }

    window.gtag("event", eventName, cleanParams(params));
};

export const trackPhoneClick = (location: string) => {
    trackEvent("phone_click", { location });
};

export const trackEmailClick = (location: string) => {
    trackEvent("email_click", { location });
};
