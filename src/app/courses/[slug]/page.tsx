"use client"
import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PageTransition } from "@/components/shared/page-transition"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, FileText, Video, Presentation, BookOpen, Lightbulb, AlertTriangle, Trophy, Briefcase, ChevronRight, User, Calendar, Award, Tag } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import courses from "@/data/courses.json"
import faculty from "@/data/faculty.json"

const GRADE_COLORS = ["#18838a", "#0f2b46", "#6366f1", "#d4a843", "#a31f34", "#94a3b8"]

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const course = courses.find((c) => c.slug === slug)
    if (!course) return notFound()

    const instructor = faculty.find((f) => f.id === course.instructorId)

    return (
        <PageTransition>
            {/* Breadcrumb + Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">{course.title}</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-mono text-sm text-muted-foreground">{course.code}</span>
                                <span className="text-muted-foreground">|</span>
                                <span className="text-sm text-muted-foreground">{course.year}</span>
                                <span className="text-muted-foreground">|</span>
                                <span className="text-sm text-muted-foreground">{course.type}</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{course.title}</h1>
                            <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed max-w-2xl">{course.description}</p>
                        </div>

                        {/* Course Info sidebar */}
                        <div className="lg:w-72 shrink-0">
                            <div className="bg-card border rounded-lg overflow-hidden">
                                <div className="bg-navy text-white px-5 py-3">
                                    <h3 className="text-sm font-semibold">Course Information</h3>
                                </div>
                                <div className="divide-y text-sm">
                                    {instructor && (
                                        <div className="px-5 py-3 flex items-start gap-3">
                                            <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                            <div>
                                                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Instructor</span>
                                                <Link href={`/faculty/${instructor.slug}`} className="block text-sm font-medium text-crimson hover:underline mt-0.5">{instructor.name}</Link>
                                            </div>
                                        </div>
                                    )}
                                    <div className="px-5 py-3 flex items-start gap-3">
                                        <Award className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Credits</span>
                                            <p className="text-sm mt-0.5">{course.credits} Credits</p>
                                        </div>
                                    </div>
                                    <div className="px-5 py-3 flex items-start gap-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Prerequisites</span>
                                            <p className="text-sm mt-0.5">{course.prerequisites.join(", ")}</p>
                                        </div>
                                    </div>
                                    <div className="px-5 py-3 flex items-start gap-3">
                                        <Tag className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                                        <div>
                                            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Skills</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {course.skillIds.map((s) => (
                                                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium">{s.replace(/-/g, " ")}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10">
                <Tabs defaultValue="overview" className="space-y-8">
                    <TabsList className="bg-transparent border-b rounded-none p-0 h-auto gap-0 w-full justify-start">
                        {[
                            { value: "overview", label: "Overview" },
                            { value: "syllabus", label: "Syllabus" },
                            { value: "assignments", label: "Assignments" },
                            { value: "exams", label: "Exams Archive" },
                            { value: "insights", label: "Instructor Insights" },
                        ].map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="relative rounded-none border-b-2 border-transparent px-5 pb-3 pt-2 text-[13px] font-medium text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-crimson data-[state=active]:shadow-none bg-transparent hover:text-foreground transition-colors"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* ─── OVERVIEW ─── */}
                    <TabsContent value="overview" className="space-y-10 mt-8">
                        <div>
                            <h2 className="text-lg font-bold mb-4">Learning Objectives</h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {course.learningObjectives.map((obj, i) => (
                                    <div key={i} className="flex gap-3 p-4 rounded-lg border bg-card">
                                        <div className="w-7 h-7 rounded-full bg-teal/10 text-teal flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{obj}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold mb-4">Grading Breakdown</h2>
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="text-xs uppercase tracking-wider font-semibold">Component</TableHead>
                                            <TableHead className="text-xs uppercase tracking-wider font-semibold text-right w-24">Weight</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {course.gradingBreakdown.map((g) => (
                                            <TableRow key={g.component}>
                                                <TableCell className="text-sm">{g.component}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                                                            <div className="h-full bg-navy rounded-full" style={{ width: `${g.weight}%` }} />
                                                        </div>
                                                        <span className="text-sm font-mono font-medium w-8 text-right">{g.weight}%</span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {instructor && (
                            <div>
                                <h2 className="text-lg font-bold mb-4">Instructor</h2>
                                <Link href={`/faculty/${instructor.slug}`} className="group block">
                                    <div className="flex items-start gap-5 p-5 border rounded-lg hover:shadow-md transition-all">
                                        <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center text-lg font-bold shrink-0">
                                            {instructor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold group-hover:text-crimson transition-colors">{instructor.name}</h3>
                                            <p className="text-sm text-muted-foreground">{instructor.department}</p>
                                            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">{instructor.bio}</p>
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {instructor.researchAreas.map((a) => (
                                                    <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-muted font-medium">{a}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </TabsContent>

                    {/* ─── SYLLABUS ─── */}
                    <TabsContent value="syllabus" className="mt-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-px w-6 bg-teal" />
                            <h2 className="text-lg font-bold">Weekly Schedule</h2>
                            <span className="text-sm text-muted-foreground ml-2">{course.syllabus.length} weeks</span>
                        </div>
                        <div className="space-y-3">
                            {course.syllabus.map((w) => (
                                <Accordion key={w.week} type="single" collapsible>
                                    <AccordionItem value={`week-${w.week}`} className="border rounded-lg overflow-hidden">
                                        <AccordionTrigger className="hover:no-underline px-5 py-4">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="w-10 h-10 rounded-lg bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                                                    {w.week}
                                                </div>
                                                <div>
                                                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Week {w.week}</span>
                                                    <p className="text-sm font-medium mt-0.5">{w.topic}</p>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="bg-muted/20 px-5 pb-5 pt-2 border-t">
                                            <div className="ml-14 space-y-4">
                                                <div>
                                                    <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Readings</h4>
                                                    <ul className="space-y-1.5">{w.readings.map((r, i) => <li key={i} className="text-sm text-muted-foreground flex items-start gap-2"><BookOpen className="h-3.5 w-3.5 mt-0.5 shrink-0 text-teal" />{r}</li>)}</ul>
                                                </div>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    <Button variant="outline" size="sm" className="text-xs h-8"><Presentation className="mr-1.5 h-3.5 w-3.5" /> Slides</Button>
                                                    <Button variant="outline" size="sm" className="text-xs h-8"><Video className="mr-1.5 h-3.5 w-3.5" /> Lecture Video</Button>
                                                    {w.assignmentLink && <Button variant="outline" size="sm" className="text-xs h-8"><FileText className="mr-1.5 h-3.5 w-3.5" /> Assignment</Button>}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                        </div>
                    </TabsContent>

                    {/* ─── ASSIGNMENTS ─── */}
                    <TabsContent value="assignments" className="space-y-5 mt-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-px w-6 bg-crimson" />
                            <h2 className="text-lg font-bold">Course Assignments</h2>
                        </div>
                        {course.assignments.map((a, i) => (
                            <div key={i} className="border rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between px-5 py-4 bg-muted/30">
                                    <div>
                                        <h3 className="text-sm font-semibold">{a.title}</h3>
                                        <p className="text-[12px] text-muted-foreground mt-0.5">Due: {a.dueDate}</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs h-8"><Download className="mr-1.5 h-3.5 w-3.5" /> Download</Button>
                                </div>
                                <Table>
                                    <TableHeader><TableRow><TableHead className="text-xs">Criterion</TableHead><TableHead className="text-xs text-right w-20">Weight</TableHead></TableRow></TableHeader>
                                    <TableBody>{a.rubric.map((r) => <TableRow key={r.criterion}><TableCell className="text-sm">{r.criterion}</TableCell><TableCell className="text-right text-sm font-mono">{r.weight}%</TableCell></TableRow>)}</TableBody>
                                </Table>
                            </div>
                        ))}
                    </TabsContent>

                    {/* ─── EXAMS ─── */}
                    <TabsContent value="exams" className="space-y-8 mt-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-px w-6 bg-navy dark:bg-white/30" />
                                <h2 className="text-lg font-bold">Past Examinations</h2>
                            </div>
                            <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="text-xs uppercase tracking-wider font-semibold">Year</TableHead>
                                            <TableHead className="text-xs uppercase tracking-wider font-semibold">Midterm</TableHead>
                                            <TableHead className="text-xs uppercase tracking-wider font-semibold">Final</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {course.exams.pastYears.map((e) => (
                                            <TableRow key={e.year}>
                                                <TableCell className="font-medium font-mono">{e.year}</TableCell>
                                                <TableCell><Button variant="ghost" size="sm" className="text-xs text-crimson hover:text-crimson h-8"><Download className="mr-1.5 h-3.5 w-3.5" /> Midterm PDF</Button></TableCell>
                                                <TableCell><Button variant="ghost" size="sm" className="text-xs text-crimson hover:text-crimson h-8"><Download className="mr-1.5 h-3.5 w-3.5" /> Final PDF</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold mb-4">Grade Distribution — {course.exams.pastYears[course.exams.pastYears.length - 1].year}</h3>
                            <div className="border rounded-lg p-6">
                                <div className="h-56">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={course.exams.pastYears[course.exams.pastYears.length - 1].gradeDistribution}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                            <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                                            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} />
                                            <Tooltip formatter={(v: unknown) => `${v}%`} />
                                            <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                                                {course.exams.pastYears[course.exams.pastYears.length - 1].gradeDistribution.map((_, i) => (
                                                    <Cell key={i} fill={GRADE_COLORS[i]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* ─── INSIGHTS ─── */}
                    <TabsContent value="insights" className="space-y-6 mt-8">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-px w-6 bg-gold" />
                            <h2 className="text-lg font-bold">Instructor Insights</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: Lightbulb, color: "text-gold", bg: "bg-gold/10", title: "Why This Course Exists", content: course.instructorInsights.whyExists },
                                { icon: AlertTriangle, color: "text-crimson", bg: "bg-crimson/10", title: "Common Mistakes", content: course.instructorInsights.commonMistakes },
                                { icon: Trophy, color: "text-teal", bg: "bg-teal/10", title: "How to Excel", content: course.instructorInsights.howToExcel },
                                { icon: Briefcase, color: "text-navy dark:text-blue-400", bg: "bg-navy/5 dark:bg-blue-400/10", title: "Career Pathways", content: course.instructorInsights.careerPathways },
                            ].map((card) => (
                                <div key={card.title} className="border rounded-lg p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                                            <card.icon className="h-4 w-4" />
                                        </div>
                                        <h3 className="text-sm font-semibold">{card.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border rounded-lg p-5">
                            <h3 className="text-sm font-semibold mb-3">Skills Gained Upon Completion</h3>
                            <div className="flex flex-wrap gap-2">
                                {course.instructorInsights.skillsGained.map((s) => (
                                    <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-navy text-white font-medium">{s.replace(/-/g, " ")}</span>
                                ))}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </PageTransition>
    )
}
