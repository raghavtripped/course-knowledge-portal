"use client"
import Link from "next/link"
import { PageTransition } from "@/components/shared/page-transition"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import faculty from "@/data/faculty.json"

const departments = [...new Set(faculty.map((f) => f.department))]
const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }

export default function FacultyPage() {
    const [search, setSearch] = useState("")
    const [dept, setDept] = useState("")
    const filtered = faculty.filter((f) => {
        if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false
        if (dept && f.department !== dept) return false
        return true
    })

    return (
        <PageTransition>
            {/* Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Faculty</span>
                    </nav>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-6 bg-teal" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-teal font-semibold">People</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Faculty Directory</h1>
                    <p className="text-muted-foreground mt-2 text-[15px]">{faculty.length} faculty members across all departments</p>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search faculty..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 h-10 text-sm" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setDept("")} className={`text-xs px-3 py-1.5 rounded-md transition-colors ${!dept ? "bg-navy text-white" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`}>All</button>
                        {departments.map((d) => (
                            <button key={d} onClick={() => setDept(dept === d ? "" : d)} className={`text-xs px-3 py-1.5 rounded-md transition-colors ${dept === d ? "bg-navy text-white" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`}>{d}</button>
                        ))}
                    </div>
                </div>

                <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
                    {filtered.map((f) => (
                        <motion.div key={f.id} variants={item}>
                            <Link href={`/faculty/${f.slug}`} className="group block">
                                <div className="flex items-start gap-4 p-4 sm:p-5 border rounded-lg hover:shadow-md transition-all">
                                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-navy text-white flex items-center justify-center text-base sm:text-lg font-bold shrink-0">
                                        {f.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-[15px] font-semibold group-hover:text-crimson transition-colors">{f.name}</h3>
                                                <p className="text-[13px] text-muted-foreground">{f.department}</p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1 leading-relaxed">{f.bio}</p>
                                        <div className="flex flex-wrap gap-1.5 mt-3">
                                            {f.researchAreas.slice(0, 4).map((a) => (
                                                <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">{a}</span>
                                            ))}
                                            <span className="text-[10px] text-muted-foreground">{f.coursesTeught.length} course{f.coursesTeught.length !== 1 ? "s" : ""}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    )
}
