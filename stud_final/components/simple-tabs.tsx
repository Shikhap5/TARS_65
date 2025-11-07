"use client"

import { type ReactNode, useState } from "react"

interface Tab {
  value: string
  label: string
  content: ReactNode
}

interface SimpleTabsProps {
  tabs: Tab[]
  defaultValue?: string
}

export function SimpleTabs({ tabs, defaultValue }: SimpleTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value || "")

  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-border mb-6 overflow-x-auto flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.value
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.value === activeTab)?.content}</div>
    </div>
  )
}
