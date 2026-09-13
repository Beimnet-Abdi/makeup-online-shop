"use client";

import { supabase } from "@/lib/supabaseClient";
import ProductManager from "@/components/ProductManager";
import ShowcaseManager from "@/components/ShowcaseManager";

export default function AdminForms() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b border-neutral-800 pb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#D4AF37]">
              HIWOT Admin Panel
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Manage your store products and client transformation gallery.
            </p>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 border border-neutral-700 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Sign Out
          </button>
        </header>

        {/* Product Management Section */}
        <ProductManager />

        {/* Showcase Management Section */}
        <ShowcaseManager />
      </div>
    </main>
  );
}
