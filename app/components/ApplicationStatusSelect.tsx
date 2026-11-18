"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { type ApplicationStatus } from "@/lib/types/applications"

// Canonical status flow per Project requirements.md.
const STATUSES: ApplicationStatus[] = [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Rejected",
    "Offered",
]

type ApplicationStatusSelectProps = {
    /** Current status — used as the initial value. */
    value: ApplicationStatus
    /** Called with the newly picked status; wire the DB update here. */
    onStatusChange?: (status: ApplicationStatus) => void
}

// Per-applicant status dropdown (recruiter applications table).
// Uncontrolled on purpose: the picker updates locally until the consumer
// wires onStatusChange to the API.
export function ApplicationStatusSelect({ value, onStatusChange }: ApplicationStatusSelectProps) {
    return (
        <Select
            defaultValue={value}
            onValueChange={(next) => onStatusChange?.(next as ApplicationStatus)}
        >
            <SelectTrigger size="sm" className="w-36" aria-label="Application status">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                        {status}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
