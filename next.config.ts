import type { NextConfig } from "next";

const getSupabaseConnectSource = () => {
    const configuredUrl =
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;

    if (!configuredUrl) {
        return "https://*.supabase.co";
    }

    try {
        return new URL(configuredUrl).origin;
    } catch {
        return "https://*.supabase.co";
    }
};

const supabaseConnectSource = getSupabaseConnectSource();
const isDevelopment = process.env.NODE_ENV === "development";

const scriptSources = [
    "'self'",
    "'unsafe-inline'",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    "https://www.googletagmanager.com",
];

const connectSources = [
    "'self'",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.googletagmanager.com",
    supabaseConnectSource,
    ...(isDevelopment
        ? [
              "http://localhost:*",
              "http://127.0.0.1:*",
              "ws://localhost:*",
              "ws://127.0.0.1:*",
          ]
        : []),
];

const securityHeaders = [
    {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
    },
    {
        key: "X-Frame-Options",
        value: "DENY",
    },
    {
        key: "X-Content-Type-Options",
        value: "nosniff",
    },
    {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
    },
    {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    {
        key: "Content-Security-Policy",
        value: [
            "default-src 'self'",
            `script-src ${scriptSources.join(" ")}`,
            `connect-src ${connectSources.join(" ")}`,
            "img-src 'self' data: blob: https:",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self' data:",
            "frame-src https://www.google.com https://maps.google.com",
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join("; "),
    },
];

const nextConfig: NextConfig = {
    outputFileTracingRoot: process.cwd(),
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        unoptimized: false,
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
