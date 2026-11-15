"use client"

import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"

export type FilterOption = {
    label: string
    value: string
}

type FilterGroupProps = {
    title: string
    options: FilterOption[]
    /** "multiple" renders checkbox rows; "single" renders radio-like rows where
     * only one option can be selected at a time (re-click clears it).
     * Default: "multiple". */
    mode?: "multiple" | "single"
    /** Toggle handler; optional so selection stays local until wired up. */
    onToggle?: (value: string, checked: boolean) => void
}

// Titled option group used in filter sidebars (Figma: "Job Type", "Category", …).
export function FilterGroup({ title, options, mode = "multiple", onToggle }: FilterGroupProps) {
    // Single mode only: keeps the picked option local until the consumer wires up.
    const [selected, setSelected] = useState<string | null>(null)

    const pick = (value: string) => {
        const next = selected === value ? null : value
        setSelected(next)
        if (next) {
            onToggle?.(next, true)
        } else if (selected) {
            onToggle?.(selected, false)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                {title}
            </h3>

            {mode === "single" ? (
                <div className="flex flex-col gap-2.5">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            aria-pressed={selected === option.value}
                            onClick={() => pick(option.value)}
                            className="flex items-center gap-2 text-left text-sm"
                        >
                            <span
                                className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                    selected === option.value ? "border-[#6c5df9]" : "border-input"
                                }`}
                            >
                                {selected === option.value && (
                                    <span className="size-2 rounded-full bg-[#6c5df9]" />
                                )}
                            </span>
                            {option.label}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center gap-2 text-sm">
                            <Checkbox
                                onCheckedChange={(checked) =>
                                    onToggle?.(option.value, checked === true)
                                }
                                className="data-checked:border-[#6c5df9] data-checked:bg-[#6c5df9]"
                            />
                            <span className="cursor-pointer">{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
