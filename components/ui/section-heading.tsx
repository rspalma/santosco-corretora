type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} ${className}`}
    >
      <p
        className={`text-xs font-extrabold uppercase tracking-[0.22em] ${inverse ? "text-gold" : "text-gold-dark"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif text-4xl leading-tight sm:text-5xl ${inverse ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-lg leading-8 ${centered ? "mx-auto max-w-3xl" : "max-w-3xl"} ${inverse ? "text-white/70" : "text-slate-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
