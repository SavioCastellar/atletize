import { getTranslations } from 'next-intl/server';

export const useTestimonialsInternationalization = async () => {
  const internationalization = await getTranslations('LandingPage');

  const headerTitle = internationalization('testimonials.headerTitle');
  const title = internationalization('testimonials.title');

  const testimonials = [
    'testimonials.testimonial1',
    'testimonials.testimonial2',
    'testimonials.testimonial3',
    'testimonials.testimonial4',
    'testimonials.testimonial5',
  ].map((testimonial, index) => [
    [
      {
        id: (index + 1).toString(),
        body: internationalization(`${testimonial}.body`),
        author: {
          name: internationalization(`${testimonial}.author.name`),
          handle: internationalization(`${testimonial}.author.handle`),
          imageUrl: internationalization(`${testimonial}.author.imageUrl`),
        },
      },
    ],
  ]) as {
    body: string;
    author: {
      name: string;
      handle: string;
      imageUrl: string;
    };
  }[][][];

  const principalTestimonial = testimonials.shift()?.shift()?.shift() as {
    body: string;
    author: {
      name: string;
      handle: string;
      imageUrl: string;
    };
  };

  const testimonialsIntl = {
    headerTitle,
    title,
    principalTestimonial,
    testimonials,
  };

  return {
    testimonialsIntl,
  };
};
