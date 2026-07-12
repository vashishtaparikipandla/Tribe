import MarkLight from "@/assets/logos/tribe-mark.svg";
import MarkOnDark from "@/assets/logos/tribe-mark-on-dark.svg";
import WordmarkDark from "@/assets/logos/tribe-wordmark-dark.svg";
import WordmarkLight from "@/assets/logos/tribe-wordmark-light.svg";

const SIZE_MAP: Record<string, number> = {
  favicon: 16,
  navIcon: 28,
  onboarding: 96,
  splash: 120,
  passportBadge: 40,
};

interface TribeLogoProps {
  variant?: "mark" | "wordmark";
  size?: number | "favicon" | "navIcon" | "onboarding" | "splash" | "passportBadge";
  background?: "light" | "dark";
}

/**
 * <TribeLogo variant="mark" size="navIcon" background="light" />
 * <TribeLogo variant="wordmark" size="onboarding" background="dark" />
 */
export function TribeLogo({ variant = "mark", size = "navIcon", background = "light" }: TribeLogoProps) {
  const px = typeof size === "number" ? size : SIZE_MAP[size as string] ?? 28;
  const src =
    variant === "wordmark"
      ? background === "dark"
        ? WordmarkLight
        : WordmarkDark
      : background === "dark"
        ? MarkOnDark
        : MarkLight;

  return (
    <img
      src={src}
      alt="Tribe Logo"
      width={variant === "wordmark" ? px * (220 / 60) : px}
      height={px}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}
