"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateApplicationStatus } from "@/lib/actions/applications"
import { type ApplicationStatus } from "@/lib/types/applications"
import { useState } from "react"

// Canonical status flow per Project requirements.md.
const STATUSES: ApplicationStatus[] = [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Rejected",
    "Offered",
]

type ApplicationStatusSelectProps = {
    applicationId: string
    /** Current status — used as the initial value. */
    value: ApplicationStatus
    /** Called with the newly picked status; wire the DB update here. */
    onStatusChange?: (status: ApplicationStatus) => void
}

// Per-applicant status dropdown (recruiter applications table).
// Uncontrolled on purpose: the picker updates locally until the consumer
// wires onStatusChange to the API.
export function ApplicationStatusSelect({ value, applicationId, onStatusChange }: ApplicationStatusSelectProps) {
    const [status, setStatus] = useState<ApplicationStatus>(value)

    const handleStatusChange = async (next: ApplicationStatus) => {
        const prev = status

        setStatus(next) // optimistic update

        try {
            const result = await updateApplicationStatus(applicationId, { status: next })
            console.log("Updated application status:", result)
            onStatusChange?.(next)
        } catch (err) {
            console.error(err)
            setStatus(prev) // fail hole rollback
        }
    }

    return (
        <Select
            value={status}
            onValueChange={(next) => handleStatusChange(next as ApplicationStatus)}
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
