"use client"
import { useState } from "react"
import Link from "next/link"
import { PageTransition } from "@/components/shared/page-transition"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { Search, ChevronRight, BookOpen, Filter } from "lucide-react"
import courses from "@/data/courses.json"
import programs from "@/data/programs.json"
import skills from "@/data/skills.json"

const types = ["Quantitative", "Qualitative"]
const allSkills = [...new Set(courses.flatMap((c) => c.skillIds))]
const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export default function CoursesPage() {
    const [search, setSearch] = useState("")
    const [filterProgram, setFilterProgram] = useState("")
    const [filterType, setFilterType] = useState("")
    const [filterSkill, setFilterSkill] = useState("")

    const filtered = courses.filter((c) => {
        if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.code.toLowerCase().includes(search.toLowerCase())) return false
        if (filterProgram && !c.programIds.includes(filterProgram)) return false
        if (filterType && c.type !== filterType) return false
        if (filterSkill && !c.skillIds.includes(filterSkill)) return false
        return true
    })

    return (
        <PageTransition>
            {/* Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Course Catalog</span>
                    </nav>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-6 bg-crimson" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-crimson font-semibold">Academics</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Course Catalog</h1>
                    <p className="text-muted-foreground mt-2 text-[15px]">Browse {courses.length} courses across all academic programs</p>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8">
                {/* Search bar */}
                <div className="relative max-w-xl mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title or course code..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-11 h-11 text-sm"
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filter sidebar */}
                    <aside className="lg:w-56 shrink-0">
                        <div className="flex items-center gap-2 mb-4">
                            <Filter className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold">Filters</h3>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Program</h4>
                                <div className="space-y-1">
                                    {programs.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => setFilterProgram(filterProgram === p.id ? "" : p.id)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filterProgram === p.id
                                                    ? "bg-navy text-white font-medium"
                                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {p.shortName}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Type</h4>
                                <div className="space-y-1">
                                    {types.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setFilterType(filterType === t ? "" : t)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${filterType === t
                                                    ? "bg-navy text-white font-medium"
                                                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {allSkills.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setFilterSkill(filterSkill === s ? "" : s)}
                                            className={`text-[10px] px-2.5 py-1 rounded-full transition-colors font-medium ${filterSkill === s
                                                    ? "bg-navy text-white"
                                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                }`}
                                        >
                                            {s.replace(/-/g, " ")}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-sm text-muted-foreground">
                                {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
                                {(filterProgram || filterType || filterSkill) && (
                                    <button onClick={() => { setFilterProgram(""); setFilterType(""); setFilterSkill("") }}
                                        className="ml-2 text-crimson hover:underline font-medium">Clear filters</button>
                                )}
                            </p>
                        </div>

                        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                            {filtered.map((c) => (
                                <motion.div key={c.id} variants={item}>
                                    <Link href={`/courses/${c.slug}`} className="group block">
                                        <div className="border rounded-lg p-5 hover:shadow-md hover:border-border/80 transition-all">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-1.5">
                                                        <span className="font-mono font-medium text-foreground/60">{c.code}</span>
                                                        <span className="w-px h-3 bg-border" />
                                                        <span>{c.credits} Credits</span>
                                                        <span className="w-px h-3 bg-border" />
                                                        <span>{c.type}</span>
                                                        <span className="w-px h-3 bg-border" />
                                                        <span>{c.year}</span>
                                                    </div>
                                                    <h3 className="text-[15px] font-semibold group-hover:text-crimson transition-colors">{c.title}</h3>
                                                    <p className="text-[13px] text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed max-w-2xl">{c.description}</p>
                                                    <div className="flex items-center gap-3 mt-3">
                                                        <div className="flex gap-1.5">
                                                            {c.skillIds.slice(0, 3).map((s) => (
                                                                <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium">{s.replace(/-/g, " ")}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-3" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
