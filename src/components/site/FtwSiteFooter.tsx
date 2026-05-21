import { ftwAssets } from '../../config/ftwAssets';

const footerNav = [
  { label: 'Menu', href: 'https://www.forthewinla.com/menu' },
  { label: 'Catering', href: 'https://www.forthewinla.com/catering' },
  { label: "We're Hiring", href: 'https://www.forthewinla.com/careers' },
  { label: 'Find Us', href: 'https://www.forthewinla.com/locations' },
  { label: 'Merch', href: 'https://ftwla.myshopify.com/' },
  { label: 'Allergens', href: 'https://www.forthewinla.com/page/allergens' },
] as const;

export function FtwSiteFooter() {
  return (
    <footer className="ftw-site-footer">
      <div className="ftw-site-footer__pattern" aria-hidden="true">
        <div className="ftw-site-footer__pattern-fill" />
      </div>

      <div className="catering-container ftw-site-footer__content">
        <div className="ftw-site-footer__logo-wrap">
          <a href="https://www.forthewinla.com/" aria-label="For The Win - Home">
            <img src={ftwAssets.logo} alt="For The Win" width={240} height={80} loading="lazy" />
          </a>
        </div>

        <div className="ftw-site-footer__social">
          <a
            href="https://www.instagram.com/forthewinla"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram (opens in new window)"
            className="ftw-site-footer__instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <nav aria-label="Footer" className="ftw-site-footer__nav">
          {footerNav.map((item) => (
            <a key={item.label} href={item.href} className="ftw-site-footer__nav-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
