# Institutional Knowledge Portal

A production-grade frontend MVP for a university-wide Course Knowledge Portal. Built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **ShadCN UI**, **Recharts**, and **Framer Motion**.

> Designed for presentation to college administrators. All data is mocked — no backend required.

## Quick Start

```bash
cd course-portal
npm install
npm run dev
# → http://localhost:3000
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, stats, featured programs & courses |
| `/programs` | Program grid (IPM, PGP, EPGP, FPM) |
| `/programs/[slug]` | Curriculum timeline, skill distribution chart, faculty |
| `/courses` | Filterable course catalog (program, type, skill, search) |
| `/courses/[slug]` | 5-tab course detail: Overview, Syllabus, Assignments, Exams, Insights |
| `/faculty` | Faculty directory grid |
| `/faculty/[slug]` | Bio, courses, publications, teaching philosophy |
| `/skills` | Interactive skill map with drill-down detail panel |
| `/admin-preview` | Admin dashboard with charts, upload/edit modals |

## Data Architecture

All data lives in `src/data/` as static JSON with relational IDs:

- **programs.json** — 4 programs with term structures, skill distributions
- **courses.json** — 23 courses with syllabi, assignments, exams, instructor insights
- **faculty.json** — 15 faculty with bios, publications, research areas
- **skills.json** — 18 skills linked to courses and programs
- **analytics.json** — Mock admin analytics (views, downloads, enrollment)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Root layout (navbar + footer)
│   ├── programs/           # Programs index + [slug] detail
│   ├── courses/            # Courses index + [slug] detail (5 tabs)
│   ├── faculty/            # Faculty index + [slug] detail
│   ├── skills/             # Interactive skill map
│   └── admin-preview/      # Admin simulation dashboard
├── components/
│   ├── layout/             # Navbar, Footer, ThemeProvider
│   ├── shared/             # PageTransition
│   └── ui/                 # ShadCN components
├── data/                   # Static JSON data files
└── lib/                    # Utilities
```

## Features

- 🌓 **Dark/light mode** toggle with persistent theme
- 📱 **Fully responsive** — mobile drawer nav, responsive grids
- 📊 **Recharts** — Skill distribution, grade distribution, analytics charts
- 🎬 **Framer Motion** — Page transitions, staggered card animations
- 🏷️ **Filter sidebar** — Multi-faceted course filtering
- 📚 **Tabbed course detail** — Overview, 10-week syllabus, assignments with rubrics, exam archives with grade charts, instructor insights
- 🗺️ **Interactive skill map** — Clustered by category with drill-down
- 📈 **Admin dashboard** — Bar charts, line charts, enrollment heatmap

## Future Backend Integration

1. Replace static JSON imports with API calls (`fetch` / SWR / React Query)
2. Add NextAuth.js for role-based access (student, faculty, admin)
3. Connect course uploads and syllabus edits to a CMS or database
4. Integrate full-text search with Elasticsearch or Algolia
5. Add real analytics tracking and user activity logging

## Scalability Roadmap

- **Phase 1**: Connect to PostgreSQL + Prisma ORM for dynamic data
- **Phase 2**: Implement LMS features (assignment submission, grading)
- **Phase 3**: Add real-time collaboration (discussion forums, annotations)
- **Phase 4**: Knowledge graph with Neo4j for course/skill relationships
- **Phase 5**: AI-powered course recommendations and learning paths
