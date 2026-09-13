"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

interface ShowcaseItem {
  id: string;
  title: string | null;
  image: string;
}

export default function ShowcaseManager() {
  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [showcaseTitle, setShowcaseTitle] = useState("");
  const [showcaseFile, setShowcaseFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const parseErrorMessage = (err: unknown): string => {
    if (!err) return "An unknown error occurred.";
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    if (typeof err === "object" && err !== null) {
      const sbErr = err as { message?: string };
      return sbErr.message || JSON.stringify(err);
    }
    return String(err);
  };

  const generateFileName = (file: File) => {
    const rawExt = file.name.split(".").pop() || "jpg";
    const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `transformations/${timestamp}-${randomSuffix}.${cleanExt}`;
  };

  const fetchShowcase = async () => {
    try {
      const { data, error } = await supabase
        .from("transformations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setShowcaseItems(data);
      }
    } catch (err: unknown) {
      alert(`Error fetching showcase: ${parseErrorMessage(err)}`);
    }
  };

  // Fixed useEffect to prevent synchronous setState lint/compiler warnings
  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      try {
        const { data, error } = await supabase
          .from("transformations")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && isSubscribed) {
          setShowcaseItems(data);
        }
      } catch (err: unknown) {
        if (isSubscribed) {
          alert(`Error fetching showcase: ${parseErrorMessage(err)}`);
        }
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleShowcaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showcaseFile) return alert("Please select an image file.");

    setIsUploading(true);
    try {
      const fileName = generateFileName(showcaseFile);
      const { error: uploadError } = await supabase.storage
        .from("hiwot-assets")
        .upload(fileName, showcaseFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("hiwot-assets")
        .getPublicUrl(fileName);

      if (!urlData?.publicUrl) throw new Error("Failed to get public URL");

      const { error: insertError } = await supabase
        .from("transformations")
        .insert([
          {
            title: showcaseTitle || null,
            image: urlData.publicUrl,
          },
        ]);

      if (insertError) throw insertError;

      alert("Showcase photo added!");
      setShowcaseTitle("");
      setShowcaseFile(null);
      await fetchShowcase();
    } catch (err: unknown) {
      alert(`Upload error: ${parseErrorMessage(err)}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transformation?")) return;
    try {
      const { error } = await supabase
        .from("transformations")
        .delete()
        .eq("id", id);
      if (error) throw error;
      alert("Deleted!");
      await fetchShowcase();
    } catch (err: unknown) {
      alert(`Delete error: ${parseErrorMessage(err)}`);
    }
  };

  return (
    <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-6 text-[#E6C594]">
        Add Client Transformation Photo
      </h2>
      <form onSubmit={handleShowcaseSubmit} className="space-y-5">
        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Look Title / Client Name (Optional)
          </label>
          <input
            type="text"
            value={showcaseTitle}
            onChange={(e) => setShowcaseTitle(e.target.value)}
            placeholder="e.g. Bridal Glam Transformation"
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-2">
            Showcase Photo *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setShowcaseFile(e.target.files?.[0] || null)}
            className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#D4AF37] file:text-black file:font-semibold"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#E6C594] text-black font-bold rounded-lg disabled:opacity-50"
        >
          {isUploading ? "Adding Photo..." : "Add to Showcase"}
        </button>
      </form>

      <div className="mt-10 border-t border-neutral-800 pt-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          Existing Showcase Items ({showcaseItems.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-700/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.title || "Showcase"}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-bold text-sm">
                    {item.title || "Untitled Look"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs bg-red-600/80 px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
