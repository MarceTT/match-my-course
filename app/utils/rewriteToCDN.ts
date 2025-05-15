export function rewriteToCDN(url?: string | null): string {
  const placeholder = "/placeholder.svg";

  if (!url || typeof url !== "string") return placeholder;

  const S3_PREFIX = "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/";
  const CDN_PREFIX = "https://d2wv8pxed72bi5.cloudfront.net/";

  return url.replace(S3_PREFIX, CDN_PREFIX);
}
