import { cateringHero } from '../../config/cateringContent';
import { ftwAssets } from '../../config/ftwAssets';
import '../../styles/catering.css';
import { FtwSiteFooter } from '../site/FtwSiteFooter';
import { FtwSiteHeader } from '../site/FtwSiteHeader';
import { CateringCalculator } from './CateringCalculator';
import { CateringFAQ } from './CateringFAQ';
import { CateringForm } from './CateringForm';
import { CateringPhotoGallery } from './CateringPhotoGallery';
import { CateringTestimonials } from './CateringTestimonials';

export function CateringPage() {
  return (
    <div className="catering-page">
      <FtwSiteHeader />

      <section className="catering-hero" aria-labelledby="catering-hero-title">
        <img
          className="catering-hero__image"
          src={ftwAssets.heroImage}
          alt="For The Win catering spread"
          fetchPriority="high"
        />
        <div className="catering-hero__overlay" aria-hidden="true" />
        <div className="catering-container catering-hero__inner">
          <p className="catering-hero__eyebrow">Catering</p>
          <h1 id="catering-hero-title" className="catering-hero__title">
            {cateringHero.title}
          </h1>
          <p className="catering-hero__subtitle">{cateringHero.subtitle}</p>
          <div className="catering-hero__actions">
            <a href="#calculator" className="ftw-btn ftw-btn--primary">
              {cateringHero.primaryCta}
            </a>
          </div>
        </div>
      </section>

      <main id="main-content" className="catering-main">
        <CateringPhotoGallery />
        <CateringCalculator />
        <CateringForm />
        <CateringFAQ />
        <CateringTestimonials />
      </main>

      <FtwSiteFooter />
    </div>
  );
}
