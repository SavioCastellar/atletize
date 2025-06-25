import { MetadataRoute } from 'next';
import { SEO } from './SEO';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${SEO.domain}/sitemap.xml`,
  };
}
