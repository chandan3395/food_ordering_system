import { motion } from 'framer-motion';

import SectionHeading from '../common/SectionHeading';

const testimonials = [
  {
    quote:
      'The interface feels effortless, and the food arrives exactly the way it looks on screen. It is my default Friday night order now.',
    name: 'Rhea Kapoor',
    role: 'Product designer',
  },
  {
    quote:
      'Fast browsing, no confusing checkout steps, and the quality of the meals is consistently strong. Bites feels premium without slowing me down.',
    name: 'Aditya Nair',
    role: 'Startup founder',
  },
  {
    quote:
      'I can search quickly, adjust quantities easily, and see my order history whenever I need a reliable repeat meal.',
    name: 'Maya Thomas',
    role: 'Content strategist',
  },
];

const TestimonialSection = () => (
  <section className="section-shell mt-20">
    <SectionHeading
      eyebrow="Loved by regulars"
      title="People keep coming back because the whole flow feels thoughtful."
      description="From discovery to delivery details, every step is tuned to feel calm, clear, and quick."
    />

    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <motion.article
          key={testimonial.name}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="surface-panel p-6"
        >
          <p className="text-base leading-8 text-ink/70">“{testimonial.quote}”</p>
          <div className="mt-8">
            <p className="font-heading text-xl font-semibold">{testimonial.name}</p>
            <p className="text-sm text-ink/50">{testimonial.role}</p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);

export default TestimonialSection;

