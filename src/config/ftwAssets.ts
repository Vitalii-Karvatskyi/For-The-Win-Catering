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
  heroImage: publicAsset('images/9f43a709-8102-439c-baeb-cc3dd2148a1b.jpeg'),
  occasionsImage: publicAsset('images/c7b782da-84f9-4293-bffb-47d2e7b08998.jpeg'),
  gallery: [
    {
      src: publicAsset('images/b8e62aa3-d80f-48e5-9ad2-1f1f5e397c68.jpeg'),
      alt: 'Smash burger being prepared on the griddle',
    },
    {
      src: publicAsset('images/00c04412-eb65-4b13-a31b-a91c12aa137f.jpeg'),
      alt: 'Loaded fries topped with fresh ingredients',
    },
    {
      src: publicAsset('images/4a843eae-b8b3-4c4e-9bb6-763307f48a18.jpeg'),
      alt: 'Catering spread with burgers and sides',
    },
  ],
} as const;
