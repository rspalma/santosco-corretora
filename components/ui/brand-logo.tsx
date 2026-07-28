import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  variant?: "header" | "footer";
  priority?: boolean;
  className?: string;
};

const logoByVariant = {
  header: "/brand/logo-santos-co-header.png",
  footer: "/brand/logo-santos-co-footer.png",
} as const;

export function BrandLogo({
  variant = "header",
  priority = false,
  className = "",
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      aria-label="Santos Co. Corretora — ir para a página inicial"
      className={`inline-flex shrink-0 items-center rounded-lg ${className}`}
    >
      <Image
        src={logoByVariant[variant]}
        alt="Santos Co. Corretora"
        width={944}
        height={440}
        priority={priority}
        sizes={isFooter ? "220px" : "(max-width: 640px) 142px, 154px"}
        className={
          isFooter
            ? "h-auto w-[220px] object-contain"
            : "h-auto w-[142px] object-contain sm:w-[154px]"
        }
      />
    </Link>
  );
}
