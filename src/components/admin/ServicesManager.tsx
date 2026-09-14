"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Save, Plus, Trash2, RefreshCw, Upload } from "lucide-react";

interface Service {
  id: string;
  tag: string;
  title: string;
  short_description: string;
  full_description: string;
  fg_image: string;
  bg_image: string;
  sort_order: number;
}

// Validation Configuration
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB limit
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

const validateFile = (file: File): string | null => {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return "Invalid file type. Only JPEG, PNG, WebP, SVG, and GIF images are allowed.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds the 5 MB limit. Please select a smaller file.";
  }
  return null;
};

export default function ServicesManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  // Exact Supabase Storage Bucket name
  const BUCKET_NAME = "servicesimages";

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("sort_order", { ascending: true });

        if (error) {
          console.error("Error fetching services:", error.message);
        } else if (data && isMounted) {
          setServices(data);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleServiceChange = (
    index: number,
    field: keyof Service,
    value: string | number,
  ) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: "fg_image" | "bg_image",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Client-side file validation
    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      e.target.value = ""; // Reset input
      return;
    }

    try {
      setUploading(`${index}-${field}`);
      const rawExt = file.name.split(".").pop() || "jpg";
      const cleanExt = rawExt.toLowerCase().replace(/[^a-z0-9]/g, "");
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${cleanExt}`;
      const filePath = `services/${fileName}`;

      // Upload file to 'servicesimages' bucket
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obtain Public URL from 'servicesimages'
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      if (!urlData?.publicUrl) throw new Error("Failed to generate public URL");

      // Save public URL into local state
      handleServiceChange(index, field, urlData.publicUrl);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";

      console.error("Upload error:", errorMessage);
      alert("Failed to upload image: " + errorMessage);
    } finally {
      setUploading(null);
      e.target.value = ""; // Reset file input element
    }
  };

  const addServiceField = () => {
    const newId = `service-${Date.now()}`;
    setServices([
      ...services,
      {
        id: newId,
        tag: "NEW TAG",
        title: "NEW SERVICE",
        short_description: "",
        full_description: "",
        fg_image: "",
        bg_image: "",
        sort_order: services.length + 1,
      },
    ]);
  };

  const removeService = async (index: number, id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("services")
      .upsert(services, { onConflict: "id" });

    if (error) {
      setMessage("Error updating services list.");
      console.error("Save error:", error.message);
    } else {
      setMessage("Services updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-4 text-white flex items-center gap-2 text-sm">
        <RefreshCw className="animate-spin w-4 h-4" /> Loading Services...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-900/60 p-6 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            Services Catalog Management
          </h2>
          <p className="text-xs text-neutral-400">
            Upload images from your device & edit descriptions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={addServiceField}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase transition-colors text-white"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:bg-[#E6C594] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Services"}
          </button>
        </div>
      </div>

      {message && (
        <p className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 p-3 rounded-lg border border-[#D4AF37]/20">
          {message}
        </p>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {services.map((service, index) => {
          const formattedIndex = String(index + 1).padStart(2, "0");

          return (
            <div
              key={service.id}
              className="bg-neutral-900/60 p-6 rounded-2xl border border-white/10 space-y-4 text-white"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-sm font-mono text-[#D4AF37] font-bold">
                  SERVICE #{formattedIndex}
                </span>
                <button
                  type="button"
                  onClick={() => removeService(index, service.id)}
                  className="text-red-400 hover:text-red-300 p-2 rounded-lg bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={service.title || ""}
                    onChange={(e) =>
                      handleServiceChange(index, "title", e.target.value)
                    }
                    className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={service.tag || ""}
                    onChange={(e) =>
                      handleServiceChange(index, "tag", e.target.value)
                    }
                    className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={service.short_description || ""}
                  onChange={(e) =>
                    handleServiceChange(
                      index,
                      "short_description",
                      e.target.value,
                    )
                  }
                  className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={service.full_description || ""}
                  onChange={(e) =>
                    handleServiceChange(
                      index,
                      "full_description",
                      e.target.value,
                    )
                  }
                  className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Foreground & Background Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs text-neutral-400">
                    Foreground Image
                  </label>
                  {service.fg_image && (
                    <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                      <img
                        src={service.fg_image}
                        alt="Foreground Preview"
                        className="h-full object-contain"
                      />
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors bg-black/40 text-xs">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>
                      {uploading === `${index}-fg_image`
                        ? "Uploading..."
                        : "Choose file from device"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                      className="hidden"
                      disabled={uploading === `${index}-fg_image`}
                      onChange={(e) => handleImageUpload(e, index, "fg_image")}
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-neutral-400">
                    Background Image
                  </label>
                  {service.bg_image && (
                    <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                      <img
                        src={service.bg_image}
                        alt="Background Preview"
                        className="h-full object-contain"
                      />
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors bg-black/40 text-xs">
                    <Upload className="w-4 h-4 text-[#D4AF37]" />
                    <span>
                      {uploading === `${index}-bg_image`
                        ? "Uploading..."
                        : "Choose file from device"}
                    </span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
                      className="hidden"
                      disabled={uploading === `${index}-bg_image`}
                      onChange={(e) => handleImageUpload(e, index, "bg_image")}
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
}
