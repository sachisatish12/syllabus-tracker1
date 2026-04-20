"use client";

import React from "react";

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
  const base = "px-6 py-2 rounded-lg font-medium transition";

  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {text}
    </button>
  );
}