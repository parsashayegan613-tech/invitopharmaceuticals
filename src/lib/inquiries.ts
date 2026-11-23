export const inquiryTypes = ["general", "documentation", "investment", "research"] as const;
export type InquiryType = typeof inquiryTypes[number];
export const inquiryLabels: Record<InquiryType, string> = {
    general: "Product or general inquiry",
    documentation: "Terrein sample COA & SDS",
    investment: "Investment inquiry",
    research: "Research collaboration",
};
