"use client"
import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/shared/page-transition"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, ArrowRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import programs from "@/data/programs.json"
import courses from "@/data/courses.json"
import faculty from "@/data/faculty.json"

const COLORS = ["#0f2b46", "#18838a", "#a31f34", "#d4a843", "#6366f1", "#94a3b8"]

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const program = programs.find((p) => p.slug === slug)
    if (!program) return notFound()

    const programCourses = courses.filter((c) => c.programIds.includes(program.id))
    const programFaculty = faculty.filter((f) => f.coursesTeught.some((c) => programCourses.map((pc) => pc.id).includes(c.id)))

    return (
        <PageTransition>
            {/* Header */}
            <div className="bg-navy text-white">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                    <nav className="flex items-center gap-1.5 text-[12px] text-white/50 mb-6">
                        <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/programs" className="hover:text-white/80 transition-colors">Programs</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-white/80">{program.shortName}</span>
                    </nav>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-medium">{program.duration}</span>
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mt-1">{program.name}</h1>
                    <p className="text-white/60 mt-3 text-[15px] leading-relaxed max-w-2xl">{program.description}</p>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-sm">
                        <div><span className="text-white/40 text-[10px] uppercase tracking-wider block">Credits</span><span className="text-xl font-bold mt-0.5 block">{program.totalCredits}</span></div>
                        <div className="hidden sm:block w-px h-10 bg-white/15" />
                        <div><span className="text-white/40 text-[10px] uppercase tracking-wider block">Courses</span><span className="text-xl font-bold mt-0.5 block">{program.totalCourses}</span></div>
                        <div className="hidden sm:block w-px h-10 bg-white/15" />
                        <div><span className="text-white/40 text-[10px] uppercase tracking-wider block">Terms</span><span className="text-xl font-bold mt-0.5 block">{program.terms}</span></div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14 space-y-10 sm:space-y-14">
                {/* Curriculum Timeline */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-px w-6 bg-teal" />
                        <h2 className="text-xl font-bold">Curriculum Timeline</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {program.termStructure.map((term, i) => (
                            <div key={i} className="border rounded-lg overflow-hidden">
                                <div className="bg-muted/50 px-5 py-3 border-b">
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Term {term.term}</span>
                                    <h3 className="text-sm font-semibold mt-0.5">{term.label}</h3>
                                </div>
                                <div className="p-5">
                                    <ul className="space-y-2">
                                        {term.courses.map((cId) => {
                                            const course = courses.find((c) => c.id === cId)
                                            return course ? (
                                                <li key={cId}>
                                                    <Link href={`/courses/${course.slug}`} className="text-sm hover:text-crimson transition-colors flex items-center gap-1.5">
                                                        <span className="font-mono text-[11px] text-muted-foreground w-12 shrink-0">{course.code}</span>
                                                        {course.title}
                                                    </Link>
                                                </li>
                                            ) : null
                                        })}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Distribution */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-px w-6 bg-crimson" />
                        <h2 className="text-xl font-bold">Skill Distribution</h2>
                    </div>
                    <div className="border rounded-lg p-4 sm:p-6">
                        <div className="h-64 -ml-2 sm:ml-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={program.skillDistribution} layout="vertical" margin={{ left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                    <XAxis type="number" domain={[0, 40]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                                    <YAxis type="category" dataKey="skill" width={100} tick={{ fontSize: 11 }} />
                                    <Tooltip formatter={(v: unknown) => `${v}%`} />
                                    <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                                        {program.skillDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Courses & Faculty */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px w-6 bg-navy dark:bg-white/30" />
                            <h2 className="text-xl font-bold">Courses in This Program</h2>
                            <span className="text-sm text-muted-foreground ml-1">{programCourses.length}</span>
                        </div>
                        <div className="space-y-2">
                            {programCourses.map((c) => (
                                <Link key={c.id} href={`/courses/${c.slug}`} className="group flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all">
                                    <div>
                                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-0.5">
                                            <span className="font-mono">{c.code}</span>
                                            <span className="w-px h-3 bg-border" />
                                            <span>{c.credits} Credits</span>
                                        </div>
                                        <span className="text-sm font-medium group-hover:text-crimson transition-colors">{c.title}</span>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-px w-6 bg-gold" />
                            <h2 className="text-xl font-bold">Faculty</h2>
                        </div>
                        <div className="space-y-3">
                            {programFaculty.slice(0, 8).map((f) => (
                                <Link key={f.id} href={`/faculty/${f.slug}`} className="group flex items-center gap-3 p-3 border rounded-lg hover:shadow-sm transition-all">
                                    <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                                        {f.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-crimson transition-colors">{f.name}</p>
                                        <p className="text-[11px] text-muted-foreground">{f.department}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
