import Link from "next/link"
import type { ReactNode } from "react"

export type Crumb = {
    label: string
    // Omit href for the current page (rendered as plain text).
    href?: string
}

type PageHeaderProps = {
    breadcrumb: Crumb[]
    title: string
    description?: string
    /** Optional right-side action (button, link, …). */
    action?: ReactNode
}

// Breadcrumb trail + title + subtitle + optional action, shared by dashboard
// pages (the Figma "Top Bar / Executive Navigation Trail" header pattern).
export function PageHeader({ breadcrumb, title, description, action }: PageHeaderProps) {
    return (
        <>
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                {breadcrumb.map((crumb, index) => (
                    <span key={crumb.label} className="flex items-center gap-2">
                        {index > 0 && <span aria-hidden>/</span>}
                        {crumb.href ? (
                            <Link href={crumb.href} className="hover:text-foreground">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="text-foreground">{crumb.label}</span>
                        )}
                    </span>
                ))}
            </nav>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                    {description && (
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
                {action}
            </div>
        </>
    )
}
