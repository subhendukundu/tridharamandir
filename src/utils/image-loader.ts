/**
 * Custom Next.js Image Loader for Cloudflare Image Transformation
 *
 * This loader bypasses Next.js image optimization when Cloudflare Image URLs
 * are detected (/cdn-cgi/image/), allowing them to be served directly.
 *
 * For regular image paths, it returns them as-is for Next.js to handle.
 */

type CloudflareImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function cloudflareImageLoader({ src, width, quality }: CloudflareImageLoaderProps) {
  // If the URL is already a Cloudflare Image Transformation URL, return as-is
  if (src.startsWith('/cdn-cgi/image/')) {
    return src;
  }

  const separator = src.includes('?') ? '&' : '?';

  // If it's an external URL (http/https), keep it remote but include width for Next's loader contract
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return `${src}${separator}w=${width}&q=${quality ?? 75}`;
  }

  // Public assets can be served directly with cache-key query params in local and production previews.
  return `${src}${separator}w=${width}&q=${quality ?? 75}`;
}
