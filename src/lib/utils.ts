import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * True on devices where cursor-driven flourishes (tilt, glow, magnetic
 * buttons) make sense: a fine pointer that can hover, and no OS-level
 * reduced-motion preference. Touch and reduced-motion users get the
 * static experience.
 */
export function prefersFinePointer(): boolean {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
