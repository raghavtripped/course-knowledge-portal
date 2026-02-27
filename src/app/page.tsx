"use client"
import Link from "next/link"
import { PageTransition } from "@/components/shared/page-transition"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Search, BookOpen, Users, FileText, Clock, ArrowRight, ChevronRight, GraduationCap, BarChart3, Globe } from "lucide-react"
import programs from "@/data/programs.json"
import courses from "@/data/courses.json"
import analytics from "@/data/analytics.json"

const featuredCourses = courses.slice(0, 6)
const stats = [
  { label: "Courses", value: analytics.stats.totalCourses, icon: BookOpen, desc: "Across all programs" },
  { label: "Faculty", value: analytics.stats.totalFaculty, icon: Users, desc: "World-class educators" },
  { label: "Archived Exams", value: analytics.stats.totalArchivedExams, icon: FileText, desc: "Years of assessments" },
  { label: "Lecture Hours", value: analytics.stats.totalLectureHours.toLocaleString(), icon: Clock, desc: "Of recorded content" },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function HomePage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(24,131,138,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(163,31,52,0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 bg-crimson" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60 font-medium">Academic Year 2024–25</span>
              </div>
              <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight">
                Unlocking Knowledge,<br />
                <span className="text-teal-light">Empowering Minds.</span>
              </h1>
              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">
                Explore open courses, faculty research, and skill pathways across the institution.
                A comprehensive gateway to academic resources and institutional knowledge.
              </p>
            </motion.div>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8 max-w-lg"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  placeholder="Search courses, faculty, programs..."
                  className="w-full h-13 pl-12 pr-4 bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:bg-white/15 transition-all text-[15px]"
                  readOnly
                />
              </div>
              <div className="flex gap-3 mt-3">
                <span className="text-[11px] text-white/40">Popular:</span>
                {["Corporate Finance", "Machine Learning", "Strategy"].map((t) => (
                  <Link key={t} href="/courses" className="text-[11px] text-teal-light hover:text-white transition-colors">{t}</Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats grid overlaid at bottom */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={item}>
                <div className="bg-white/[0.06] border border-white/10 rounded-lg px-5 py-5 backdrop-blur-sm">
                  <s.icon className="h-5 w-5 text-teal-light mb-3 opacity-80" />
                  <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                  <div className="text-sm font-medium text-white/80 mt-0.5">{s.label}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="border-b">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-5">
          <div className="flex items-center gap-6 text-[13px] overflow-x-auto">
            <span className="text-muted-foreground shrink-0 font-medium">Quick Access:</span>
            {[
              { label: "Browse All Courses", href: "/courses", icon: BookOpen },
              { label: "Faculty Directory", href: "/faculty", icon: Users },
              { label: "Skill Pathways", href: "/skills", icon: BarChart3 },
              { label: "Analytics Dashboard", href: "/admin-preview", icon: Globe },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <l.icon className="h-3.5 w-3.5" />
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-crimson" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-crimson font-semibold">Academics</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Academic Programs</h2>
              <p className="text-muted-foreground mt-2 text-[15px]">Explore our flagship management programs, from undergraduate to doctoral</p>
            </div>
            <Link href="/programs" className="hidden sm:flex items-center gap-1 text-sm font-medium text-crimson hover:text-crimson-light transition-colors">
              View all programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {programs.map((p) => (
              <motion.div key={p.id} variants={item}>
                <Link href={`/programs/${p.slug}`} className="group block">
                  <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="bg-navy h-24 relative flex items-end px-5 pb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-navy-light/80 to-navy" />
                      <div className="relative">
                        <span className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-medium">{p.duration}</span>
                        <h3 className="text-lg font-bold text-white leading-snug mt-0.5">{p.shortName}</h3>
                      </div>
                    </div>
                    <div className="px-5 py-4 bg-card">
                      <p className="text-sm font-medium text-foreground group-hover:text-crimson transition-colors leading-snug">{p.name}</p>
                      <div className="flex items-center gap-4 mt-3 text-[12px] text-muted-foreground">
                        <span>{p.totalCredits} Credits</span>
                        <span className="w-px h-3 bg-border" />
                        <span>{p.totalCourses} Courses</span>
                        <span className="w-px h-3 bg-border" />
                        <span>{p.terms} Terms</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#0e1829] border-y">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6 bg-teal" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-teal font-semibold">Course Catalog</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Courses</h2>
              <p className="text-muted-foreground mt-2 text-[15px]">Top courses across programs with complete syllabi and resources</p>
            </div>
            <Link href="/courses" className="hidden sm:flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-light transition-colors">
              Browse catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuredCourses.map((c) => (
              <motion.div key={c.id} variants={item}>
                <Link href={`/courses/${c.slug}`} className="group block">
                  <div className="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="h-1 bg-gradient-to-r from-navy via-teal to-crimson" />
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
                        <span className="font-mono font-medium text-foreground/70">{c.code}</span>
                        <span className="w-px h-3 bg-border" />
                        <span>{c.credits} Credits</span>
                        <span className="w-px h-3 bg-border" />
                        <span>{c.year}</span>
                      </div>
                      <h3 className="text-[15px] font-semibold leading-snug group-hover:text-crimson transition-colors">{c.title}</h3>
                      <p className="text-[13px] text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{c.description}</p>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1.5">
                          {c.skillIds.slice(0, 2).map((s) => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">{s.replace(/-/g, " ")}</span>
                          ))}
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-medium text-teal hover:text-teal-light transition-colors">
              Browse full catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap className="h-8 w-8 mx-auto mb-4 text-muted-foreground/50" />
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Open Access to Academic Excellence</h2>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              This portal provides free and open access to course materials, syllabi, exam archives,
              and faculty expertise from across the institution. Our mission is to advance education
              through transparent knowledge sharing and curriculum accessibility.
            </p>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal" />
                <span>Open Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-crimson" />
                <span>Peer Reviewed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gold" />
                <span>Continuously Updated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
