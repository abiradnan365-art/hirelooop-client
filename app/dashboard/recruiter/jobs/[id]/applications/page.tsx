import { notFound } from "next/navigation"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getJobs } from "@/lib/api/jobs"
import { getApplicationsByJob } from "@/lib/api/applications"
import { formatTimeAgo } from "@/lib/utils/time"
import { PageHeader } from "@/app/components/PageHeader"
import { ApplicationStatusSelect } from "@/app/components/ApplicationStatusSelect"

const headClass = "text-[11px] tracking-wider uppercase"

export default async function JobApplicationsPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    // Job context for the header — also 404s on unknown ids.
    const jobs = await getJobs()
    const job = jobs.find((j) => j._id === id)
    if (!job) notFound()

    const applications = await getApplicationsByJob(id)

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
            <PageHeader
                breadcrumb={[
                    { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
                    { label: job.title },
                    { label: "Applications" },
                ]}
                title="Job Applications"
                description={`Review applicants for "${job.title}" and update their status.`}
            />

            {/* Applicants table (per Project requirements.md:
                Applicant Name · Email · Date Applied · Resume link · Status) */}
            <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
                {applications.length === 0 ? (
                    <p className="p-10 text-center text-sm text-muted-foreground">
                        No applications yet for this job.
                    </p>
                ) : (
                    <Table className="min-w-160">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className={headClass}>Applicant Name</TableHead>
                                <TableHead className={`${headClass} hidden md:table-cell`}>Email</TableHead>
                                <TableHead className={`${headClass} hidden lg:table-cell`}>Date Applied</TableHead>
                                <TableHead className={`${headClass} hidden sm:table-cell`}>Resume</TableHead>
                                <TableHead className={headClass}>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((application) => (
                                <TableRow key={application._id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {application.applicantName ?? "Unnamed applicant"}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {application.email}
                                    </TableCell>
                                    <TableCell className="hidden lg:table-cell whitespace-nowrap">
                                        {formatTimeAgo(application.appliedAt)}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {application.resumeUrl ? (
                                            <a
                                                href={application.resumeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline underline-offset-2 hover:text-foreground"
                                            >
                                                View
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {/* TODO: wire a client wrapper that PATCHes
                                            /applications/:id with the new status
                                            (functions can't be passed from this
                                            server component into the select). */}
                                        <ApplicationStatusSelect  applicationId={application._id} value={application.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    )
}
