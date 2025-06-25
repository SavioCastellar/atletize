import { MetadataRoute } from 'next';
import { SEO } from './SEO';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SEO.domain}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SEO.domain}/signin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url:  `${SEO.domain}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url:  `${SEO.domain}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
