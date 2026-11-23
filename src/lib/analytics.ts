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
        return false;
    }
    // Do not queue pre-consent interactions for later transmission.
    try {
        if (window.localStorage.getItem("invitvo_analytics_consent") !== "accepted" ||
            window.localStorage.getItem("invitvo_analytics_exclude") === "true") return false;
    } catch {
        return false;
    }
    try {
        window.gtag("event", eventName, cleanParams(params));
        return true;
    } catch {
        return false;
    }
};

export const trackPhoneClick = (location: string) => {
    trackEvent("phone_click", { location });
};

export const trackEmailClick = (location: string) => {
    trackEvent("email_click", { location });
};
