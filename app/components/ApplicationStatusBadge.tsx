import { Badge } from "@/components/ui/badge"
import { type ApplicationStatus } from "@/lib/types/applications"

export const applicationStatusStyles: Record<ApplicationStatus, string> = {
    Applied: "bg-[#6c5df9]/10 text-[#6c5df9]",
    "Under Review": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Shortlisted: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    Rejected: "bg-red-500/10 text-red-600 dark:text-red-400",
    Offered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

// Tinted status pill for an application (seeker + recruiter tables).
export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
    return (
        <Badge variant="outline" className={`border-transparent ${applicationStatusStyles[status]}`}>
            {status}
        </Badge>
    )
}
