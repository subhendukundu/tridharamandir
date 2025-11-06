/**
 * Cloudflare Image Transformation Utility
 *
 * Generates optimized image URLs using Cloudflare's Transform via URL feature.
 * Format: /cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
 *
 * Features:
 * - Automatic format conversion (WebP/AVIF with fallback)
 * - Responsive image sizing
 * - Quality optimization
 * - AI-powered background removal (segment: 'foreground')
 * - Face detection for smart cropping
 * - Image filters (blur, sharpen, brightness, contrast, etc.)
 *
 * @see https://developers.cloudflare.com/images/transform-images/transform-via-url/
 *
 * @example Background Removal
 * ```tsx
 * // Remove background and make transparent
 * <Image
 *   src={cfImage('/photo.jpg', { segment: 'foreground', format: 'webp' })}
 *   alt="Cutout"
 * />
 *
 * // Or use the preset
 * <Image
 *   src={cfImage('/photo.jpg', imagePresets.transparent(800))}
 *   alt="Transparent cutout"
 * />
 * ```
 */

export type ImageFit = 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad' | 'squeeze';
export type ImageFormat = 'auto' | 'avif' | 'webp' | 'jpeg' | 'baseline-jpeg' | 'json';
export type ImageGravity = 'auto' | 'left' | 'right' | 'top' | 'bottom' | 'center' | 'face';

export interface ImageTransformOptions {
  /** Image width in pixels */
  width?: number | 'auto';
  /** Image height in pixels */
  height?: number;
  /** Device Pixel Ratio (default: 1) */
  dpr?: number;
  /** Fit mode for resizing */
  fit?: ImageFit;
  /** Output format (use 'auto' for WebP/AVIF with fallback) */
  format?: ImageFormat;
  /** Quality 1-100 or 'low'|'medium-low'|'medium-high'|'high' (default: 85) */
  quality?: number | 'low' | 'medium-low' | 'medium-high' | 'high';
  /** Gravity/focal point for cropping */
  gravity?: ImageGravity;
  /** Background color for transparent images */
  background?: string;
  /** Blur radius 1-250 */
  blur?: number;
  /** Sharpen filter 0-10 */
  sharpen?: number;
  /** Brightness factor (1.0 = no change) */
  brightness?: number;
  /** Contrast factor (1.0 = no change) */
  contrast?: number;
  /** Saturation factor (1.0 = no change, 0 = grayscale) */
  saturation?: number;
  /** Gamma/exposure factor (1.0 = no change) */
  gamma?: number;
  /** Whether to preserve animation frames */
  anim?: boolean;
  /** Rotate degrees (90, 180, 270) */
  rotate?: 90 | 180 | 270;
  /** Metadata to preserve */
  metadata?: 'copyright' | 'keep' | 'none';
  /** Remove background and make transparent (requires format that supports transparency like PNG/WebP) */
  segment?: 'foreground';
}

/**
 * Generates a Cloudflare image transformation URL
 *
 * @param src - Source image path (absolute or relative)
 * @param options - Transformation options
 * @returns Optimized image URL
 *
 * @example
 * ```tsx
 * <Image
 *   src={cfImage('/images/hero.jpg', {
 *     width: 1920,
 *     quality: 85,
 *     format: 'auto'
 *   })}
 *   alt="Hero"
 * />
 * ```
 */
export function cfImage(src: string, options: ImageTransformOptions = {}): string {
  // In development, return original src without transformation
  // Cloudflare cdn-cgi endpoint only works in production
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  // Return original src if it's already a cdn-cgi URL or external URL
  if (src.startsWith('/cdn-cgi/image/') || src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  const params: string[] = [];

  // Add width
  if (options.width !== undefined) {
    params.push(`width=${options.width}`);
  }

  // Add height
  if (options.height !== undefined) {
    params.push(`height=${options.height}`);
  }

  // Add DPR
  if (options.dpr !== undefined) {
    params.push(`dpr=${options.dpr}`);
  }

  // Add fit mode
  if (options.fit) {
    params.push(`fit=${options.fit}`);
  }

  // Add format (default to auto for modern formats)
  const format = options.format || 'auto';
  params.push(`format=${format}`);

  // Add quality
  if (options.quality !== undefined) {
    params.push(`quality=${options.quality}`);
  }

  // Add gravity
  if (options.gravity) {
    params.push(`gravity=${options.gravity}`);
  }

  // Add background color
  if (options.background) {
    params.push(`background=${encodeURIComponent(options.background)}`);
  }

  // Add blur
  if (options.blur !== undefined) {
    params.push(`blur=${options.blur}`);
  }

  // Add sharpen
  if (options.sharpen !== undefined) {
    params.push(`sharpen=${options.sharpen}`);
  }

  // Add brightness
  if (options.brightness !== undefined) {
    params.push(`brightness=${options.brightness}`);
  }

  // Add contrast
  if (options.contrast !== undefined) {
    params.push(`contrast=${options.contrast}`);
  }

  // Add saturation
  if (options.saturation !== undefined) {
    params.push(`saturation=${options.saturation}`);
  }

  // Add gamma
  if (options.gamma !== undefined) {
    params.push(`gamma=${options.gamma}`);
  }

  // Add animation setting
  if (options.anim !== undefined) {
    params.push(`anim=${options.anim}`);
  }

  // Add rotation
  if (options.rotate !== undefined) {
    params.push(`rotate=${options.rotate}`);
  }

  // Add metadata
  if (options.metadata) {
    params.push(`metadata=${options.metadata}`);
  }

  // Add background removal/segmentation
  if (options.segment) {
    params.push(`segment=${options.segment}`);
  }

  // Construct the URL
  const optionsString = params.join(',');
  return `/cdn-cgi/image/${optionsString}${src}`;
}

/**
 * Preset configurations for common use cases
 */
export const imagePresets = {
  /** Hero/banner images - high quality, responsive */
  hero: (width?: number): ImageTransformOptions => ({
    width: width || 1920,
    fit: 'scale-down',
    format: 'auto',
    quality: 85,
    metadata: 'none',
  }),

  /** Thumbnail images - small, optimized */
  thumbnail: (size: number = 200): ImageTransformOptions => ({
    width: size,
    height: size,
    fit: 'cover',
    format: 'auto',
    quality: 80,
    metadata: 'none',
  }),

  /** Gallery images - medium quality, responsive */
  gallery: (width?: number): ImageTransformOptions => ({
    width: width || 800,
    fit: 'scale-down',
    format: 'auto',
    quality: 85,
    metadata: 'none',
  }),

  /** Avatar/profile images - face detection */
  avatar: (size: number = 150): ImageTransformOptions => ({
    width: size,
    height: size,
    fit: 'cover',
    gravity: 'face',
    format: 'auto',
    quality: 85,
    metadata: 'none',
  }),

  /** Pattern/decorative images - lower quality acceptable */
  pattern: (width?: number): ImageTransformOptions => ({
    width: width || 600,
    fit: 'scale-down',
    format: 'auto',
    quality: 75,
    metadata: 'none',
  }),

  /** Background images - can be larger, blurred */
  background: (width?: number, blur?: number): ImageTransformOptions => ({
    width: width || 1920,
    fit: 'cover',
    format: 'auto',
    quality: 80,
    blur,
    metadata: 'none',
  }),

  /** Transparent/cutout images - removes background using AI */
  transparent: (width?: number): ImageTransformOptions => ({
    width: width || 800,
    fit: 'scale-down',
    format: 'webp', // WebP supports transparency
    quality: 85,
    segment: 'foreground',
    metadata: 'none',
  }),

  /** OpenGraph/Social media images - optimized for sharing (1200x630) */
  og: (): ImageTransformOptions => ({
    width: 1200,
    height: 630,
    fit: 'cover',
    format: 'webp', // WebP for better compression and smaller file sizes
    quality: 85,
    gravity: 'auto', // Smart cropping
    metadata: 'copyright', // Keep copyright info
  }),
} as const;

/**
 * Helper to generate srcset for responsive images
 *
 * @example
 * ```tsx
 * <Image
 *   src={cfImage('/image.jpg', { width: 800 })}
 *   srcSet={generateSrcSet('/image.jpg', [400, 800, 1200])}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 * ```
 */
export function generateSrcSet(
  src: string,
  widths: number[],
  options: Omit<ImageTransformOptions, 'width'> = {}
): string {
  return widths
    .map((width) => `${cfImage(src, { ...options, width })} ${width}w`)
    .join(', ');
}

/**
 * Generate optimized OpenGraph image URL for social media sharing
 * Returns full absolute URL with Cloudflare transformations
 *
 * @param src - Source image path (relative or absolute)
 * @param baseUrl - Base site URL (e.g., https://tridharamandir.com)
 * @returns Optimized OG image URL (1200x630, WebP, 85 quality)
 *
 * @example
 * ```tsx
 * openGraph: {
 *   images: [{
 *     url: getOgImageUrl('/images/temple.png', siteConfig.url),
 *     width: 1200,
 *     height: 630,
 *     alt: 'Temple description'
 *   }]
 * }
 * ```
 */
export function getOgImageUrl(src: string, baseUrl: string): string {
  const optimizedPath = cfImage(src, imagePresets.og());
  return `${baseUrl}${optimizedPath}`;
}
