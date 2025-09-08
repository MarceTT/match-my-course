# 🎓 Match My Course

> **Plataforma educativa Next.js 15 para encontrar escuelas de inglés en Irlanda**

Una plataforma integral que conecta estudiantes con las mejores escuelas de inglés en Irlanda, ofreciendo un sistema inteligente de búsqueda, reservas y gestión educativa.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

---

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [💻 Desarrollo](#-desarrollo)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [📚 Documentación](#-documentación)
- [🤝 Contribución](#-contribución)

---

## 🎯 Características

### 🎯 **Core Features**
- **🔍 Búsqueda inteligente** de escuelas con filtros avanzados
- **📝 Sistema de reservas** completo con formularios multi-step
- **📚 Blog system** con CMS integrado y categorías
- **👨‍💼 Panel administrativo** para gestión de contenido
- **🌐 Internacionalización** (Español/Inglés) con rutas bilingües
- **📱 Diseño responsivo** optimizado para todos los dispositivos

### 🛡️ **Seguridad y Autenticación**
- **🔐 NextAuth v5** con estrategia JWT
- **🛡️ Protección de rutas** admin con middleware
- **👥 Control de acceso basado en roles**
- **🔄 Renovación automática de tokens**

### ⚡ **Performance**
- **🚀 Next.js 15** con App Router
- **⚡ Turbopack** para desarrollo acelerado
- **🖼️ Optimización de imágenes** con CDN (CloudFront)
- **📊 React Query** para gestión de estado del servidor
- **🎯 SEO optimizado** con meta tags dinámicos

---

## 🏗️ Arquitectura

### **Scope Rule Pattern**
El proyecto implementa un patrón de arquitectura moderno basado en **dominios de negocio**:

```
app/
├── features/                    # Código específico por dominio
│   ├── school/                  # Todo relacionado a escuelas
│   │   ├── components/          # SchoolCard, SchoolDetail, etc.
│   │   ├── hooks/               # useSchools, useSchoolById, etc.
│   │   └── index.ts             # Barrel exports
│   ├── booking/                 # Sistema de reservas
│   ├── blog/                    # Sistema de blog
│   └── admin/                   # Panel administrativo
└── shared/                      # Código reutilizable globalmente
    ├── components/              # Header, Footer, etc.
    ├── hooks/                   # useMediaQuery, useDebounce, etc.
    └── index.ts                 # Barrel exports
```

### **Beneficios de la Arquitectura**
- ✅ **Imports 60% más limpios**: `import { SchoolCard } from "@/app/features/school"`
- ✅ **Escalabilidad mejorada**: Fácil agregar nuevas features
- ✅ **Mantenibilidad**: Código relacionado agrupado
- ✅ **Experiencia de desarrollo**: Lógica de negocio claramente separada

---

## 🚀 Inicio Rápido

### **Prerequisitos**
- Node.js 18.13+ 
- npm, yarn, pnpm o bun

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/match-my-course.git

# Navegar al directorio
cd match-my-course

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 💻 Desarrollo

### **Variables de Entorno Requeridas**

```env
# Autenticación
NEXTAUTH_SECRET=tu-secret-super-seguro

# API Backend
NEXT_PUBLIC_BACKEND_URL=https://api.matchmycourse.com

# Servicios externos (opcional)
AWS_ACCESS_KEY_ID=tu-aws-access-key
AWS_SECRET_ACCESS_KEY=tu-aws-secret-key
```

### **Comandos de Desarrollo**

```bash
# Desarrollo con Turbopack
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

---

## 📁 Estructura del Proyecto

```
match-my-course/
├── 📁 app/                      # App Router de Next.js 15
│   ├── 📁 features/             # Features organizadas por dominio
│   │   ├── 📁 school/           # Escuelas y cursos
│   │   ├── 📁 booking/          # Sistema de reservas
│   │   ├── 📁 blog/             # Blog y CMS
│   │   └── 📁 admin/            # Panel administrativo
│   ├── 📁 shared/               # Componentes compartidos
│   ├── 📁 (landings)/           # Páginas de marketing
│   ├── 📁 api/                  # API routes
│   └── 📁 lib/                  # Utilidades y configuración
├── 📁 components/               # UI Components (shadcn/ui)
├── 📁 public/                   # Assets estáticos
├── 📁 types/                    # Definiciones de TypeScript
└── 📄 README.md
```

### **Organización por Features**

```typescript
// ✅ Imports limpios con nueva arquitectura
import { Header, Footer } from "@/app/shared";
import { SchoolCard, useSchoolById } from "@/app/features/school";
import { BookingPanel, useBooking } from "@/app/features/booking";
```

---

## 🛠️ Stack Tecnológico

### **Frontend Core**
- **[Next.js 15](https://nextjs.org)** - App Router, Server Components
- **[TypeScript](https://typescriptlang.org)** - Tipado estático
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS
- **[shadcn/ui](https://ui.shadcn.com)** - Componentes UI

### **Estado y Datos**
- **[React Query](https://tanstack.com/query)** - Gestión de estado del servidor
- **[NextAuth v5](https://authjs.dev)** - Autenticación
- **[React Hook Form](https://react-hook-form.com)** - Manejo de formularios

### **UI y Experiencia**
- **[Framer Motion](https://framer.com/motion)** - Animaciones
- **[Lucide React](https://lucide.dev)** - Iconos
- **[React Markdown](https://remarkjs.github.io/react-markdown)** - Rendering de Markdown

### **Desarrollo y Build**
- **[Turbopack](https://turbo.build/pack)** - Bundler ultrarrápido
- **[ESLint](https://eslint.org)** - Linting
- **[Prettier](https://prettier.io)** - Formateo de código

### **Servicios Externos**
- **AWS S3 + CloudFront** - CDN y almacenamiento
- **Google Analytics + GTM** - Analytics
- **YouTube API** - Contenido de video

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo con Turbopack
npm run build           # Build de producción (sin lint)
npm run start           # Servidor de producción
npm run lint            # ESLint

# Utilidades
npm run type-check      # Verificación de tipos TypeScript
npm run preview         # Preview del build de producción
```

### **Build Notes**
- El build utiliza `--no-lint` flag para velocidad
- Linting debe ejecutarse por separado con `npm run lint`
- Turbopack acelera significativamente el desarrollo

---

## 📚 Documentación

### **Rutas Principales**

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/cursos-ingles-extranjero` | Listado de cursos |
| `/cursos/[curso]/escuelas/[escuela]/[id]` | Detalle de escuela |
| `/blog` | Blog principal |
| `/admin/*` | Panel administrativo (requiere auth) |
| `/school-search` | Búsqueda de escuelas |

### **Internacionalización**

El proyecto maneja URLs bilingües:
```
/servicios → /services
/acerca-de-nosotros → /about-us
/cursos-ingles-extranjero → /english-school-courses
```

### **Patrones de Hooks**

```typescript
// Hooks de features específicas
const { data, isLoading } = useSchoolById(schoolId);
const { reservation, onSubmitReservation } = useBooking(params);

// Hooks compartidos
const isMobile = useMediaQuery("(max-width: 768px)");
const debouncedValue = useDebounce(searchTerm, 300);
```

---

## 🤝 Contribución

### **Workflow de Desarrollo**

1. **Fork** del repositorio
2. **Crea una branch** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Desarrolla** siguiendo los patrones establecidos
4. **Haz commit** usando conventional commits: `feat: add new component`
5. **Push** a tu branch: `git push origin feature/nueva-funcionalidad`
6. **Abre un Pull Request**

### **Convenciones de Código**

- ✅ **TypeScript** obligatorio para todos los componentes
- ✅ **Conventional Commits** para mensajes de commit
- ✅ **Scope Rule Pattern** para organización de archivos
- ✅ **Barrel exports** para imports limpios
- ✅ **Props interfaces** para todos los componentes

### **Testing**

```bash
# Verificar que el build funciona
npm run build

# Verificar linting
npm run lint

# Verificar tipos
npm run type-check
```

---

## 📄 Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---

## 👨‍💻 Desarrollado con ❤️

**Match My Course** - Conectando estudiantes con las mejores escuelas de inglés en Irlanda.

---

<div align="center">

**[🌐 Visitar Sitio Web](https://matchmycourse.com)** | **[📧 Contacto](mailto:info@matchmycourse.com)**

---

*Construido con Next.js 15, TypeScript y tecnologías modernas ⚡*

</div>