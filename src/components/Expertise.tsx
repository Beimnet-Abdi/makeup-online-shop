import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Face Makeup",
    description:
      "Our face makeup services are designed to enhance your natural features while we use imported items for the care of your skin.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M7 20c2-6 5-10 10-14M9.5 18.5c1.2-1.8 3.2-3.2 5.5-4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M15.5 5.5c1.2-.8 2.8-.6 3.6.4.8 1 .4 2.6-.8 3.4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Hair Styling",
    description:
      "Our hair styling services are designed to complement your features and outfit, creating polished looks with products suited for you.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M8 5l8 14M16 5L8 19"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle
          cx="8"
          cy="4.5"
          r="1.2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle
          cx="16"
          cy="4.5"
          r="1.2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    title: "Eye Makeup",
    description:
      "Our eye makeup services are designed to define and enhance your eyes with precision and balance — from soft daytime glam to evening drama.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M2.5 12s3.5-5.5 9.5-5.5S21.5 12 21.5 12s-3.5 5.5-9.5 5.5S2.5 12 2.5 12z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle
          cx="12"
          cy="12"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M7 8.2c.4-.9 1-.9 1.4 0M17 8.2c-.4-.9-1-.9-1.4 0"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Bridal Makeover",
    description:
      "Every bride deserves a timeless, elegant look that feels uniquely her own — soft glow, lasting finish, and quiet confidence.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M6 7h12M7.5 7c0 5 2 9 4.5 11.5C14.5 16 16.5 12 16.5 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M9 7c.3-2 1.5-3.5 3-3.5S14.7 5 15 7"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Nail Art",
    description:
      "Elegant nail art designed to complement your style, using premium products chosen for beauty, comfort, and lasting wear.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M10 3.5h4v5.5l1.2 10.2a2 2 0 01-2 2.3h-2.4a2 2 0 01-2-2.3L10 9V3.5z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M10 8.5h4" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Nail Extension",
    description:
      "Expert nail extensions crafted for strength, comfort, and a flawless finish that elevates the beauty of your hands.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          d="M8 20c0-4 1.2-8 4-11.5C14.8 12 16 16 16 20"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M9.2 20h5.6M10 8.5c.6-1.4 1.5-2.5 2-2.5s1.4 1.1 2 2.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="relative overflow-hidden py-20 md:py-28">
      {/* First picture — services section backdrop */}
      <Image
        src="/images/services-section.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center brightness-[0.28] contrast-[1.08] saturate-[0.85]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(26,15,11,0.45) 0%, rgba(7,4,3,0.88) 72%), linear-gradient(180deg, #070403 0%, rgba(7,4,3,0.7) 12%, transparent 28%, transparent 75%, rgba(7,4,3,0.85) 90%, #070403 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="text-center">
          <p className="font-serif text-sm tracking-wide text-cream/80">
            What I Offer
          </p>
          <h2 className="mt-2 font-serif text-[2.5rem] tracking-tight text-cream md:text-[3.25rem]">
            My Expertise
          </h2>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/45 text-cream">
                {service.icon}
              </span>
              <h3 className="mt-5 font-serif text-xl text-cream md:text-[1.35rem]">
                {service.title}
              </h3>
              <p className="mt-3 max-w-[17rem] text-[0.82rem] font-light leading-[1.75] text-cream-soft">
                {service.description}{" "}
                <Link
                  href="/services"
                  className="text-cream/90 transition-colors duration-300 hover:text-cream"
                >
                  ...Read More
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
