"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

const views = ["Active", "Archived"] as const

type ViewToggleProps = {
    /** Called when the user switches views; wire to the data filter later. */
    onChange?: (view: (typeof views)[number]) => void
}

// Active / Archived segmented control (Figma: header section of My Applications).
export function ViewToggle({ onChange }: ViewToggleProps) {
    const [view, setView] = useState<(typeof views)[number]>("Active")

    return (
        <div className="inline-flex rounded-lg border bg-muted p-0.5">
            {views.map((name) => (
                <Button
                    key={name}
                    type="button"
                    aria-pressed={view === name}
                    variant={view === name ? "secondary" : "ghost"}
                    className="h-7 px-3 text-xs"
                    onClick={() => {
                        setView(name)
                        onChange?.(name)
                        // TODO: re-fetch /applications filtered by archived state.
                    }}
                >
                    {name}
                </Button>
            ))}
        </div>
    )
}
