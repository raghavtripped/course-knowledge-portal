"use client"
import { useState } from "react"
import Link from "next/link"
import { PageTransition } from "@/components/shared/page-transition"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ArrowRight } from "lucide-react"
import skills from "@/data/skills.json"
import courses from "@/data/courses.json"

const categories = [...new Set(skills.map((s) => s.category))]
const catColors: Record<string, { line: string; bg: string; text: string }> = {
    Finance: { line: "bg-emerald-500", bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
    Analytics: { line: "bg-blue-500", bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
    Technology: { line: "bg-violet-500", bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
    Business: { line: "bg-amber-500", bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
    Management: { line: "bg-rose-500", bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
}

export default function SkillsPage() {
    const [selected, setSelected] = useState<string | null>(null)
    const active = skills.find((s) => s.id === selected)

    return (
        <PageTransition>
            {/* Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Skill Map</span>
                    </nav>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-6 bg-gold" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold">Pathways</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Skill Map</h1>
                    <p className="text-muted-foreground mt-2 text-[15px]">Explore the skills developed across our curriculum — click any skill to explore</p>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Skill Clusters */}
                    <div className="flex-1 space-y-8">
                        {categories.map((cat) => {
                            const colors = catColors[cat] || { line: "bg-gray-500", bg: "bg-gray-500/10", text: "text-gray-600" }
                            return (
                                <div key={cat}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`h-px w-6 ${colors.line}`} />
                                        <h2 className={`text-sm font-semibold uppercase tracking-wider ${colors.text}`}>{cat}</h2>
                                        <span className="text-[11px] text-muted-foreground ml-1">{skills.filter((s) => s.category === cat).length} skills</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.filter((s) => s.category === cat).map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setSelected(selected === s.id ? null : s.id)}
                                                className={`text-sm px-3.5 py-2 rounded-lg border transition-all duration-200 ${selected === s.id
                                                        ? "bg-navy text-white border-navy shadow-md"
                                                        : "bg-card hover:shadow-sm hover:-translate-y-0.5 border-border text-foreground"
                                                    }`}
                                            >
                                                <span className="font-medium">{s.name}</span>
                                                <span className={`ml-2 text-[10px] ${selected === s.id ? "text-white/60" : "text-muted-foreground"}`}>{s.courseIds.length}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Detail Panel */}
                    <div className="lg:w-96 shrink-0">
                        <AnimatePresence mode="wait">
                            {active ? (
                                <motion.div key={active.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                    <div className="sticky top-24 border rounded-lg overflow-hidden">
                                        <div className="bg-navy text-white px-5 py-4">
                                            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">{active.category}</span>
                                            <h3 className="text-lg font-bold mt-0.5">{active.name}</h3>
                                        </div>
                                        <div className="p-5 space-y-5">
                                            <p className="text-sm text-muted-foreground leading-relaxed">{active.description}</p>

                                            <div>
                                                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Courses Teaching This Skill</h4>
                                                <div className="space-y-1.5">
                                                    {active.courseIds.map((cId) => {
                                                        const c = courses.find((x) => x.id === cId)
                                                        return c ? (
                                                            <Link key={cId} href={`/courses/${c.slug}`} className="group flex items-center justify-between py-1.5 text-sm hover:text-crimson transition-colors">
                                                                {c.title}
                                                                <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                                            </Link>
                                                        ) : null
                                                    })}
                                                </div>
                                            </div>

                                            <Separator />

                                            <div>
                                                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Programs</h4>
                                                <div className="flex gap-2">
                                                    {active.programIds.map((p) => (
                                                        <span key={p} className="text-xs px-2.5 py-1 rounded-md bg-muted font-medium">{p.toUpperCase()}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Related Skills</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {active.relatedSkills.map((rs) => (
                                                        <button
                                                            key={rs}
                                                            onClick={() => setSelected(rs)}
                                                            className="text-[11px] px-2.5 py-1 rounded-md bg-muted hover:bg-navy hover:text-white transition-colors font-medium"
                                                        >
                                                            {rs.replace(/-/g, " ")}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="sticky top-24 border rounded-lg p-8 text-center text-muted-foreground text-sm bg-muted/30">
                                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                                            <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
                                        </div>
                                        <p>Select a skill to see related courses, programs, and pathways.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
