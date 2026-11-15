// Option lists tied to NewJobData fields, shared by the Post a Job form
// and the Browse Jobs filters so both always offer the same values.

// NewJobData["type"]
export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"] as const

// NewJobData["category"]
export const JOB_CATEGORIES = [
    "Engineering & Tech",
    "Design",
    "Product",
    "Marketing",
    "Sales",
    "Operations",
    "Finance",
    "Other",
]

// NewJobData["salaryFrequency"]
export const SALARY_FREQUENCIES = ["per hour", "per day", "per week", "per month", "per year"]
