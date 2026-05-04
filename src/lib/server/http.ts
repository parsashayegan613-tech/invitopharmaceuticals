import { NextRequest, NextResponse } from "next/server";

const productionOrigins = ["https://www.invitvo.com", "https://invitvo.com"];
const localOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

const allowedOrigins = new Set(
    process.env.NODE_ENV === "production"
        ? productionOrigins
        : [...productionOrigins, ...localOrigins]
);

export const getClientIp = (request: NextRequest) => {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const rawIp = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "";
    return /^[0-9a-fA-F:.]+$/.test(rawIp) && rawIp.length <= 64 ? rawIp : null;
};

export const rejectInvalidOrigin = (request: NextRequest) => {
    const origin = request.headers.get("origin");
    if (origin && !allowedOrigins.has(origin)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return null;
};

export const rejectInvalidJsonContentType = (request: NextRequest) => {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
        return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
    }
    return null;
};

export const parseJsonBody = async <Payload>(request: NextRequest) => {
    try {
        return { payload: await request.json() as Payload, error: null };
    } catch {
        return {
            payload: null,
            error: NextResponse.json({ error: "Invalid request body" }, { status: 400 }),
        };
    }
};
