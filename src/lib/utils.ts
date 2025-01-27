import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines multiple class names using clsx and ensures Tailwind classes merge properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
