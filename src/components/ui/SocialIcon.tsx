import {
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

interface SocialIconProps {
  platform: "instagram" | "linkedin" | "telegram" | "whatsapp" | "tiktok";
  href: string;
}

export default function SocialIcon({ platform, href }: SocialIconProps) {
  const icons = {
    instagram: <FaInstagram className="w-4 h-4" />,
    linkedin: <FaLinkedinIn className="w-4 h-4" />,
    telegram: <FaTelegramPlane className="w-4 h-4" />,
    whatsapp: <FaWhatsapp className="w-4 h-4" />,
    tiktok: <FaTiktok className="w-4 h-4" />,
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-[#B5AEA5] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-white/10 transition-all duration-300 inline-flex items-center justify-center"
    >
      {icons[platform]}
    </a>
  );
}
