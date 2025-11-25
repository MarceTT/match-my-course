import { NextResponse } from 'next/server'

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
 * Extracts Vimeo video ID from URL
 */
function extractVimeoId(url: string): string | null {
  if (!url) return null

  try {
    const urlObj = new URL(url)
    if (urlObj.hostname.includes('vimeo.com')) {
      return urlObj.pathname.split('/').filter(Boolean).pop() || null
    }
  } catch {
    const match = url.match(/vimeo\.com\/(\d+)/)
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
}

type EducationalVideo = {
  url: string
  title: string
  description: string
  publicationDate: string
}

type VideoEntry = {
  url: string
  title: string
  description: string
  thumbnailUrl: string
  contentUrl: string
  publicationDate: string
}

/**
 * Hardcoded educational videos about studying in Ireland
 */
const EDUCATIONAL_VIDEOS: EducationalVideo[] = [
  {
    url: 'https://www.youtube.com/watch?v=M5aakNAUotw',
    title: '¿Cuándo puedo trabajar en Irlanda? 🇮🇪 Guía 2025 para estudiantes',
    description: '¿Vas a estudiar inglés en Irlanda en 2025 y vienes de Chile, México, Argentina, Uruguay, Costa Rica o Panamá? En este video te explicamos paso a paso cuándo puedes empezar a trabajar legalmente con el permiso de estudio y trabajo, conocido oficialmente como Stamp 2.',
    publicationDate: '2025-05-17T12:00:00+00:00',
  },
  {
    url: 'https://www.youtube.com/watch?v=lOa8lh2RKMw',
    title: 'Requisitos para el Permiso de Estudio y Trabajo de Irlanda 🇮🇪',
    description: '¿Quieres estudiar inglés y trabajar legalmente en Irlanda en 2025? En este vídeo explicamos de forma clara y directa cuáles son los requisitos oficiales para estudiar inglés y trabajar legalmente en Irlanda en 2025.',
    publicationDate: '2025-05-17T12:00:00+00:00',
  },
  {
    url: 'https://www.youtube.com/watch?v=c0pqehnu4Ds',
    title: '¿Qué es el permiso de estudio y trabajo en Irlanda? 2025 🇮🇪',
    description: 'En este video te explico todo sobre el permiso de estudio y trabajo en Irlanda 2025, también conocido (aunque erróneamente) como "visa de estudiante".',
    publicationDate: '2025-05-17T12:00:00+00:00',
  },
  {
    url: 'https://www.youtube.com/watch?v=z9VVnkAW7CM',
    title: 'Alojamiento en Irlanda para estudiantes 2025 🇮🇪',
    description: 'En este video te explicamos las tres opciones principales de alojamiento ofrecidas por las escuelas de inglés en Irlanda: Host Family, Residencia de estudiantes ó Accommodation compartido',
    publicationDate: '2025-05-17T12:00:00+00:00',
  },
  {
    url: 'https://www.youtube.com/watch?v=a2EI6gP6qBE',
    title: 'Cómo reservar tu cita en Migración Irlanda ✈️ (IRP Visa)',
    description: '¿Estás estudiando en Irlanda y necesitas sacar tu IRP (Irish Residence Permit)? En este video te muestro paso a paso cómo solicitar, reagendar o cancelar tu cita en el portal de inmigración ISD. Ideal para estudiantes internacionales con visa Stamp 2.',
    publicationDate: '2025-05-17T12:00:00+00:00',
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
 */
async function fetchSchoolsWithVideos(): Promise<SchoolWithVideo[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/schools/videos/list`
    const res = await fetchWithTimeout(url, { timeoutMs: 5000 })

    if (!res.ok) {
      console.error(`[Sitemap-Video] Backend responded with ${res.status}`)
      return []
    }

    const json = await res.json()

    // Handle the response format from /api/schools/videos/list endpoint
    const schools = json?.data?.schools || []

    console.log(`[Sitemap-Video] Received ${schools.length} schools from backend`)

    // Filter schools that have videos (should all have them from this endpoint)
    const filtered = schools
      .filter((school: any) => school?.urlVideo && typeof school.urlVideo === 'string')
      .map((school: any) => ({
        schoolId: school._id || school.id,
        name: school.name,
        city: school.city,
        urlVideo: school.urlVideo,
        updatedAt: school.updatedAt || school.updated_at,
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
    <loc>${escapeXml(video.url)}</loc>
    <video:video>
      <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(video.contentUrl)}</video:content_loc>
      <video:publication_date>${video.publicationDate}</video:publication_date>
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
 * Format date to ISO 8601
 */
function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

/**
 * Convert educational video to VideoEntry format
 */
function convertEducationalVideoToEntry(video: EducationalVideo): VideoEntry | null {
  const youtubeId = extractYouTubeId(video.url)
  if (!youtubeId) return null

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`
  const contentUrl = `https://www.youtube.com/embed/${youtubeId}`

  return {
    url: video.url,
    title: video.title,
    description: video.description,
    thumbnailUrl,
    contentUrl,
    publicationDate: video.publicationDate,
  }
}

/**
 * Convert school video to VideoEntry format
 */
function convertSchoolVideoToEntry(school: SchoolWithVideo): VideoEntry | null {
  const youtubeId = extractYouTubeId(school.urlVideo)
  if (!youtubeId) return null

  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/0.jpg`
  const contentUrl = `https://www.youtube.com/embed/${youtubeId}`
  const publicationDate = school.updatedAt || new Date().toISOString()

  return {
    url: school.urlVideo,
    title: school.name,
    description: `Video de ${school.name} - ${school.city}`,
    thumbnailUrl,
    contentUrl,
    publicationDate,
  }
}

/**
 * GET endpoint for dynamic video sitemap
 */
export async function GET() {
  try {
    const videos: VideoEntry[] = []
    const seenUrls = new Set<string>()

    // Add educational videos
    try {
      let educationalCount = 0
      EDUCATIONAL_VIDEOS.forEach((video) => {
        const entry = convertEducationalVideoToEntry(video)
        if (entry && !seenUrls.has(video.url)) {
          videos.push(entry)
          seenUrls.add(video.url)
          educationalCount++
        }
      })
      console.log(`[Sitemap-Video] Added ${educationalCount} educational video entries`)
    } catch (error) {
      console.error('[Sitemap-Video] Error processing educational videos:', error)
    }

    // Add school videos
    try {
      const schoolsWithVideos = await fetchSchoolsWithVideos()

      let schoolCount = 0
      schoolsWithVideos.forEach((school) => {
        if (!seenUrls.has(school.urlVideo)) {
          const entry = convertSchoolVideoToEntry(school)
          if (entry) {
            videos.push(entry)
            seenUrls.add(school.urlVideo)
            schoolCount++
          }
        }
      })

      console.log(`[Sitemap-Video] Added ${schoolCount} school video entries`)
    } catch (error) {
      console.error('[Sitemap-Video] Error adding school videos:', error)
    }

    console.log(`[Sitemap-Video] Total entries: ${videos.length}`)

    const xml = generateSitemapXML(videos)

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
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
