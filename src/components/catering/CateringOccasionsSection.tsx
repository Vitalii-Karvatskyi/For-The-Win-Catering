import { cateringOccasions, cateringSections } from '../../config/cateringContent';
import { ftwAssets } from '../../config/ftwAssets';

export function CateringOccasionsSection() {
  return (
    <section className="catering-section" aria-labelledby="occasions-heading">
      <div className="catering-container">
        <div className="occasions-layout">
          <div className="occasions-layout__content">
            <h2 id="occasions-heading" className="catering-section__title">
              {cateringSections.occasions.title}
            </h2>
            <p className="catering-section__subtitle">
              {cateringSections.occasions.subtitle}
            </p>

            <div className="occasions-grid">
              {cateringOccasions.map((item) => (
                <article key={item.id} className="occasions-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="occasions-layout__media">
            <img
              src={ftwAssets.occasionsImage}
              alt="For The Win catering setup"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
