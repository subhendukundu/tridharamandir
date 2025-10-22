/**
 * Custom Next.js Image Loader for Cloudflare Image Transformation
 *
 * This loader bypasses Next.js image optimization when Cloudflare Image URLs
 * are detected (/cdn-cgi/image/), allowing them to be served directly.
 *
 * For regular image paths, it returns them as-is for Next.js to handle.
 */

export default function cloudflareImageLoader({ src }: { src: string }) {
  // If the URL is already a Cloudflare Image Transformation URL, return as-is
  if (src.startsWith('/cdn-cgi/image/')) {
    return src;
  }

  // If it's an external URL (http/https), return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // For regular paths, return as-is (Next.js will handle them)
  return src;
}
