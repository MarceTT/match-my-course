import { NextResponse } from 'next/server'
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl'
import { subcategoriaToCursoSlug } from '@/lib/courseMap'

/**
 * Extracts YouTube video ID from various URL formats
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID
 */
function extractYouTubeId(url: string): string | null {
  if (!url) return null

  try {
    const urlObj = new URL(url)

    // Handle youtube.com/watch?v=ID
    if (urlObj.hostname.includes('youtube.com')) {
      const id = urlObj.searchParams.get('v')
      if (id) return id

      // Handle youtube.com/shorts/ID
      if (urlObj.pathname.startsWith('/shorts/')) {
        return urlObj.pathname.split('/')[2]
      }
    }

    // Handle youtu.be/ID
    if (urlObj.hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1)
    }
  } catch {
    // If URL parsing fails, try regex as fallback
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*shorts\/))([^?&/]+)/)
    return match?.[1] || null
  }

  return null
}

/**
 * Type definitions
 */
type SchoolWithVideo = {
  schoolId: string
  name: string
  city: string
  urlVideo: string
  updatedAt?: string
  subcategoria?: string
  url?: string
}

type EducationalVideo = {
  youtubeUrl: string
  title: string
  description: string
  publicationDate: string
  slug: string
}

type VideoEntry = {
  pageUrl: string // URL de la página en tu sitio
  title: string
  description: string
  thumbnailUrl: string
  playerUrl: string // URL del player embebido
  publicationDate: string
  uploadDate?: string
  duration?: string
}

/**
 * Educational videos about studying in Ireland
 * These will be accessible at /videos/[slug]
 */
const EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=M5aakNAUotw',
    title: '¿Cuándo puedo trabajar en Irlanda? Guía 2025 para estudiantes',
    description: '¿Vas a estudiar inglés en Irlanda en 2025 y vienes de Chile, México, Argentina, Uruguay, Costa Rica o Panamá? En este video te explicamos paso a paso cuándo puedes empezar a trabajar legalmente con el permiso de estudio y trabajo, conocido oficialmente como Stamp 2.',
    publicationDate: '2024-11-17T12:00:00+00:00',
    slug: 'cuando-puedo-trabajar-irlanda-2025',
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=lOa8lh2RKMw',
    title: 'Requisitos para el Permiso de Estudio y Trabajo de Irlanda',
    description: '¿Quieres estudiar inglés y trabajar legalmente en Irlanda en 2025? En este vídeo explicamos de forma clara y directa cuáles son los requisitos oficiales para estudiar inglés y trabajar legalmente en Irlanda en 2025.',
    publicationDate: '2024-11-17T12:00:00+00:00',
    slug: 'requisitos-permiso-estudio-trabajo-irlanda-2025',
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=c0pqehnu4Ds',
    title: '¿Qué es el permiso de estudio y trabajo en Irlanda? 2025',
    description: 'En este video te explico todo sobre el permiso de estudio y trabajo en Irlanda 2025, también conocido (aunque erróneamente) como "visa de estudiante".',
    publicationDate: '2024-11-17T12:00:00+00:00',
    slug: 'que-es-permiso-estudio-trabajo-irlanda-2025',
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=z9VVnkAW7CM',
    title: 'Alojamiento en Irlanda para estudiantes 2025',
    description: 'En este video te explicamos las tres opciones principales de alojamiento ofrecidas por las escuelas de inglés en Irlanda: Host Family, Residencia de estudiantes ó Accommodation compartido',
    publicationDate: '2024-11-17T12:00:00+00:00',
    slug: 'alojamiento-irlanda-estudiantes-2025',
  },
  {
    youtubeUrl: 'https://www.youtube.com/watch?v=a2EI6gP6qBE',
    title: 'Cómo reservar tu cita en Migración Irlanda (IRP Visa)',
    description: '¿Estás estudiando en Irlanda y necesitas sacar tu IRP (Irish Residence Permit)? En este video te muestro paso a paso cómo solicitar, reagendar o cancelar tu cita en el portal de inmigración ISD. Ideal para estudiantes internacionales con visa Stamp 2.',
    publicationDate: '2024-11-17T12:00:00+00:00',
    slug: 'reservar-cita-migracion-irlanda-irp',
  },
]

/**
 * Fetch with timeout to prevent hanging requests
 */
async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = 3000, ...rest } = init as any
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(input, {
      ...rest,
      signal: controller.signal,
      next: { revalidate: 86_400 },
    })
    return res
  } finally {
    clearTimeout(id)
  }
}

/**
 * Fetch schools with videos from backend
 * Using /schools/videos/list endpoint which returns only schools that have urlVideo populated
 */
async function fetchSchoolsWithVideos(): Promise<SchoolWithVideo[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/videos/list`
    const res = await fetchWithTimeout(url, { timeoutMs: 8000 })

    if (!res.ok) {
      console.error(`[Sitemap-Video] Backend responded with ${res.status}`)
      return []
    }

    const json = await res.json()
    const schools = Array.isArray(json?.data?.schools) ? json.data.schools : []

    console.log(`[Sitemap-Video] Received ${schools.length} schools with videos from backend`)

    // All schools from this endpoint already have videos, but we still validate
    const filtered = schools
      .filter((school: any) => {
        const hasVideo = school?.urlVideo && typeof school.urlVideo === 'string' && school.urlVideo.trim() !== ''
        if (!hasVideo) {
          console.log(`[Sitemap-Video] School "${school.name}" has invalid urlVideo:`, school.urlVideo)
        }
        return hasVideo
      })
      .map((school: any) => ({
        schoolId: school._id,
        name: school.name,
        city: school.city,
        urlVideo: school.urlVideo,
        updatedAt: school.updatedAt || school.updated_at || new Date().toISOString(),
        subcategoria: school.subcategoria,
        url: school.url,
      }))

    console.log(`[Sitemap-Video] Filtered to ${filtered.length} schools with valid video URLs`)
    return filtered
  } catch (error) {
    console.error('[Sitemap-Video] Error fetching schools:', error)
    return []
  }
}

/**
 * Generate XML sitemap string with video metadata
 */
function generateSitemapXML(videos: VideoEntry[]): string {
  const videoEntries = videos
    .map(
      (video) => `  <url>
    <loc>${escapeXml(video.pageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:player_loc allow_embed="yes">${escapeXml(video.playerUrl)}</video:player_loc>
      ${video.uploadDate ? `<video:upload_date>${video.uploadDate}</video:upload_date>` : ''}
      <video:publication_date>${video.publicationDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:live>no</video:live>
    </video:video>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoEntries}
</urlset>`
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Convert educational video to VideoEntry format
 */
function convertEducationalVideoToEntry(
  video: EducationalVideo,
  baseUrl: string
): VideoEntry | null {
  const youtubeId = extractYouTubeId(video.youtubeUrl)
  if (!youtubeId) return null

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  const playerUrl = `https://www.youtube.com/embed/${youtubeId}`

  // IMPORTANTE: La URL debe ser de TU sitio, no de YouTube
  const pageUrl = `${baseUrl}/videos/${video.slug}`

  return {
    pageUrl,
    title: video.title,
    description: video.description,
    thumbnailUrl,
    playerUrl,
    publicationDate: video.publicationDate,
    uploadDate: video.publicationDate,
  }
}

/**
 * Convert school video to VideoEntry format
 */
function convertSchoolVideoToEntry(
  school: SchoolWithVideo,
  baseUrl: string
): VideoEntry | null {
  const youtubeId = extractYouTubeId(school.urlVideo)
  if (!youtubeId) {
    console.log(`[Sitemap-Video] No YouTube ID extracted for school: ${school.name}, urlVideo: ${school.urlVideo}`)
    return null
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  const playerUrl = `https://www.youtube.com/embed/${youtubeId}`
  const publicationDate = school.updatedAt || new Date().toISOString()

  // Build school page URL
  let pageUrl = `${baseUrl}/school/${school.schoolId}`

  // Try to build SEO-friendly URL if we have the data
  if (school.subcategoria && school.url) {
    const slugCurso = subcategoriaToCursoSlug[school.subcategoria]
    const slugEscuela = extractSlugEscuelaFromSeoUrl(school.url)

    if (slugCurso && slugEscuela) {
      pageUrl = `${baseUrl}/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(slugEscuela)}`
    } else {
      console.log(`[Sitemap-Video] Failed to build SEO URL for ${school.name}: slugCurso=${slugCurso}, slugEscuela=${slugEscuela}`)
    }
  } else {
    console.log(`[Sitemap-Video] Missing subcategoria or url for ${school.name}, using fallback URL: ${pageUrl}`)
  }

  return {
    pageUrl,
    title: `Video de ${school.name} - Escuela de inglés en ${school.city}`,
    description: `Conoce ${school.name}, una escuela de inglés en ${school.city}, Irlanda. Descubre sus instalaciones, profesores y ambiente de estudio en este video.`,
    thumbnailUrl,
    playerUrl,
    publicationDate,
    uploadDate: publicationDate,
  }
}

/**
 * GET endpoint for dynamic video sitemap
 */
export async function GET() {
  try {
    const baseUrl = (
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://matchmycourse.com'
    ).replace(/\/$/, '')

    const videos: VideoEntry[] = []
    const seenPageUrls = new Set<string>()

    // Add educational videos (accessible at /videos/[slug])
    try {
      let educationalCount = 0
      EDUCATIONAL_VIDEOS.forEach((video) => {
        const entry = convertEducationalVideoToEntry(video, baseUrl)
        if (entry && !seenPageUrls.has(entry.pageUrl)) {
          videos.push(entry)
          seenPageUrls.add(entry.pageUrl)
          educationalCount++
        }
      })
      console.log(`[Sitemap-Video] Added ${educationalCount} educational video entries`)
    } catch (error) {
      console.error('[Sitemap-Video] Error processing educational videos:', error)
    }

    // Add school videos (accessible at school detail pages)
    try {
      const schoolsWithVideos = await fetchSchoolsWithVideos()
      console.log(`[Sitemap-Video] Fetched ${schoolsWithVideos.length} schools with videos`)

      let schoolCount = 0
      let skippedNoEntry = 0
      let skippedDuplicate = 0

      schoolsWithVideos.forEach((school) => {
        const entry = convertSchoolVideoToEntry(school, baseUrl)

        if (!entry) {
          skippedNoEntry++
          console.log(`[Sitemap-Video] Skipped school (no entry generated): ${school.name}`)
          return
        }

        if (seenPageUrls.has(entry.pageUrl)) {
          skippedDuplicate++
          console.log(`[Sitemap-Video] Skipped school (duplicate URL): ${school.name} - ${entry.pageUrl}`)
          return
        }

        videos.push(entry)
        seenPageUrls.add(entry.pageUrl)
        schoolCount++
      })

      console.log(`[Sitemap-Video] Added ${schoolCount} school video entries`)
      console.log(`[Sitemap-Video] Skipped ${skippedNoEntry} (no entry), ${skippedDuplicate} (duplicate)`)
    } catch (error) {
      console.error('[Sitemap-Video] Error adding school videos:', error)
    }

    console.log(`[Sitemap-Video] Total entries: ${videos.length}`)

    const xml = generateSitemapXML(videos)

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        'X-Robots-Tag': 'all',
      },
    })
  } catch (error) {
    console.error('[Sitemap-Video] Fatal error:', error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }
    )
  }
}
