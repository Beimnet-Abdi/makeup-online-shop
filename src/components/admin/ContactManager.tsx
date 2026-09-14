"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Save, RefreshCw } from "lucide-react";

interface SiteSettings {
  whatsapp_number: string;
  email_address: string;
  studio_location: string;
}

export default function ContactManager() {
  // 1. Initialize loading to true so we don't need to call setLoading(true) synchronously in an effect
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState<SiteSettings>({
    whatsapp_number: "",
    email_address: "",
    studio_location: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadContactInfo() {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("whatsapp_number, email_address, studio_location")
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching site settings:", error.message);
        } else if (data && isMounted) {
          setContactInfo({
            whatsapp_number: data.whatsapp_number || "",
            email_address: data.email_address || "",
            studio_location: data.studio_location || "",
          });
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadContactInfo();

    return () => {
      isMounted = false;
    };
  }, []); // Clean array prevents re-triggering render loops

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...contactInfo }, { onConflict: "id" });

    if (error) {
      setMessage("Failed to update contact info.");
      console.error("Save error:", error.message);
    } else {
      setMessage("Contact information updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-4 text-white flex items-center gap-2 text-sm">
        <RefreshCw className="animate-spin w-4 h-4" /> Loading Contact
        Settings...
      </div>
    );
  }

  return (
    <div className="bg-neutral-900/60 p-6 rounded-2xl border border-white/10 space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            Contact Information Settings
          </h2>
          <p className="text-xs text-neutral-400">
            Update your public WhatsApp, email, and studio location.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-sm hover:bg-[#E6C594] transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Contact Info"}
        </button>
      </div>

      {message && (
        <p className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 p-3 rounded-lg border border-[#D4AF37]/20">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase">
            WhatsApp / Phone
          </label>
          <input
            type="text"
            value={contactInfo.whatsapp_number}
            onChange={(e) =>
              setContactInfo({
                ...contactInfo,
                whatsapp_number: e.target.value,
              })
            }
            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase">
            Email Address
          </label>
          <input
            type="email"
            value={contactInfo.email_address}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email_address: e.target.value })
            }
            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none text-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase">
            Studio Location
          </label>
          <input
            type="text"
            value={contactInfo.studio_location}
            onChange={(e) =>
              setContactInfo({
                ...contactInfo,
                studio_location: e.target.value,
              })
            }
            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:border-[#D4AF37] outline-none text-white"
          />
        </div>
      </form>
    </div>
  );
}
