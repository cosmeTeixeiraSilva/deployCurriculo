import { Roboto } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Open_Sans } from 'next/font/google'
import { Poppins } from 'next/font/google'

// Roboto
export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
})

// Inter
export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
})

// Open Sans
export const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
})

// Poppins
export const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    display: 'swap',
})