import type { MetadataRoute } from 'next'
import { subcategoriaToCursoSlug } from '@/lib/courseMap'
import { extractSlugEscuelaFromSeoUrl } from '@/lib/helpers/buildSeoSchoolUrl'

export const revalidate = 86_400 // 24h

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 3000, ...rest } = init as any
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(input, { ...rest, signal: controller.signal, next: { revalidate: 86_400 } })
    return res
  } finally {
    clearTimeout(id)
  }
}

type SeoEntry = {
  schoolId: string
  url: string
  subcategoria: string
  updatedAt?: string
}

type BlogListResp = {
  data?: {
    posts?: Array<{
      slug: string
      updatedAt?: string
      publishedAt?: string
      createdAt?: string
      published?: boolean
    }>
    total?: number
    page?: number
    limit?: number
    pages?: number
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://matchmycourse.com').replace(/\/$/, '')

  // Rutas estáticas principales
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/como-funciona-matchmycourse`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/estudiar-ingles-nueva-zelanda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/escuelas-socias`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/servicios-matchmycourse`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/testimonios`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/ebook-estudiar-y-trabajar-extranjero`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/mision-vision-matchmycourse`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/quienes-somos`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/cursos-ingles-extranjero`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
  ]

  // Escuelas desde backend SEO
  let schoolEntries: MetadataRoute.Sitemap = []
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/seo/course/schools`
    const res = await fetchWithTimeout(url, { timeoutMs: 3000 })
    const json = await res.json()
    const entries: SeoEntry[] = Array.isArray(json?.data) ? json.data : []

    const seen = new Set<string>()
    schoolEntries = entries.flatMap((e) => {
      try {
        const slugCurso = subcategoriaToCursoSlug[e.subcategoria]
        const slugEscuela = extractSlugEscuelaFromSeoUrl(e.url)
        const schoolId = e.schoolId
        if (!slugCurso || !slugEscuela || !schoolId) return []

        const loc = `${base}/cursos/${encodeURIComponent(slugCurso)}/escuelas/${encodeURIComponent(slugEscuela)}/${encodeURIComponent(schoolId)}`
        if (seen.has(loc)) return []
        seen.add(loc)
        return [{
          url: loc,
          lastModified: e.updatedAt ? new Date(e.updatedAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }]
      } catch {
        return []
      }
    })
  } catch {
    // fallback a solo estáticos si falla el backend
    schoolEntries = []
  }

  // Blog posts (paginado seguro)
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL
    const PAGE_SIZE = 100
    let page = 1
    let pages = 1
    let loops = 0
    const seen = new Set<string>()

    while (page <= pages) {
      // Limitar a un máximo de 3 páginas en build para evitar bloqueos
      if (loops >= 3) break
      const res = await fetchWithTimeout(`${API_BASE}/blog/post?page=${page}&limit=${PAGE_SIZE}`, { timeoutMs: 3000 })
      const json = (await res.json()) as BlogListResp
      const list = json?.data?.posts || []
      pages = json?.data?.pages || pages

      for (const p of list) {
        if (!p?.slug) continue
        const loc = `${base}/blog/${encodeURIComponent(p.slug)}`
        if (seen.has(loc)) continue
        seen.add(loc)
        const last = p.updatedAt || p.publishedAt || p.createdAt
        blogEntries.push({
          url: loc,
          lastModified: last ? new Date(last) : new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        })
      }
      page += 1
      loops += 1
      if (list.length < PAGE_SIZE) break
    }
  } catch {
    blogEntries = []
  }

  return [...staticUrls, ...schoolEntries, ...blogEntries]
}
