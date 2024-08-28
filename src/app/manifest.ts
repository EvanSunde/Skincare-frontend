import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nephara',
    short_name: 'Nephara',
    description: 'Online Dermatologist Appointment',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fdff',
    theme_color: '#743bfb',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '256x256',
        type: 'image/png'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
