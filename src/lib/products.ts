import { terrein } from "@/lib/terrein";

export const productIds = ["terrein-5mg", "terrein-10mg", "terrein-custom"] as const;

export type ProductId = typeof productIds[number];

export type ProductCatalogItem = {
    id: ProductId;
    name: string;
    amount: string;
    price: string;
    priceCad: number | null;
    catalog: string;
    orderUrl: string;
    isCustomQuantity: boolean;
};

export const productCatalog: Record<ProductId, ProductCatalogItem> = {
    "terrein-5mg": {
        id: "terrein-5mg",
        name: `Terrein ${terrein.purity}`,
        amount: "5 mg",
        price: "C$450",
        priceCad: 450,
        catalog: "INV-TER-005",
        orderUrl: "https://www.invitvo.com/order?product=terrein&quantity=5mg",
        isCustomQuantity: false,
    },
    "terrein-10mg": {
        id: "terrein-10mg",
        name: `Terrein ${terrein.purity}`,
        amount: "10 mg",
        price: "C$800",
        priceCad: 800,
        catalog: "INV-TER-010",
        orderUrl: "https://www.invitvo.com/order?product=terrein&quantity=10mg",
        isCustomQuantity: false,
    },
    "terrein-custom": {
        id: "terrein-custom",
        name: `Terrein ${terrein.purity}`,
        amount: "Custom",
        price: "Quote",
        priceCad: null,
        catalog: "INV-TER-XXX",
        orderUrl: "https://www.invitvo.com/order?product=terrein&quantity=custom",
        isCustomQuantity: true,
    },
};

export const productList = productIds.map((id) => productCatalog[id]);
export const standardProducts = productList.filter((product) => !product.isCustomQuantity);
