import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dompee.lk - Discover Local Shops in Dompe',
  description: 'Find and explore all the shops in Dompe town. Search local businesses, read reviews, and connect with shop owners.',
  keywords: 'Dompe, Sri Lanka, local shops, business directory, Dompee',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}
