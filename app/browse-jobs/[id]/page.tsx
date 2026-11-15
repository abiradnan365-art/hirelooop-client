import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Banknote, Bookmark, Briefcase, CalendarDays, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getJobs } from "@/lib/api/jobs"
import { formatDate, formatCompensation } from "@/lib/utils/jobs"

// Split a multi-line form textarea into clean list items
// (strips bullet markers the recruiter may have typed).
const toLines = (text: string) =>
    text
        .split("\n")
        .map((line) => line.replace(/^[•\-*]\s*/, "").trim())
        .filter(Boolean)

// Small labelled tile used in the bento info grid.
function InfoTile({ icon: Icon, label, value }: { icon: typeof Banknote; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#6c5df9]/10 text-[#6c5df9]">
                <Icon className="size-4" />
            </span>
            <div className="min-w-0">
                <p className="text-[10px] tracking-wider uppercase text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-semibold">{value}</p>
            </div>
        </div>
    )
}

// Violet-dot bullet list (per the Figma list items).
function BulletList({ items }: { items: string[] }) {
    return (
        <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground marker:text-[#6c5df9]">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    )
}

const JobDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const jobs = await getJobs();
    const job = jobs.find((job) => job._id === id);

    if (!job) notFound();

    const responsibilities = toLines(job.responsibilities)
    const requirements = toLines(job.requirements)

    return (
        <div className="dark min-h-svh bg-[#04050a] text-foreground">
            <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
                <Link
                    href="/browse-jobs"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Back to Jobs
                </Link>

                {/* Header card: title + company + apply actions (Figma: Header Section) */}
                <div className="mt-4 flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#6c5df9]/20 bg-gradient-to-br from-[#6c5df9]/15 via-card to-card p-6">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">{job.title}</h1>
                        <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                            Posted {job.postedAt} · {job.applicants} Candidates
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* TODO: wire up to the save-job flow */}
                        <Button variant="outline" size="icon" aria-label="Save job" title="Save job">
                            <Bookmark />
                        </Button>
                        {/* TODO: wire up to the apply flow */}
                        <Button variant="accent">Apply Now</Button>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
                    <main className="flex flex-col gap-6">
                        {/* Bento info grid (Figma: Salary / Location / Job Type / …) */}
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <InfoTile icon={Banknote} label="Salary Range" value={formatCompensation(job)} />
                            <InfoTile
                                icon={MapPin}
                                label="Location"
                                value={job.remote ? `Remote (${job.location})` : job.location}
                            />
                            <InfoTile icon={Briefcase} label="Job Type" value={job.type} />
                            <InfoTile icon={Users} label="Applicants" value={`${job.applicants} Candidates`} />
                        </div>

                        {/* Content sections (Figma: Job Description / Responsibilities / Requirements) */}
                        <div className="rounded-xl border bg-card p-6">
                            {responsibilities.length > 0 && (
                                <section>
                                    <h2 className="text-base font-semibold">Key Responsibilities</h2>
                                    <BulletList items={responsibilities} />
                                </section>
                            )}

                            {responsibilities.length > 0 && requirements.length > 0 && (
                                <Separator className="my-6" />
                            )}

                            {requirements.length > 0 && (
                                <section>
                                    <h2 className="text-base font-semibold">Qualifications &amp; Requirements</h2>
                                    <BulletList items={requirements} />
                                </section>
                            )}

                            {responsibilities.length === 0 && requirements.length === 0 && (
                                <p className="text-sm text-muted-foreground">
                                    No details provided for this position yet.
                                </p>
                            )}
                        </div>
                    </main>

                    {/* Sidebar (Figma: Company Overview) */}
                    <aside className="h-fit rounded-xl border bg-card p-5">
                        <h2 className="text-sm font-semibold">Company Overview</h2>

                        <div className="mt-4 flex items-center gap-3">
                            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#6c5df9]/10 text-lg font-semibold text-[#6c5df9]">
                                {job.company.charAt(0).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{job.company}</p>
                                <p className="text-xs text-muted-foreground">{job.category}</p>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="flex flex-col gap-3 text-sm">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
                                    Applicants
                                </span>
                                <span>{job.applicants} Candidates</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-[10px] tracking-wider uppercase text-muted-foreground">
                                    Deadline
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="size-3.5 text-muted-foreground" />
                                    {formatDate(job.deadline)}
                                </span>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        {/* TODO: link to the company website once stored */}
                        <Button variant="outline" className="w-full">
                            Visit Website
                        </Button>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
