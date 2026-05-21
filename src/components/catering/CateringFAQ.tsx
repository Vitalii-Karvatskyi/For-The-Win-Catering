import { cateringFaq, cateringSections } from '../../config/cateringContent';

function FaqChevron() {
  return (
    <svg
      className="faq-item__chevron"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CateringFAQ() {
  return (
    <section
      id={cateringSections.faq.id}
      className="catering-section catering-section--faq"
      aria-labelledby="faq-heading"
    >
      <div className="catering-container catering-container--narrow">
        <h2 id="faq-heading" className="catering-section__title catering-section__title--center">
          {cateringSections.faq.title}
        </h2>

        <div className="faq-list">
          {cateringFaq.map((item) => (
            <details key={item.id} className="faq-item">
              <summary>
                <span>{item.question}</span>
                <FaqChevron />
              </summary>
              <div className="faq-item__body">
                <p className="faq-item__answer">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
