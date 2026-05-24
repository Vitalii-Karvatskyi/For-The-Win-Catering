/**
 * Local static assets (Vite serves from /public).
 * Paths use BASE_URL for GitHub Pages subdirectory deploy.
 */
const baseUrl = import.meta.env.BASE_URL;

function publicAsset(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${normalized}`;
}

export const ftwAssets = {
  favicon: publicAsset('favicon.png'),
  logo: publicAsset('images/ftwlogo.webp'),
  heroImage: publicAsset('images/Burger_bg.png'),
  occasionsImage: publicAsset('images/c7b782da-84f9-4293-bffb-47d2e7b08998.jpeg'),
  gallery: [
    {
      src: publicAsset('images/00c04412-eb65-4b13-a31b-a91c12aa137f.jpeg'),
      alt: 'Loaded fries topped with fresh ingredients',
    },
  ],
} as const;
