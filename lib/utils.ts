import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().slice(0, 10);
}
