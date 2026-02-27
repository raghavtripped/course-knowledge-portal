"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sun, Moon, Menu, ChevronRight } from "lucide-react"

const navItems = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Courses", href: "/courses" },
    { label: "Faculty", href: "/faculty" },
    { label: "Skills", href: "/skills" },
    { label: "Admin Preview", href: "/admin-preview" },
]

export function Navbar() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <header className="sticky top-0 z-50">
            {/* Top institutional bar */}
            <div className="bg-navy text-white">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                    <div className="flex items-center justify-between h-14">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded bg-white/15 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                            </div>
                            <div className="leading-tight">
                                <span className="text-[15px] font-semibold tracking-tight block">Knowledge Portal</span>
                                <span className="text-[10px] text-white/60 uppercase tracking-[0.15em] font-medium">Institutional Open Courseware</span>
                            </div>
                        </Link>

                        <div className="flex items-center gap-1">
                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                    aria-label="Toggle theme"
                                >
                                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                </button>
                            )}
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild className="md:hidden">
                                    <button className="p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                                        <Menu className="h-5 w-5" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-72 border-l-0">
                                    <div className="mt-8 space-y-1">
                                        {navItems.map((item) => {
                                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setOpen(false)}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-colors ${isActive
                                                            ? "bg-navy text-white font-medium"
                                                            : "text-foreground hover:bg-muted"
                                                        }`}
                                                >
                                                    {item.label}
                                                    <ChevronRight className="h-4 w-4 opacity-40" />
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation bar */}
            <nav className="hidden md:block border-b bg-background/95 backdrop-blur-sm">
                <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                    <div className="flex items-center gap-0 h-11">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 h-full flex items-center text-[13px] font-medium transition-colors ${isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-crimson rounded-t" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </nav>
        </header>
    )
}
