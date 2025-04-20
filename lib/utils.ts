import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges multiple class values into a single string using `twMerge` and `clsx`.
 *
 * @param {...ClassValue[]} inputs - An array of class value arguments to be merged.
 * @returns {string} - A single string containing all the merged class values.
 *
 * @example
 * const mergedClasses = cn('class1', 'class2', { class3: true });
 * console.log(mergedClasses); // Output: "class1 class2 class3"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
