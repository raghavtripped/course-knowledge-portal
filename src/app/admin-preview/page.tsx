"use client"
import { useState } from "react"
import Link from "next/link"
import { PageTransition } from "@/components/shared/page-transition"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Upload, Edit, BarChart3, TrendingUp, Grid3X3, ChevronRight, ShieldAlert } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import analytics from "@/data/analytics.json"

const COLORS = ["#0f2b46", "#18838a", "#a31f34", "#d4a843", "#6366f1", "#1a3a5c", "#2ba8b0", "#c0374d", "#94a3b8", "#818cf8"]
const programs = ["PGP", "IPM", "EPGP", "FPM"]
const heatSkills = ["Financial Analysis", "Strategy", "Marketing", "Data Analytics", "Leadership", "Operations"]

function HeatmapCell({ value, max }: { value: number; max: number }) {
    const intensity = Math.round((value / max) * 100)
    return (
        <td className="p-3 text-center text-xs font-mono font-medium" style={{
            backgroundColor: `hsl(207, 80%, ${97 - intensity * 0.55}%)`,
            color: intensity > 60 ? "white" : "inherit",
        }}>
            {value}
        </td>
    )
}

export default function AdminPreviewPage() {
    const [uploadOpen, setUploadOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const maxHeat = Math.max(...analytics.enrollmentHeatmap.map((h) => h.count))

    return (
        <PageTransition>
            {/* Header */}
            <div className="border-b bg-slate-50 dark:bg-[#0e1829]">
                <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10">
                    <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3" />
                        <span className="text-foreground font-medium">Admin Preview</span>
                    </nav>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-px w-6 bg-crimson" />
                                <span className="text-[11px] uppercase tracking-[0.2em] text-crimson font-semibold">Administration</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Admin Preview</h1>
                            <p className="text-muted-foreground mt-2 text-[15px]">Simulated administrative dashboard — visual preview only</p>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground bg-muted px-3 py-1.5 rounded-md">
                            <ShieldAlert className="h-3.5 w-3.5" />
                            No Auth · View Only
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                        <DialogTrigger asChild><Button className="bg-navy hover:bg-navy-light"><Upload className="mr-2 h-4 w-4" /> Upload New Course</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Upload New Course</DialogTitle></DialogHeader>
                            <div className="space-y-4 mt-2">
                                <div><label className="text-sm font-medium">Course Title</label><Input placeholder="e.g. Advanced Corporate Finance" className="mt-1.5" /></div>
                                <div><label className="text-sm font-medium">Course Code</label><Input placeholder="e.g. FI 801" className="mt-1.5" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-sm font-medium">Credits</label><Input type="number" placeholder="3" className="mt-1.5" /></div>
                                    <div><label className="text-sm font-medium">Program</label><Input placeholder="e.g. PGP" className="mt-1.5" /></div>
                                </div>
                                <Button className="w-full bg-navy hover:bg-navy-light" onClick={() => setUploadOpen(false)}>Submit Course</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger asChild><Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Syllabus</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Edit Syllabus</DialogTitle></DialogHeader>
                            <div className="space-y-4 mt-2">
                                <div><label className="text-sm font-medium">Select Course</label><Input placeholder="Search course..." className="mt-1.5" /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-sm font-medium">Week Number</label><Input type="number" placeholder="1" className="mt-1.5" /></div>
                                    <div><label className="text-sm font-medium">Topic</label><Input placeholder="Updated topic" className="mt-1.5" /></div>
                                </div>
                                <Button className="w-full bg-navy hover:bg-navy-light" onClick={() => setEditOpen(false)}>Save Changes</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Analytics */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-px w-6 bg-teal" />
                    <h2 className="text-xl font-bold">Analytics Dashboard</h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 px-5 py-3 border-b flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold">Most Viewed Courses</h3>
                        </div>
                        <div className="p-5">
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analytics.mostViewedCourses} layout="vertical" margin={{ left: 10 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                        <XAxis type="number" tick={{ fontSize: 11 }} />
                                        <YAxis type="category" dataKey="title" width={120} tick={{ fontSize: 10 }} />
                                        <Tooltip />
                                        <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                                            {analytics.mostViewedCourses.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 px-5 py-3 border-b flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold">Resource Downloads</h3>
                        </div>
                        <div className="p-5">
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analytics.resourceDownloads}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                        <XAxis dataKey="month" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="downloads" stroke="#18838a" strokeWidth={2.5} dot={{ fill: "#18838a", r: 3.5 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 border rounded-lg overflow-hidden">
                        <div className="bg-muted/50 px-5 py-3 border-b flex items-center gap-2">
                            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-semibold">Cross-Program Enrollment Heatmap</h3>
                        </div>
                        <div className="p-5 overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-3 text-left text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Program</th>
                                        {heatSkills.map((s) => <th key={s} className="p-3 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{s}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {programs.map((prog) => (
                                        <tr key={prog} className="border-t">
                                            <td className="p-3 text-sm font-semibold">{prog}</td>
                                            {heatSkills.map((skill) => {
                                                const entry = analytics.enrollmentHeatmap.find((h) => h.program === prog && h.skill === skill)
                                                return <HeatmapCell key={skill} value={entry?.count || 0} max={maxHeat} />
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}
