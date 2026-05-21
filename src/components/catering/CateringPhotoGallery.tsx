import { ftwAssets } from '../../config/ftwAssets';

export function CateringPhotoGallery() {
  return (
    <section className="catering-gallery" aria-label="Catering photos">
      <div className="catering-gallery__grid">
        {ftwAssets.gallery.map((image) => (
          <div key={image.src} className="catering-gallery__item">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
