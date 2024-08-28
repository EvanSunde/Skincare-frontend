import { Inter, Architects_Daughter } from 'next/font/google';
import './globals.css';
import 'aos/dist/aos.css';
import Icon from '@/assets/apple-touch-icon.png'
import LayoutWrapper from './layout/LayoutWrapper';
import { Metadata } from 'next';
import Head from 'next/head';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Nephara Skincare - Online Skin Appointments',
  description: 'Nephara - Online website providing skin apppointments service with dermatologists on affordable price.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#743bfb"/>
        <link rel="icon" href="/favicon.ico" sizes="32x32 64x64" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="apple-touch-icon" sizes="180x180" href={Icon.src} />
        <meta property="og:title" content="Nephara Skincare" />
        <meta property="og:description" content="Nephara - Online website providing skin apppointments service with dermatologists on affordable price." />
        <meta name="keywords" content="Online skin appointments, skin care, skin ,dermatologists" />
        {/* -------------website image -------------- */}
        <meta property="og:image" content="URL of an image to display" />
        <meta property="og:url" content="https://www.nephara.com/" />

        {/* ---------for twitter ----- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nephara Skincare" />
        <meta name="twitter:description" content="Nephara - Online website providing skin apppointments service with dermatologists on affordable price." />
        <meta name="twitter:image" content="URL of an image to display" />

      </Head>
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 tracking-tight`} style={{ height: "100dvh", overflowX: "hidden" }}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
};
