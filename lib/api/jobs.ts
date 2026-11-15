import { type JobRow, type NewJobData } from "@/lib/types/jobs"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Manage Jobs table
export const getJobs = async (query = ''): Promise<JobRow[]> => {
    const res = await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json()
}

// Post a New Job form
export const createJob = async (data: NewJobData) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    })
    return res.json()
}

// DeleteJobDialog
export const deleteJob = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
    })
    return res.json()
}
