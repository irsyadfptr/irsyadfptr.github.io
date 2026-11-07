// Files in public/ under the site's base path. Empty on Vercel; "/portofolio" when GitHub Pages serves a project
// repo. next/image and plain fetches don't add the base path themselves, so every public path goes through here.
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
