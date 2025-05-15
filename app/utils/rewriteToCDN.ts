export function rewriteToCDN(url?: string | null): string | undefined {
    if (!url) return undefined;
    return url.replace(
      "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/",
      "https://d2wv8pxed72bi5.cloudfront.net/"
    );
  }
  