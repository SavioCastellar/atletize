import { MetadataRoute } from 'next';
import { SEO } from './SEO';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO.title,
    short_name: SEO.title,
    description: SEO.description  ,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
