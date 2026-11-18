"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/api/jobs"
import { type NewJobData } from "@/lib/types/jobs"
import { JOB_CATEGORIES, JOB_TYPES, SALARY_FREQUENCIES } from "@/lib/constants/jobs"
import { toast } from "@/components/ui/toast"
import { FormField } from "@/app/components/FormField"
import { FormSection } from "@/app/components/FormSection"
import { PageHeader } from "@/app/components/PageHeader"
import { useSession } from "@/lib/auth-client"

const initialData: NewJobData = {
    title: "",
    company: "",
    recruiterId: "",
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
    const { data: session } = useSession()
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
        const jobData = {
            ...form,
            recruiterId: session?.user?.id || "",
        }

        const result = await createJob(jobData)

        
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
            <PageHeader
                breadcrumb={[
                    { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
                    { label: "Create New Listing" },
                ]}
                title="Post a New Job"
                description="Fill in the position specifications to attract qualified talent across our network."
            />

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                {/* 1. Basic Information */}
                <FormSection title="1. Basic Information">
                    <FormField label="Job Title *" htmlFor="title">
                        <Input
                            id="title"
                            name="title"
                            placeholder="Frontend Developer"
                            required
                            value={form.title}
                            onChange={setField("title")}
                        />
                    </FormField>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField label="Company Name *" htmlFor="company">
                            <Input
                                id="company"
                                name="company"
                                placeholder="Your company name"
                                required
                                value={form.company}
                                onChange={setField("company")}
                            />
                        </FormField>

                        <FormField label="Job Category *" htmlFor="category">
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
                                    {JOB_CATEGORIES.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </div>

                    <FormField label="Job Type *">
                        <div className="flex flex-wrap gap-2">
                            {JOB_TYPES.map((type) => (
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
                    </FormField>
                </FormSection>

                {/* 2. Location, Compensation & Timeline */}
                <FormSection title="2. Location, Compensation &amp; Timeline">
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
                        <FormField
                            label={<>Job Location <span className="text-[10px]">(Required)</span></>}
                            htmlFor="location"
                        >
                            <Input
                                id="location"
                                name="location"
                                placeholder="New York, USA"
                                required
                                value={form.location}
                                onChange={setField("location")}
                            />
                        </FormField>

                        <FormField label="Application Deadline" htmlFor="deadline">
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={form.deadline}
                                onChange={setField("deadline")}
                            />
                        </FormField>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <FormField label="Min Salary / Rate" htmlFor="minSalary">
                            <Input
                                id="minSalary"
                                name="minSalary"
                                type="number"
                                min="0"
                                placeholder="25"
                                value={form.minSalary}
                                onChange={setField("minSalary")}
                            />
                        </FormField>

                        <FormField label="Max Salary / Rate" htmlFor="maxSalary">
                            <Input
                                id="maxSalary"
                                name="maxSalary"
                                type="number"
                                min="0"
                                placeholder="40"
                                value={form.maxSalary}
                                onChange={setField("maxSalary")}
                            />
                        </FormField>

                        <FormField label="Frequency" htmlFor="salaryFrequency">
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
                                    {SALARY_FREQUENCIES.map((frequency) => (
                                        <SelectItem key={frequency} value={frequency}>
                                            {frequency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </div>
                </FormSection>

                {/* 3. Responsibilities & Requirements */}
                <FormSection title="3. Responsibilities &amp; Requirements">
                    <FormField label="Key Responsibilities *" htmlFor="responsibilities">
                        <Textarea
                            id="responsibilities"
                            name="responsibilities"
                            placeholder="Describe the day-to-day work and what the person will own."
                            rows={5}
                            required
                            value={form.responsibilities}
                            onChange={setField("responsibilities")}
                        />
                    </FormField>

                    <FormField label="Qualifications &amp; Requirements *" htmlFor="requirements">
                        <Textarea
                            id="requirements"
                            name="requirements"
                            placeholder={"• 3+ years of experience with React and TypeScript\n• Solid understanding of DOM performance\n• Experience partnering closely with product teams"}
                            rows={5}
                            required
                            value={form.requirements}
                            onChange={setField("requirements")}
                        />
                    </FormField>
                </FormSection>
                <section>
                    <Button type="submit" variant="accent">
                        Publish Job
                    </Button>
                </section>
            </form>
        </div>
    )
}
