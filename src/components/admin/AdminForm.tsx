"use client";

import { useState } from "react";
import ContactManager from "@/components/admin/ContactManager";
import ServicesManager from "@/components/admin/ServicesManager";

import ShowcaseManager from "@/components/admin/ShowcaseManager";
import ProductManager from "@/components/admin/ProductManager";

export default function AdminForm() {
  const [activeTab, setActiveTab] = useState<
    "showcase" | "shop" | "services" | "contact"
  >("showcase");

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6 md:p-12 text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#D4AF37]">
          Admin Control Dashboard
        </h1>
        <p className="text-neutral-400 text-sm mt-1">
          Manage dynamic content, products, services, and site settings.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("showcase")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "showcase"
              ? "bg-[#D4AF37] text-black"
              : "bg-white/5 text-neutral-400 hover:text-white"
          }`}
        >
          Showcase
        </button>
        <button
          onClick={() => setActiveTab("shop")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "shop"
              ? "bg-[#D4AF37] text-black"
              : "bg-white/5 text-neutral-400 hover:text-white"
          }`}
        >
          Shop
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "services"
              ? "bg-[#D4AF37] text-black"
              : "bg-white/5 text-neutral-400 hover:text-white"
          }`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "contact"
              ? "bg-[#D4AF37] text-black"
              : "bg-white/5 text-neutral-400 hover:text-white"
          }`}
        >
          Contact & Location
        </button>
      </div>

      {/* Tab Panels */}
      <div className="pt-4">
        {activeTab === "showcase" && <ShowcaseManager />}
        {activeTab === "shop" && <ProductManager />}
        {activeTab === "services" && <ServicesManager />}
        {activeTab === "contact" && <ContactManager />}
      </div>
    </div>
  );
}
