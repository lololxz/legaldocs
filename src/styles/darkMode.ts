import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const darkStyles = {
  background: 'bg-gray-900',
  text: 'text-white',
  surface: 'bg-gray-800',
  hover: 'hover:bg-gray-700'
}

export const useDarkMode = () => {
  return { darkStyles }
}