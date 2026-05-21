import { cateringSections, cateringTestimonials } from '../../config/cateringContent';

function StarRating() {
  return (
    <div className="testimonial-card__stars" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export function CateringTestimonials() {
  return (
    <section
      className="catering-section catering-section--testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="catering-container">
        <h2 id="testimonials-heading" className="catering-section__title catering-section__title--center catering-section__title--light">
          {cateringSections.testimonials.title}
        </h2>

        <div className="testimonials-grid">
          {cateringTestimonials.map((item) => (
            <article key={item.id} className="testimonial-card">
              <StarRating />
              <blockquote className="testimonial-card__quote">“{item.quote}”</blockquote>
              <p className="testimonial-card__author">{item.author}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
