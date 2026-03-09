"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    // Create a stable QueryClient instance per-component mount (SSR-safe)
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                {children}
            </TooltipProvider>
        </QueryClientProvider>
    );
}
