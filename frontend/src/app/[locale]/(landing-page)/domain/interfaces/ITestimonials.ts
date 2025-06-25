interface Person {
  name: string;
  handle: string;
  imageUrl: string;
}

interface Testimonial {
  body: string;
  author: Person;
}

export interface ITestimonialsIntl {
  headerTitle: string;
  title: string;
  principalTestimonial: Testimonial;
  testimonials: Testimonial[][][];
}
