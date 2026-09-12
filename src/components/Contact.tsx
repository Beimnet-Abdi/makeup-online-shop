"use client";

import { useState, FormEvent } from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import SocialIcon from "@/components/ui/SocialIcon";
import { MessageCircle, PhoneCall, Mail, MapPin } from "lucide-react";

// Administrator WhatsApp / Phone details
const WHATSAPP_NUMBER = "251975136484";
const PHONE_DISPLAY = "+251 975 136 484";
const EMAIL_ADDRESS = "contact@rutbamakeup.com";

export default function Contact() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "bridal",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const interestLabels: Record<string, string> = {
      bridal: "Bridal Makeup",
      editorial: "Editorial / High Fashion",
      event: "Special Event Glam",
      coaching: "1:1 Coaching & Masterclass",
    };

    const message = `
*New Booking Inquiry from RUTBA Website*
━━━━━━━━━━━━━━━━━━━━

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service Interest:* ${interestLabels[formData.interest] || formData.interest}

*Message:*
${formData.message}
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Section
      id="contact"
      className={`py-24 px-6 border-t transition-colors duration-500 ${
        isDark
          ? "bg-black text-white border-white/10"
          : "bg-white text-black border-black/10"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            GET IN{" "}
            <span
              className={
                isDark
                  ? "bg-gradient-to-r from-[#D4AF37] via-[#E6C594] to-[#E2B2A2] bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#E2B2A2] bg-clip-text text-transparent"
              }
            >
              TOUCH
            </span>
          </h2>
          <p
            className={`font-sans text-sm md:text-base font-light max-w-xl mx-auto transition-colors duration-500 ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Have a question or ready to book your bespoke makeup session? Fill
            out the form below to connect directly with us.
          </p>
        </div>

        {/* Outer Split Card Container */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border shadow-2xl transition-colors duration-500 ${
            isDark
              ? "bg-[#0D0B0A] border-white/10 shadow-black/80"
              : "bg-neutral-50 border-black/10 shadow-neutral-200"
          }`}
        >
          {/* LEFT SIDE: Form */}
          <div className="lg:col-span-7 p-8 md:p-12">
            <h3 className="font-sans text-2xl font-bold tracking-tight mb-2">
              Send us a message
            </h3>
            <p
              className={`font-sans text-xs md:text-sm font-light mb-8 ${
                isDark ? "text-neutral-400" : "text-neutral-500"
              }`}
            >
              Fill out your details below and we will prepare your booking
              inquiry instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Jane Doe"
                    className={`w-full rounded-xl px-4 py-3.5 font-sans text-sm outline-none transition-colors duration-300 border ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-[#D4AF37]"
                        : "bg-white border-neutral-200 text-black placeholder-neutral-400 focus:border-[#D4AF37]"
                    }`}
                  />
                </div>

                {/* Phone Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+251 912 345 678"
                    className={`w-full rounded-xl px-4 py-3.5 font-sans text-sm outline-none transition-colors duration-300 border ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-[#D4AF37]"
                        : "bg-white border-neutral-200 text-black placeholder-neutral-400 focus:border-[#D4AF37]"
                    }`}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="jane@example.com"
                  className={`w-full rounded-xl px-4 py-3.5 font-sans text-sm outline-none transition-colors duration-300 border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-[#D4AF37]"
                      : "bg-white border-neutral-200 text-black placeholder-neutral-400 focus:border-[#D4AF37]"
                  }`}
                />
              </div>

              {/* Service Interest Select */}
              <div className="space-y-2">
                <label
                  htmlFor="interest"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]"
                >
                  Service Interest
                </label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) =>
                    setFormData({ ...formData, interest: e.target.value })
                  }
                  className={`w-full rounded-xl px-4 py-3.5 font-sans text-sm outline-none transition-colors duration-300 border ${
                    isDark
                      ? "bg-[#141210] border-white/10 text-white focus:border-[#D4AF37]"
                      : "bg-white border-neutral-200 text-black focus:border-[#D4AF37]"
                  }`}
                >
                  <option value="bridal">Bridal Makeup</option>
                  <option value="editorial">Event & Party Makeup</option>
                  <option value="event">Soft Glam</option>
                  <option value="photo">PhotoShoot</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37]"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your event, date, or specific requirements..."
                  className={`w-full rounded-xl px-4 py-3.5 font-sans text-sm outline-none transition-colors duration-300 border resize-none ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-neutral-500 focus:border-[#D4AF37]"
                      : "bg-white border-neutral-200 text-black placeholder-neutral-400 focus:border-[#D4AF37]"
                  }`}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full md:w-auto gap-2 px-8 py-4"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Message via WhatsApp
                </Button>
              </div>
            </form>
          </div>

          {/* RIGHT SIDE: Info Box */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col">
            <div
              className={`h-full rounded-2xl p-8 flex flex-col justify-between border ${
                isDark
                  ? "bg-[#141210] border-white/10 text-white"
                  : "bg-[#0D0B0A] border-black/10 text-[#F5F2EB]"
              }`}
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans text-xl md:text-2xl font-bold tracking-tight mb-2">
                    We are always here to help you.
                  </h4>
                  <p className="font-sans text-xs md:text-sm font-light text-neutral-400 mb-8">
                    Reach out through any of our channels or book your
                    consultation directly.
                  </p>
                </div>

                {/* Contact Channels with equal flex spacing */}
                <div className="flex-1 flex flex-col justify-space-between space-y-4">
                  {/* SMS / WhatsApp */}
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group"
                  >
                    <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        SMS / WhatsApp
                      </p>
                      <p className="font-sans text-sm md:text-base font-medium">
                        +{WHATSAPP_NUMBER}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-colors group"
                  >
                    <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="font-sans text-sm md:text-base font-medium">
                        {EMAIL_ADDRESS}
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex-1 flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="p-2.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                        Studio Location
                      </p>
                      <p className="font-sans text-sm md:text-base font-medium">
                        Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Social Links */}
              <div className="pt-8 border-t border-white/10 mt-8">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-4">
                  Connect with us
                </p>
                <div className="flex items-center gap-3">
                  <SocialIcon
                    platform="instagram"
                    href="https://instagram.com"
                  />
                  <SocialIcon platform="telegram" href="https://t.me" />
                  <SocialIcon
                    platform="whatsapp"
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  />
                  <SocialIcon platform="tiktok" href="https://tiktok.com" />
                  <SocialIcon platform="linkedin" href="https://linkedin.com" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
