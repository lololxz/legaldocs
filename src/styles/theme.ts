import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const darkMode = {
  background: 'bg-gray-900',
  text: 'text-white',
  hover: 'hover:bg-gray-800'
}