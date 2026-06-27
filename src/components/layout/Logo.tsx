import { Link } from "@tanstack/react-router";

type Props = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

export default function Logo({ size = "md" }: Props) {
  const imgSize = size === "sm" ? "h-8" : size === "lg" ? "h-16" : "h-10 sm:h-16";

  return (
    <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
      <img
        src="/logo.png"
        alt="AS Cars"
        className={`${imgSize} w-auto object-contain`}
      />
    </Link>
  );
}
