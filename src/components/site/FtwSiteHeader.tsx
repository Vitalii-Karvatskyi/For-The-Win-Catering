import { useState } from 'react';
import { ftwAssets } from '../../config/ftwAssets';

const mainNav = [
  { label: 'Menu', href: 'https://order.forthewinla.com/', external: true },
  { label: 'Locations', href: 'https://www.forthewinla.com/locations' },
  { label: 'Join Our Team', href: 'https://www.forthewinla.com/careers' },
  { label: 'Merch', href: 'https://ftwla.myshopify.com/', external: true },
  { label: 'Catering', href: 'https://www.forthewinla.com/catering' },
] as const;

export function FtwSiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ftw-site-header">
      <div className="ftw-site-header__bar" aria-hidden="true" />
      <div className="ftw-site-header__inner">
        <div className="catering-container ftw-site-header__row">
          <a className="ftw-site-header__logo" href="https://www.forthewinla.com/" aria-label="For The Win - Home">
            <img src={ftwAssets.logo} alt="For The Win" width={345} height={117} />
          </a>

          <div className="ftw-site-header__desktop">
            <nav aria-label="Main menu" className="ftw-site-header__nav">
              {mainNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="ftw-site-header__nav-link"
                  {...('external' in item && item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              className="ftw-btn ftw-btn--primary ftw-btn--compact"
              href="https://order.forthewinla.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </a>
          </div>

          <div className="ftw-site-header__mobile">
            <a
              className="ftw-btn ftw-btn--primary ftw-btn--compact"
              href="https://order.forthewinla.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </a>
            <button
              type="button"
              className="ftw-site-header__menu-btn"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="6" y1="18" x2="18" y2="6" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="ftw-site-header__bar" aria-hidden="true" />

      {menuOpen ? (
        <div className="ftw-site-header__drawer" role="dialog" aria-label="Navigation menu">
          <nav className="ftw-site-header__drawer-nav">
            {mainNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="ftw-site-header__drawer-link"
                onClick={() => setMenuOpen(false)}
                {...('external' in item && item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
