"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterGroup, type FilterOption } from "@/app/components/FilterGroup"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/jobs"
import { useRouter, useSearchParams } from "next/navigation"

const remoteFilter: FilterOption[] = [{ label: "Remote only", value: "true" }]

// Sort options mapped to sortable NewJobData fields.
const sortOptions = [
    { label: "Most Recent", value: "recent" },
    { label: "Highest Salary", value: "salary" },
    { label: "Most Applicants", value: "applicants" },
]

type SearchBarProps = {
    /** Initial value from the URL, if any. */
    defaultValue?: string
}

// Search input + "Search Jobs" button (Figma: Section - Search & Quick Filters).
export function SearchBar({ defaultValue }: SearchBarProps) {

    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        console.log(data)
        const search = data.searchField as string;

        const params = new URLSearchParams();
        params.set('search', search as string);

        router.push(`/browse-jobs?${params.toString()}`)


    }
    return (
        <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={handleSubmit}

        >
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    name="searchField"
                    defaultValue={defaultValue}
                    placeholder="Search by job title, keywords..."
                    className="h-11 pl-9"
                />
            </div>
            <Button type="submit" variant="accent" className="h-11">
                Search Jobs
            </Button>
        </form>
    )
}

// Checkbox filter sidebar (Figma: Aside - Sidebar Filters).
export function FilterSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleFilterChange = (
        key: string,
        value: string,
        checked: boolean
    ) => {
        const params = new URLSearchParams(searchParams.toString())

        if (checked) {
            params.set(key, value)
        } else {
            params.delete(key)
        }

        router.push(`/browse-jobs?${params.toString()}`)
    }

    return (
        <aside className="h-fit rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold">Filters</h2>

            <div className="mt-5 flex flex-col gap-6">

                <FilterGroup
                    title="type"
                    mode="single"
                    options={JOB_TYPES.map((type) => ({
                        label: type,
                        value: type
                    }))}
                    onToggle={(value, checked) =>
                        handleFilterChange("type", value, checked)
                    }
                />

                <FilterGroup
                    title="Category"
                    mode="single"
                    options={JOB_CATEGORIES.map((category) => ({
                        label: category,
                        value: category
                    }))}
                    onToggle={(value, checked) =>
                        handleFilterChange("category", value, checked)
                    }
                />

                <FilterGroup
                    title="Remote"
                    options={remoteFilter}
                    onToggle={(value, checked) =>
                        handleFilterChange("remote", value, checked)
                    }
                />

            </div>
        </aside>
    )
}

// "Sort by" dropdown next to the results heading (Figma: Sort by: Most Recent).
export function SortSelect() {
    return (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Sort by:
            <Select
                defaultValue="recent"
                onValueChange={() => {
                    // TODO: push ?sort=… to the URL and re-fetch.
                }}
            >
                <SelectTrigger className="w-40">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
