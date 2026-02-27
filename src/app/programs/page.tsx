"use client"
import Link from "next/link"
import { PageTransition } from "@/components/shared/page-transition"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ChevronRight, ArrowRight, Clock, BookOpen, Award, Calendar } from "lucide-react"
import programs from "@/data/programs.json"

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function ProgramsPage() {
    return (
        <PageTransition>
            {/* Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Programs</span>
                    </nav>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-px w-6 bg-crimson" />
                        <span className="text-[11px] uppercase tracking-[0.2em] text-crimson font-semibold">Academics</span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Academic Programs</h1>
                    <p className="text-muted-foreground mt-2 text-[15px]">From undergraduate management to doctoral research — {programs.length} flagship programs</p>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10 lg:py-14">
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                    {programs.map((p) => (
                        <motion.div key={p.id} variants={item}>
                            <Link href={`/programs/${p.slug}`} className="group block">
                                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Left panel */}
                                        <div className="lg:w-64 bg-navy text-white p-6 lg:p-8 flex flex-col justify-between shrink-0">
                                            <div>
                                                <span className="text-[10px] uppercase tracking-[0.15em] text-white/50 font-medium">{p.duration}</span>
                                                <h2 className="text-3xl font-bold mt-1">{p.shortName}</h2>
                                                <p className="text-sm text-white/60 mt-2 leading-relaxed">{p.name}</p>
                                            </div>
                                            <div className="flex items-center gap-1 mt-4 text-sm text-white/50 group-hover:text-teal-light transition-colors">
                                                Explore <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                        {/* Right content */}
                                        <div className="flex-1 p-6 lg:p-8 bg-card">
                                            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                                            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                                                <div>
                                                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1"><Award className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider font-semibold">Credits</span></div>
                                                    <p className="text-lg font-bold">{p.totalCredits}</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1"><BookOpen className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider font-semibold">Courses</span></div>
                                                    <p className="text-lg font-bold">{p.totalCourses}</p>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1"><Calendar className="h-3.5 w-3.5" /><span className="text-[10px] uppercase tracking-wider font-semibold">Terms</span></div>
                                                    <p className="text-lg font-bold">{p.terms}</p>
                                                </div>
                                            </div>
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
