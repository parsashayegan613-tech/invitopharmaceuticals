export const sanitizeText = (value: unknown, max = 1000) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

export const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
