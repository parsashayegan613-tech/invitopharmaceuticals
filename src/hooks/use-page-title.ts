import { useEffect } from "react";

/**
 * Sets the document title for the current page.
 * Appends " | InVitvo Pharmaceuticals" to the provided title.
 */
export const usePageTitle = (title: string) => {
    useEffect(() => {
        const suffix = "InVitvo Pharmaceuticals";
        document.title = title ? `${title} | ${suffix}` : suffix;
        return () => {
            document.title = suffix;
        };
    }, [title]);
};
