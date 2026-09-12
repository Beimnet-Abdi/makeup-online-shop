const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "100+", label: "Clients Served" },
  { value: "6", label: "Specialization" },
];

export default function HeroStats() {
  return (
    <ul className="flex max-w-md items-start gap-8 sm:gap-12 md:gap-14">
      {stats.map((stat) => (
        <li key={stat.label} className="min-w-0">
          <p className="font-serif text-[2rem] leading-none tracking-tight text-cream md:text-[2.35rem]">
            {stat.value}
          </p>
          <p className="mt-2 text-[0.7rem] font-light tracking-[0.04em] text-cream-soft/80 md:text-[0.75rem]">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
