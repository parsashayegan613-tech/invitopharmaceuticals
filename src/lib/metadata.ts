import type { Metadata } from "next";

const siteName = "InVitvo Pharmaceuticals";
const baseUrl = "https://www.invitvo.com";
const defaultImage = "/og-image.png";

type PageMetadataOptions = {
    title: string;
    description: string;
    path: string;
    imageAlt?: string;
};

export const pageMetadata = ({
    title,
    description,
    path,
    imageAlt = "InVitvo Pharmaceuticals research compounds",
}: PageMetadataOptions): Metadata => {
    const url = `${baseUrl}${path}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title: `${title} | ${siteName}`,
            description,
            url,
            type: "website",
            siteName,
            images: [
                {
                    url: defaultImage,
                    width: 1200,
                    height: 630,
                    alt: imageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${siteName}`,
            description,
            images: [defaultImage],
        },
    };
};
