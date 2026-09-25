// Public-directory assets (public/images, public/videos) are referenced in
// data/components as root-absolute strings like "/images/foo.jpg". Vite
// does NOT rewrite those for you — only index.html/CSS/import references
// get the configured `base` prefix automatically. Without this, images
// 404 as soon as `base` isn't "/", including the default GitHub Pages
// build. Every media-rendering component routes src/poster through this.
export const asset = (path: string) => {
  if (/^https?:\/\//.test(path)) return path; // external hotlink — leave as-is
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
};
