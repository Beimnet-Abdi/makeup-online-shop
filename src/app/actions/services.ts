"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

interface ServiceData {
  id: string;
  tag?: string;
  title?: string;
  short_description?: string;
  full_description?: string;
  fg_image?: string;
  bg_image?: string;
  sort_order?: number;
}

export async function updateServiceAction(formData: ServiceData | ServiceData[]) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  // Verify session on the server
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized: You must be logged in as an administrator.");
  }

  // Execute database action safely
  const { error: updateError } = await supabase
    .from("services")
    .upsert(formData);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { success: true };
}