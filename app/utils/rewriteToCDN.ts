// Tipos para opciones de optimización de imagen
interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

// Tipos para srcset generado automáticamente
export interface ResponsiveImageConfig {
  url: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
}

export interface GeneratedSrcset {
  src: string;
  srcSet: string;
  sizes: string;
}

// Lista de formatos válidos para CloudFront
const VALID_FORMATS = ['webp', 'avif', 'jpg', 'jpeg', 'png'] as const;

export function rewriteToCDN(url?: string | null, options?: ImageOptimizationOptions): string {
  const placeholder = "/placeholder.svg";

  if (!url || typeof url !== "string") return placeholder;

  const S3_PREFIX = "https://match-my-course-final-bucket.s3.ap-southeast-2.amazonaws.com/";
  const CDN_PREFIX = "https://d2wv8pxed72bi5.cloudfront.net/";

  // Validar que la URL sea de nuestro S3
  if (!url.includes(S3_PREFIX) && !url.includes(CDN_PREFIX)) {
    // Para URLs externas, usar directamente
    return url;
  }

  let optimizedUrl = url.replace(S3_PREFIX, CDN_PREFIX);

  // CloudFront básico no soporta parámetros de transformación
  // Simplemente retornar la URL del CDN sin parámetros adicionales
  // Esto asegura que las imágenes se carguen correctamente
  return optimizedUrl;
}

/**
 * Genera automáticamente srcset con densidades de píxeles (1x, 2x)
 * Compatible con CloudFront CDN que no soporta parámetros de transformación
 * Next.js Image component maneja automáticamente el redimensionamiento
 * @param url - URL de la imagen original
 * @param sizes - Media queries para responsive design
 * @returns Objeto con src, srcSet y sizes para usar en <img> tag
 */
export function generateAutoSrcset(
  url: string,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
): GeneratedSrcset {
  const cdnUrl = rewriteToCDN(url);

  // Generar srcset con múltiples densidades de píxeles
  // El navegador selecciona la mejor versión según el dispositivo y su densidad de píxeles
  // Next.js Image component genera automáticamente las versiones optimizadas
  const srcSet = [
    `${cdnUrl} 1x`,   // Densidad estándar (1 píxel de dispositivo = 1 píxel CSS)
    `${cdnUrl} 2x`,   // Retina/dispositivos de alta densidad
  ].join(', ');

  return {
    src: cdnUrl,
    srcSet,
    sizes,
  };
}

// Helper para generar placeholder simple
export function generateBlurPlaceholder(originalUrl: string): string {
  // Generar un data URL simple como placeholder
  // Esto evita problemas de carga de imágenes pequeñas desde CDN
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=";
}

// Helper para imágenes responsive con fallback robusto
export function getResponsiveImageProps(
  url: string,
  alt: string,
  options: {
    sizes?: string;
    priority?: boolean;
    quality?: number;
    width?: number;
    height?: number;
    fill?: boolean;
    fallbackSrc?: string;
    fetchPriority?: 'high' | 'low' | 'auto';
  } = {}
) {
  const {
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority = false,
    width,
    height,
    fill = false,
    fallbackSrc = "/placeholder.svg",
    fetchPriority = priority ? 'high' : 'auto'
  } = options;

  // Usar CDN optimizado pero sin parámetros problemáticos
  const optimizedSrc = rewriteToCDN(url);
  
  const baseProps = {
    src: optimizedSrc,
    alt: alt || "Imagen",
    placeholder: "blur" as const,
    blurDataURL: generateBlurPlaceholder(url),
    loading: priority ? "eager" as const : "lazy" as const,
    fetchPriority: fetchPriority as 'high' | 'low' | 'auto',
  };

  // If using fill, include fill and sizes but exclude dimensions
  if (fill) {
    return {
      ...baseProps,
      fill: true,
      sizes,
      priority,
      style: {
        objectFit: 'cover' as const,
      },
    };
  }

  // If not using fill, include dimensions and styles
  return {
    ...baseProps,
    width,
    height,
    sizes,
    priority,
    style: {
      width: '100%',
      height: 'auto',
    },
  };
}
