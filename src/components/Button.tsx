"use client";

type ButtonProps = {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  text,
  variant = "primary",
  onClick,
}: ButtonProps) {
  const base =
    "px-6 py-2 rounded-xl font-medium transition duration-200";

  const styles =
    variant === "primary"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-black text-white hover:bg-gray-900";

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {text}
    </button>
  );
}