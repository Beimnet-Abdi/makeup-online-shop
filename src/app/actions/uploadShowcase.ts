"use server";

import { createClient } from "@/utils/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

export async function uploadShowcasePhoto(formData: FormData) {
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || null;

  if (!file) {
    return { error: "No file provided." };
  }

  // 1. Server-side size validation
  if (file.size > MAX_FILE_SIZE) {
    return { error: "File size exceeds the 5 MB limit." };
  }

  // 2. Server-side MIME type validation
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return { error: "Invalid file type. Only image files are allowed." };
  }

  const supabase = await createClient();

  // Generate safe filename
  const rawExt = file.name.split(".").pop() || "jpg";
  const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
  const fileName = `transformations/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${cleanExt}`;

  // 3. Storage Upload
  const { error: uploadError } = await supabase.storage
    .from("hiwot-assets")
    .upload(fileName, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) return { error: uploadError.message };

  const { data: urlData } = supabase.storage
    .from("hiwot-assets")
    .getPublicUrl(fileName);

  if (!urlData?.publicUrl) {
    return { error: "Failed to resolve public image URL." };
  }

  // 4. Database Insert
  const { error: insertError } = await supabase
    .from("transformations")
    .insert([{ title, image: urlData.publicUrl }]);

  if (insertError) return { error: insertError.message };

  return { success: true };
}