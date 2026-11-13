"use client"

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/actions/jobs"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

// Matches the Figma "Post a New Job" screen: Job Type chips + salary frequency options.
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const

const jobCategories = [
    "Engineering & Tech",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Operations",
    "Finance",
    "Other",
]

const salaryFrequencies = ["per hour", "per day", "per week", "per month", "per year"]

// One flat object; everything is a string (except the remote toggle) so it's
// trivial to read, log, and later send to the API as-is.
export type NewJobData = {
    title: string
    company: string
    category: string
    type: string
    remote: boolean
    location: string
    deadline: string
    minSalary: string
    maxSalary: string
    salaryFrequency: string
    responsibilities: string
    requirements: string
    status: "Active" | "Expired"
    applicants: number
}

const initialData: NewJobData = {
    title: "",
    company: "",
    category: "",
    type: "Full-time",
    remote: false,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    salaryFrequency: "per hour",
    responsibilities: "",
    requirements: "",
    status: "Active",
    applicants: 0,

}

export default function NewJobPage() {
    const router = useRouter()
    const [form, setForm] = useState<NewJobData>(initialData)

    // Works for every text/number/date field.
    const setField = (field: keyof NewJobData) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }))
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        // TODO: send `form` to the API (POST /api/jobs) and redirect to Manage Jobs.
        console.log("[recruiter] new job payload:", form)

        const result = await createJob(form)
        if (result.insertedId) {
            console.log("[recruiter] new job result:", result)
            toast.add({
                title: "Job Created",
                description: "Job created successfully.",
            })
        }
        router.push("/dashboard/recruiter/jobs")

    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-6 md:px-6">
            {/* Breadcrumb + heading, per the Figma header */}
            <nav className="flex items-center gap-2 text-xs text-muted-foreground">
                <Link href="/dashboard/recruiter/jobs" className="hover:text-foreground">
                    Manage Jobs
                </Link>
                <span aria-hidden>/</span>
                <span className="text-foreground">Create New Listing</span>
            </nav>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Post a New Job</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Fill in the position specifications to attract qualified talent across
                            our network.
                        </p>
                    </div>

                </div>

                {/* 1. Basic Information */}
                <section className="rounded-xl border bg-card p-6">
                    <h2 className="text-sm font-medium">1. Basic Information</h2>

                    <div className="mt-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="title" className="text-xs text-muted-foreground">
                                Job Title *
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Frontend Developer"
                                required
                                value={form.title}
                                onChange={setField("title")}
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="company" className="text-xs text-muted-foreground">
                                    Company Name *
                                </Label>
                                <Input
                                    id="company"
                                    name="company"
                                    placeholder="Your company name"
                                    required
                                    value={form.company}
                                    onChange={setField("company")}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="category" className="text-xs text-muted-foreground">
                                    Job Category *
                                </Label>
                                <Select
                                    value={form.category}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({ ...prev, category: value as string }))
                                    }
                                >
                                    <SelectTrigger id="category" className="h-9 w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jobCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label className="text-xs text-muted-foreground">Job Type *</Label>
                            <div className="flex flex-wrap gap-2">
                                {jobTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        aria-pressed={form.type === type}
                                        onClick={() => setForm((prev) => ({ ...prev, type }))}
                                        className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${form.type === type
                                            ? "border-[#6c5df9] bg-[#6c5df9] text-white"
                                            : "border-border text-muted-foreground hover:bg-muted"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Location, Compensation & Timeline */}
                <section className="rounded-xl border bg-card p-6">
                    <h2 className="text-sm font-medium">2. Location, Compensation &amp; Timeline</h2>

                    <div className="mt-5 flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 p-4">
                            <div>
                                <p className="text-sm font-medium">Remote Work Allowed</p>
                                <p className="text-xs text-muted-foreground">
                                    Enable worldwide or distributed candidate applications
                                </p>
                            </div>
                            <Switch
                                checked={form.remote}
                                onCheckedChange={(checked) =>
                                    setForm((prev) => ({ ...prev, remote: checked }))
                                }
                                aria-label="Remote work allowed"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="location" className="text-xs text-muted-foreground">
                                    Job Location <span className="text-[10px]">(Required)</span>
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="New York, USA"
                                    required
                                    value={form.location}
                                    onChange={setField("location")}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="deadline" className="text-xs text-muted-foreground">
                                    Application Deadline
                                </Label>
                                <Input
                                    id="deadline"
                                    name="deadline"
                                    type="date"
                                    value={form.deadline}
                                    onChange={setField("deadline")}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="minSalary" className="text-xs text-muted-foreground">
                                    Min Salary / Rate
                                </Label>
                                <Input
                                    id="minSalary"
                                    name="minSalary"
                                    type="number"
                                    min="0"
                                    placeholder="25"
                                    value={form.minSalary}
                                    onChange={setField("minSalary")}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="maxSalary" className="text-xs text-muted-foreground">
                                    Max Salary / Rate
                                </Label>
                                <Input
                                    id="maxSalary"
                                    name="maxSalary"
                                    type="number"
                                    min="0"
                                    placeholder="40"
                                    value={form.maxSalary}
                                    onChange={setField("maxSalary")}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label htmlFor="salaryFrequency" className="text-xs text-muted-foreground">
                                    Frequency
                                </Label>
                                <Select
                                    value={form.salaryFrequency}
                                    onValueChange={(value) =>
                                        setForm((prev) => ({ ...prev, salaryFrequency: value as string }))
                                    }
                                >
                                    <SelectTrigger id="salaryFrequency" className="h-9 w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {salaryFrequencies.map((frequency) => (
                                            <SelectItem key={frequency} value={frequency}>
                                                {frequency}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Responsibilities & Requirements */}
                <section className="rounded-xl border bg-card p-6">
                    <h2 className="text-sm font-medium">3. Responsibilities &amp; Requirements</h2>

                    <div className="mt-5 flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="responsibilities" className="text-xs text-muted-foreground">
                                Key Responsibilities *
                            </Label>
                            <Textarea
                                id="responsibilities"
                                name="responsibilities"
                                placeholder="Describe the day-to-day work and what the person will own."
                                rows={5}
                                required
                                value={form.responsibilities}
                                onChange={setField("responsibilities")}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="requirements" className="text-xs text-muted-foreground">
                                Qualifications &amp; Requirements *
                            </Label>
                            <Textarea
                                id="requirements"
                                name="requirements"
                                placeholder={"• 3+ years of experience with React and TypeScript\n• Solid understanding of DOM performance\n• Experience partnering closely with product teams"}
                                rows={5}
                                required
                                value={form.requirements}
                                onChange={setField("requirements")}
                            />
                        </div>
                    </div>
                </section>
                <section>
                    <Button type="submit" className="bg-[#6c5df9] text-white hover:bg-[#7d6efc]">
                        Publish Job
                    </Button>
                </section>
            </form>
        </div>
    )
}
