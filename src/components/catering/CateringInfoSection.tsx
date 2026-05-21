import { cateringSections, eventRequirements } from '../../config/cateringContent';

export function CateringInfoSection() {
  return (
    <section
      id={cateringSections.requirements.id}
      className="catering-section catering-section--alt"
      aria-labelledby="requirements-heading"
    >
      <div className="catering-container">
        <header className="catering-section__header">
          <h2 id="requirements-heading" className="catering-section__title">
            {cateringSections.requirements.title}
          </h2>
          <p className="catering-section__subtitle">
            {cateringSections.requirements.subtitle}
          </p>
        </header>

        <div className="requirements-grid">
          {eventRequirements.map((req) => (
            <article key={req.id} className="ftw-card requirement-card">
              <h3>{req.title}</h3>
              <p>{req.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
