"use client"
import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/shared/page-transition"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, Mail, Clock, BookOpen, Quote } from "lucide-react"
import faculty from "@/data/faculty.json"

export default function FacultyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const member = faculty.find((f) => f.slug === slug)
    if (!member) return notFound()

    return (
        <PageTransition>
            {/* Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/faculty" className="hover:text-foreground transition-colors">Faculty</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">{member.name}</span>
                    </nav>

                    <div className="flex items-start gap-4 sm:gap-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-navy text-white flex items-center justify-center text-xl sm:text-2xl font-bold shrink-0">
                            {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{member.name}</h1>
                            <p className="text-muted-foreground mt-1">{member.department}</p>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 sm:mt-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5 truncate"><Mail className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{member.email}</span></span>
                                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 shrink-0" /> {member.officeHours}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-lg font-bold mb-3">Biography</h2>
                            <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                        </div>

                        <div className="border-l-4 border-l-teal bg-muted/30 rounded-r-lg p-6">
                            <Quote className="h-5 w-5 text-teal mb-3" />
                            <p className="text-sm italic text-muted-foreground leading-relaxed">{member.teachingPhilosophy}</p>
                            <p className="text-xs font-semibold mt-4 text-teal uppercase tracking-wider">Teaching Philosophy</p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px w-6 bg-crimson" />
                                <h2 className="text-lg font-bold">Courses Taught</h2>
                                <span className="text-sm text-muted-foreground">{member.coursesTeught.length}</span>
                            </div>
                            <div className="space-y-2">
                                {member.coursesTeught.map((c) => (
                                    <Link key={c.id} href={`/courses/${c.slug}`} className="group flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all">
                                        <span className="text-sm font-medium group-hover:text-crimson transition-colors">{c.title}</span>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px w-6 bg-navy dark:bg-white/30" />
                                <h2 className="text-lg font-bold">Selected Publications</h2>
                            </div>
                            <ol className="space-y-3">
                                {member.publications.map((p, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                        <span className="text-[11px] font-mono text-muted-foreground/50 mt-0.5 shrink-0">[{i + 1}]</span>
                                        {p}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <div className="border rounded-lg overflow-hidden sticky top-24">
                            <div className="bg-navy text-white px-5 py-3">
                                <h3 className="text-sm font-semibold">Research Areas</h3>
                            </div>
                            <div className="p-5">
                                <div className="flex flex-wrap gap-2">
                                    {member.researchAreas.map((a) => (
                                        <span key={a} className="text-[11px] px-3 py-1.5 rounded-full bg-muted font-medium text-foreground">{a}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
