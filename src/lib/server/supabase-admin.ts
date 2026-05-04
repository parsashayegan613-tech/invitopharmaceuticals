import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { requireServerEnv } from "@/lib/server/env";

let supabaseAdmin: SupabaseClient<Database> | null = null;

export const getSupabaseAdmin = () => {
    if (!supabaseAdmin) {
        supabaseAdmin = createClient<Database>(
            requireServerEnv("SUPABASE_URL"),
            requireServerEnv("SUPABASE_SERVICE_ROLE_KEY"),
            {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                },
            }
        );
    }

    return supabaseAdmin;
};
