import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
    return (
        <footer className="bg-navy text-white">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-7 h-7 rounded bg-white/15 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold">Knowledge Portal</span>
                        </div>
                        <p className="text-[13px] text-white/50 leading-relaxed">
                            An institutional platform for academic excellence, knowledge sharing, and curriculum transparency.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-4">Academics</h3>
                        <ul className="space-y-2.5">{[
                            { label: "Programs", href: "/programs" },
                            { label: "Course Catalog", href: "/courses" },
                            { label: "Faculty Directory", href: "/faculty" },
                            { label: "Skill Map", href: "/skills" },
                        ].map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="text-[13px] text-white/60 hover:text-white transition-colors">{l.label}</Link>
                            </li>
                        ))}</ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-4">Resources</h3>
                        <ul className="space-y-2.5">{[
                            "Exam Archives", "Lecture Recordings", "Research Publications", "Student Handbook",
                        ].map((l) => (
                            <li key={l}>
                                <span className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer">{l}</span>
                            </li>
                        ))}</ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-4">Policies</h3>
                        <ul className="space-y-2.5">{[
                            "Academic Integrity", "Privacy Policy", "Terms of Use", "Accessibility",
                        ].map((l) => (
                            <li key={l}>
                                <span className="text-[13px] text-white/60 hover:text-white transition-colors cursor-pointer">{l}</span>
                            </li>
                        ))}</ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-white/40">
                        © {new Date().getFullYear()} Institutional Knowledge Portal. Built for academic excellence.
                    </p>
                    <div className="flex items-center gap-4 text-[11px] text-white/40">
                        <span>Next.js</span>
                        <span>·</span>
                        <span>Open Source</span>
                        <span>·</span>
                        <span>MIT License</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
