/**
 * Helper functions for generating canonical URLs
 * Ensures consistent and SEO-friendly URL generation across the application
 */

/**
 * Gets the origin URL from environment variables or fallback
 * @returns {string} The base URL of the site (e.g., https://matchmycourse.com)
 */
export function getOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://matchmycourse.com'
  ).replace(/\/$/, '');
}

/**
 * Builds a canonical URL by combining origin with path
 * @param {string} path - The path to append (e.g., '/blog/my-post')
 * @returns {string} The complete canonical URL
 */
export function buildCanonicalUrl(path: string): string {
  const origin = getOrigin();
  if (!path.startsWith('/')) path = '/' + path;
  return `${origin}${path}`;
}

/**
 * Converts a relative or absolute URL to canonical form
 * @param {string} url - The URL to convert
 * @returns {string} The canonical URL (absolute)
 */
export function absUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return buildCanonicalUrl(url);
}

/**
 * Encodes a slug for safe URL usage
 * @param {string} slug - The slug to encode
 * @returns {string} The encoded slug
 */
export function encodeSlug(slug: string): string {
  return encodeURIComponent(slug);
}
