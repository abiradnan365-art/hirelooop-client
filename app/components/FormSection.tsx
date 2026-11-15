import type { ReactNode } from "react"

type FormSectionProps = {
    title: string
    children: ReactNode
}

// Numbered card section of a form (the Figma form layout:
// "1. Basic Information", "2. Location, Compensation & Timeline", …).
export function FormSection({ title, children }: FormSectionProps) {
    return (
        <section className="rounded-xl border bg-card p-6">
            <h2 className="text-sm font-medium">{title}</h2>
            <div className="mt-5 flex flex-col gap-4">{children}</div>
        </section>
    )
}
