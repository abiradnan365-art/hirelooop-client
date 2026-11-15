"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterGroup, type FilterOption } from "@/app/components/FilterGroup"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/constants/jobs"

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
    return (
        <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
                event.preventDefault()
                // TODO: push the search term to the URL (?q=…) and re-fetch.
            }}
        >
            <div className="relative flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    name="q"
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
    return (
        <aside className="h-fit rounded-xl border bg-card p-5">
            <h2 className="text-sm font-semibold">Filters</h2>

            <div className="mt-5 flex flex-col gap-6">
                <FilterGroup
                    title="Job Type"
                    mode="single"
                    options={JOB_TYPES.map((type) => ({ label: type, value: type }))}
                    onToggle={() => {
                        // TODO: sync the picked type to the URL (?type=…) and re-fetch.
                    }}
                />
                <FilterGroup
                    title="Category"
                    mode="single"
                    options={JOB_CATEGORIES.map((category) => ({ label: category, value: category }))}
                    onToggle={() => {
                        // TODO: sync the picked category to the URL (?category=…) and re-fetch.
                    }}
                />
                <FilterGroup
                    title="Remote"
                    options={remoteFilter}
                    onToggle={() => {
                        // TODO: sync to the URL (?remote=true) and re-fetch.
                    }}
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
