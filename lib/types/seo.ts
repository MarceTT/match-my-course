// Canonical SeoEntry domain type. Two-tier shape grounded in the backend
// CourseSEO model (match-backend/src/models/CourseSEO.ts, collection
// `courseseos`, timestamps:true). See change: unify-seo-entry.
//
// Two real backend shapes:
//   - Base (GET /seo/course/schools): find({}, {_id:0, __v:0}) → strips _id/__v.
//   - Persisted document (GET /seo/school/:id + embedded cursosEos via .lean()):
//     full docs WITH _id/__v.
//
// NOTE: `precio`/`minPrecio` are intentionally NOT typed here — they are phantom
// fields that do not exist on the CourseSEO model. The page.tsx consumer reads
// them via `as any` today; that phantom/offers path is removed in PR2.

export interface SeoEntry {
  schoolId: string; // ObjectId serialized as string
  categoria: string;
  subcategoria: string;
  escuela: string;
  url: string; // unique
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywordPrincipal: string;
  ciudad?: string; // backend optional
  imageOpenGraph?: string; // real field; previously read via `as any`
  createdAt?: string; // timestamps:true
  updatedAt?: string;
}

// Persisted document shape from GET /seo/school/:id and embedded cursosEos.
export interface SeoEntryDocument extends SeoEntry {
  _id: string;
  __v: number;
}

// Backward-compat alias so SchoolDetails.cursosEos?: CursoSeo[] stays untouched.
export type CursoSeo = SeoEntryDocument;
