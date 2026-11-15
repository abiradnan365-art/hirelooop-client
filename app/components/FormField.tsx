import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"

type FormFieldProps = {
    /** Label text (e.g. "Job Title *" or "Job Location (Required)"). */
    label: ReactNode
    htmlFor?: string
    /** The control: Input, Textarea, Select, … */
    children: ReactNode
}

// Label + control wrapper shared across form pages.
export function FormField({ label, htmlFor, children }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={htmlFor} className="text-xs text-muted-foreground">
                {label}
            </Label>
            {children}
        </div>
    )
}
