// "use client"

// import { useRef, useState } from "react"
// // import * as XLSX from "xlsx"
// // import { CSRCards } from "@/components/ui/csr-cards"
// // import { CSRChart } from "@/components/ui/csr-chart"
// import { CSRTable, type CSRRow } from "@/components/ui/csr-table"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Download } from "lucide-react"

// export default function CSRPage() {
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [tableData, setTableData] = useState<CSRRow[] | undefined>(undefined)
//   const [fileName, setFileName] = useState<string | null>(null)

//   // const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0]
//   //   if (!file) return

//   //   setFileName(file.name)
//   //   const reader = new FileReader()

//   //   reader.onload = (event) => {
//   //     const data = new Uint8Array(event.target?.result as ArrayBuffer)
//   //     const workbook = XLSX.read(data, { type: "array" })
//   //     const sheet = workbook.Sheets[workbook.SheetNames[0]]
//   //     const json: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" })

//   //     const mapped: CSRRow[] = json.map((row, idx) => ({
//   //       id: idx + 1,
//   //       customer: row["Customer"] || row["customer"] || "",
//   //       email: row["Email"] || row["email"] || "",
//   //       authenticated: row["Authenticated"] === true || row["authenticated"] === "true" || false,
//   //       count: Number(row["Count"] || row["count"] || 0),
//   //       feedback: row["Feedback"] || row["feedback"] || "",
//   //       documentName: row["DocumentName"] || row["documentName"] || undefined,
//   //       date: row["Date"] || row["date"] || "",
//   //       status: row["Status"] || row["status"] || "",
//   //       rating: Number(row["Rating"] || row["rating"] || 0),
//   //     }))

//   //     setTableData(mapped)
//   //   }

//   //   reader.readAsArrayBuffer(file)
//   //   e.target.value = ""
//   // }

//   const handleExportCSV = () => {
//     const source = tableData ?? []

//     const headers = [
//       "S.N.",
//       "ID",
//       "Customer",
//       "Email",
//       "Authenticated",
//       "Count",
//       "Feedback",
//       "Document Name",
//       "Date",
//       "Status",
//       "Rating",
//     ]

//     const rows = source.map((row, index) => [
//       index + 1,
//       row.id,
//       row.customer,
//       row.email,
//       row.authenticated ? "Verified" : "Unverified",
//       row.count,
//       row.feedback,
//       row.documentName ?? "",
//       row.date,
//       row.status,
//       row.rating,
//     ])

//     const csvContent = [headers, ...rows]
//       .map((row) =>
//         row
//           .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
//           .join(",")
//       )
//       .join("\n")

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//     const url = URL.createObjectURL(blob)

//     const link = document.createElement("a")
//     link.href = url
//     link.setAttribute("download", "customer-satisfaction-report.csv")
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)

//     URL.revokeObjectURL(url)
//   }

//   const handleExportPDF = () => {
//     window.print()
//   }

//   return (
//     <div className="flex flex-1 flex-col">
//       <div className="@container/main flex flex-1 flex-col gap-2">
//         <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

//           <div className="px-8 lg:px-8 flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-semibold">Customer Satisfaction Report</h1>
//               <p className="text-muted-foreground">Overview of customer feedback and satisfaction metrics</p>
//             </div>
//             <div className="flex items-center gap-3">
//               {fileName && (
//                 <span className="text-xs text-muted-foreground truncate max-w-[160px]" title={fileName}>
//                   📄 {fileName}
//                 </span>
//               )}

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="flex items-center gap-2"
//                   >
//                     <Download className="h-4 w-4" />
//                     Export
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={handleExportCSV}>
//                     Export CSV
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={handleExportPDF}>
//                     Export PDF
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               {/* <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".xlsx,.xls"
//                 className="hidden"
//                 onChange={handleUpload}
//               /> */}
//               {/* <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//                   <polyline points="17 8 12 3 7 8"/>
//                   <line x1="12" y1="3" x2="12" y2="15"/>
//                 </svg>
//                 Upload Excel
//               </button> */}
//             </div>
//           </div>

//           {/* <CSRCards /> */}
//           {/* <div className="px-4 lg:px-6">
//             <CSRChart />
//           </div> */}
//           <CSRTable data={tableData} />

//         </div>
//       </div>
//     </div>
//   )
// }










"use client"

import { useMemo, useRef, useState } from "react"
import {
  CSRTable,
  type CSRRow,
  type CSRSortKey,
  type CSRSortDirection,
  type CSRActiveFilters,
  type CSRFilterFieldKey,
  type CSRTextFilter,
  type CSRNumberRangeFilter,
  type CSRDateRangeFilter,
  type CSRRatingFilter,
  csrEmptyFilters,
  csrCountActiveFilters,
} from "@/components/ui/csr-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import { useRef as useRefSidebar } from "react"
import { useEffect } from "react"

// ─── Filter field definitions ─────────────────────────────────────────────────

const FILTER_FIELDS: { key: CSRFilterFieldKey; label: string }[] = [
  { key: "id",            label: "ID"            },
  { key: "customer",      label: "Center Name"   },
  { key: "status",        label: "Status"        },
  { key: "feedback",      label: "Feedback"      },
  { key: "authenticated", label: "Authenticated" },
  { key: "count",         label: "Count"         },
  { key: "date",          label: "Date"          },
  { key: "rating",        label: "Rating"        },
]

// ─── Default data moved here so parent is the single source of truth ─────────
// IMPORTANT: Table UI and Export now both use the same dataset from parent.
const defaultFeedbackData: CSRRow[] = [
  { id: "A1B2C", customer: "DAV School",   email: "dav@example.com",     authenticated: 38, count: 42, feedback: "Excellent prep tools.", documentName: "exam_report_march.pdf",   date: "08 April, 2026", status: "Resolved",    rating: 5 },
  { id: "D3E4F", customer: "ABC Acad",     email: "abc@example.com",     authenticated: 28, count: 28, feedback: "Good analytics, needs customization.", documentName: "analytics_feedback.png", date: "07 April, 2026", status: "Resolved",    rating: 4 },
  { id: "G5H6I", customer: "Prime Inst",   email: "prime@example.com",   authenticated: 10, count: 15, feedback: "Easy and intuitive assessments.", documentName: "satisfaction_report.pdf", date: "06 April, 2026", status: "Resolved",    rating: 5 },
  { id: "J7K8L", customer: "Edu Hub",      email: "eduhub@example.com",  authenticated: 7,  count: 7,  feedback: "Reporting issues, support helping.", documentName: "issue_screenshot.jpg",    date: "05 April, 2026", status: "In Progress", rating: 3 },
  { id: "M9N0P", customer: "Bright Acad",  email: "bright@example.com",  authenticated: 53, count: 63, feedback: "Improved pass rates significantly.", documentName: "pass_rate_report.pdf",    date: "04 April, 2026", status: "Resolved",    rating: 5 },
  { id: "Q1R2S", customer: "NextGen Edu",  email: "nextgen@example.com", authenticated: 10, count: 11, feedback: "Great question variety.", documentName: "put_report.jpg",          date: "03 April, 2026", status: "Resolved",    rating: 4 },
  { id: "T3U4V", customer: "Skill Ctr",    email: "skill@example.com",   authenticated: 3,  count: 3,  feedback: "Batch processing issues.", documentName: "error_log.pdf",           date: "02 April, 2026", status: "Pending",     rating: 2 },
  { id: "W5X6Y", customer: "Demo Ctr",     email: "demo@example.com",    authenticated: 79, count: 89, feedback: "Great support and quality.", documentName: "support_ticket.jpeg",     date: "01 April, 2026", status: "Resolved",    rating: 5 },
]

// ─── Sidebar Filter ───────────────────────────────────────────────────────────

function SidebarFilter({ open, onClose, filters, onApply, onClearAll }: {
  open: boolean; onClose: () => void; filters: CSRActiveFilters
  onApply: (f: CSRActiveFilters) => void; onClearAll: () => void
}) {
  const [draft, setDraft] = useState<CSRActiveFilters>(() => JSON.parse(JSON.stringify(filters)))
  const [expanded, setExpanded] = useState<Partial<Record<CSRFilterFieldKey, boolean>>>({})
  const ref = useRefSidebar<HTMLDivElement>(null)

  useEffect(() => { setDraft(JSON.parse(JSON.stringify(filters))) }, [filters])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose() }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, onClose])

  const toggle = (key: CSRFilterFieldKey) => setExpanded((p) => ({ ...p, [key]: !p[key] }))

  const setText = (key: Extract<CSRFilterFieldKey, "id" | "customer" | "status" | "feedback">, value: string) =>
    setDraft((p) => ({ ...p, text: { ...p.text, [key]: { value } } }))

  // NEW: set min/max for authenticated and count
  const setNumberRange = (key: Extract<CSRFilterFieldKey, "authenticated" | "count">, type: "min" | "max", value: string) =>
    setDraft((p) => ({
      ...p,
      numberRange: {
        ...p.numberRange,
        [key]: {
          ...(p.numberRange[key] ?? {}),
          [type]: value,
        },
      },
    }))

  // NEW: set date from/to
  const setDateRange = (type: "from" | "to", value: string) =>
    setDraft((p) => ({
      ...p,
      dateRange: {
        ...p.dateRange,
        date: {
          ...(p.dateRange.date ?? {}),
          [type]: value,
        },
      },
    }))

  // NEW: set exact rating
  const setRating = (value: string) =>
    setDraft((p) => ({
      ...p,
      rating: {
        ...p.rating,
        rating: { value },
      },
    }))

  const clearField = (key: CSRFilterFieldKey) =>
    setDraft((p) => {
      const n = JSON.parse(JSON.stringify(p)) as CSRActiveFilters

      if (key === "id" || key === "customer" || key === "status" || key === "feedback") {
        delete n.text[key]
      } else if (key === "authenticated" || key === "count") {
        delete n.numberRange[key]
      } else if (key === "date") {
        delete n.dateRange.date
      } else if (key === "rating") {
        delete n.rating.rating
      }

      return n
    })

  const handleApply = () => { onApply(draft); onClose() }
  const handleClearAll = () => { setDraft(csrEmptyFilters()); setExpanded({}); onClearAll() }
  const draftCount = csrCountActiveFilters(draft)

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div ref={ref} className={`fixed top-0 right-0 z-40 h-full w-80 bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Filters</span>
            {draftCount > 0 && <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">{draftCount}</span>}
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {FILTER_FIELDS.map((field) => {
            const isOpen = !!expanded[field.key]

            const hasValue =
              field.key === "id" || field.key === "customer" || field.key === "status" || field.key === "feedback"
                ? !!(draft.text[field.key]?.value?.trim())
                : field.key === "authenticated" || field.key === "count"
                ? !!((draft.numberRange[field.key]?.min ?? "").trim() || (draft.numberRange[field.key]?.max ?? "").trim())
                : field.key === "date"
                ? !!((draft.dateRange.date?.from ?? "").trim() || (draft.dateRange.date?.to ?? "").trim())
                : field.key === "rating"
                ? !!((draft.rating.rating?.value ?? "").trim())
                : false

            return (
              <div key={field.key} className="border-b border-slate-100 last:border-0">
                <div className="flex items-center justify-between px-5 py-3 hover:bg-slate-50">
                  <button
                    type="button"
                    onClick={() => toggle(field.key)}
                    className="flex-1 text-left"
                  >
                    {field.label}
                  </button>
                
                  {hasValue && (
                    <button
                      type="button"
                      onClick={() => clearField(field.key)}
                      className="text-[11px] text-slate-400 hover:text-rose-500"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1">
                    {(field.key === "id" || field.key === "customer" || field.key === "status" || field.key === "feedback") && (
                      <>
                        <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Search</label>
                        <input
                          type="text"
                          value={draft.text[field.key]?.value ?? ""}
                          onChange={(e) => setText(field.key as "id" | "customer" | "status" | "feedback", e.target.value)}
                          placeholder={`Search ${field.label.toLowerCase()}...`}
                          className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                        />
                      </>
                    )}

                    {(field.key === "authenticated" || field.key === "count") && (
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Min</label>
                          <input
                            type="number"
                            value={draft.numberRange[field.key]?.min ?? ""}
                            onChange={(e) => setNumberRange(field.key as "authenticated" | "count", "min", e.target.value)}
                            placeholder="Min"
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Max</label>
                          <input
                            type="number"
                            value={draft.numberRange[field.key]?.max ?? ""}
                            onChange={(e) => setNumberRange(field.key as "authenticated" | "count", "max", e.target.value)}
                            placeholder="Max"
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                      </div>
                    )}

                    {field.key === "date" && (
                      <div className="grid grid-cols-1 gap-2">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">From</label>
                          <input
                            type="date"
                            value={draft.dateRange.date?.from ?? ""}
                            onChange={(e) => setDateRange("from", e.target.value)}
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">To</label>
                          <input
                            type="date"
                            value={draft.dateRange.date?.to ?? ""}
                            onChange={(e) => setDateRange("to", e.target.value)}
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                      </div>
                    )}

                    {field.key === "rating" && (
                      <>
                        <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Exact Rating</label>
                        <select
                          value={draft.rating.rating?.value ?? ""}
                          onChange={(e) => setRating(e.target.value)}
                          className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 bg-white outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                        >
                          <option value="">Select rating</option>
                          <option value="1">1 Star</option>
                          <option value="2">2 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="5">5 Stars</option>
                        </select>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-9 text-xs text-slate-600" onClick={handleClearAll}>Clear All</Button>
          <Button size="sm" className="flex-1 h-9 text-xs bg-rose-500 hover:bg-rose-600 text-white" onClick={handleApply}>Apply Filters</Button>
        </div>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CSRPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [tableData, setTableData] = useState<CSRRow[]>(defaultFeedbackData)
  const [fileName, setFileName] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<CSRActiveFilters>(csrEmptyFilters())
  const [sortKey, setSortKey] = useState<CSRSortKey | null>(null)
  const [sortDirection, setSortDirection] = useState<CSRSortDirection>(null)

  const filterBadgeCount = csrCountActiveFilters(activeFilters)

  const handleSort = (key: CSRSortKey) => {
    if (sortKey !== key) { setSortKey(key); setSortDirection("asc"); return }
    if (sortDirection === "asc") { setSortDirection("desc"); return }
    setSortKey(null); setSortDirection(null)
  }

  // IMPORTANT: Export now always uses the same parent-owned data shown in table.
  const handleExportCSV = () => {
    const source = tableData
    const headers = ["S.N.","ID","Customer","Email","Authenticated","Count","Feedback","Document Name","Date","Status","Rating"]
    const rows = source.map((row, index) => [index + 1, row.id, row.customer, row.email, row.authenticated, row.count, row.feedback, row.documentName ?? "", row.date, row.status, row.rating])
    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url; link.setAttribute("download", "customer-satisfaction-report.csv")
    document.body.appendChild(link); link.click(); document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => window.print()

  // NEW: child row updates flow back to parent to keep export and table in sync
  const handleRemoveDocument = (id: string) => {
    setTableData((prev) => prev.map((row) => (row.id === id ? { ...row, documentName: undefined } : row)))
  }

  // ─── Active filter chips (all types) ────────────────────────────────────────
  const activeFilterChips = useMemo(() => {
    const chips: { id: string; label: string; onRemove: () => void }[] = []

    // text chips
    ;(Object.entries(activeFilters.text) as [keyof CSRActiveFilters["text"], CSRTextFilter][]).forEach(([key, f]) => {
      if (!f || f.value.trim() === "") return
      const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key
      chips.push({
        id: `text-${key}`,
        label: `${label}: "${f.value}"`,
        onRemove: () => {
          const n = JSON.parse(JSON.stringify(activeFilters)) as CSRActiveFilters
          delete n.text[key]
          setActiveFilters(n)
        },
      })
    })

    // number range chips
    ;(Object.entries(activeFilters.numberRange) as [keyof CSRActiveFilters["numberRange"], CSRNumberRangeFilter][]).forEach(([key, f]) => {
      if (!f) return
      const min = f.min?.trim() ?? ""
      const max = f.max?.trim() ?? ""
      if (!min && !max) return
      const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key
      chips.push({
        id: `range-${key}`,
        label: `${label}: ${min || "Any"} - ${max || "Any"}`,
        onRemove: () => {
          const n = JSON.parse(JSON.stringify(activeFilters)) as CSRActiveFilters
          delete n.numberRange[key]
          setActiveFilters(n)
        },
      })
    })

    // date chip
    const dateFilter = activeFilters.dateRange.date
    if (dateFilter && ((dateFilter.from ?? "").trim() !== "" || (dateFilter.to ?? "").trim() !== "")) {
      chips.push({
        id: "date-range",
        label: `Date: ${dateFilter.from || "Any"} → ${dateFilter.to || "Any"}`,
        onRemove: () => {
          const n = JSON.parse(JSON.stringify(activeFilters)) as CSRActiveFilters
          delete n.dateRange.date
          setActiveFilters(n)
        },
      })
    }

    // rating chip
    const ratingFilter = activeFilters.rating.rating
    if (ratingFilter && (ratingFilter.value ?? "").trim() !== "") {
      chips.push({
        id: "rating",
        label: `Rating: ${ratingFilter.value} Star${ratingFilter.value === "1" ? "" : "s"}`,
        onRemove: () => {
          const n = JSON.parse(JSON.stringify(activeFilters)) as CSRActiveFilters
          delete n.rating.rating
          setActiveFilters(n)
        },
      })
    }

    return chips
  }, [activeFilters])

  return (
    <div className="flex flex-1 flex-col">
      <SidebarFilter
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={activeFilters}
        onApply={(f) => setActiveFilters(f)}
        onClearAll={() => setActiveFilters(csrEmptyFilters())}
      />

      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

          <div className="px-8 lg:px-8 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-semibold">Customer Satisfaction Report</h1>
              <p className="text-muted-foreground">Overview of customer feedback and satisfaction metrics</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {fileName && (
                <span className="text-xs text-muted-foreground truncate max-w-[160px]" title={fileName}>📄 {fileName}</span>
              )}

              {/* Active filter chips */}
              {filterBadgeCount > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {activeFilterChips.map((chip) => (
                    <span key={chip.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                      {chip.label}
                      <button onClick={chip.onRemove} className="text-slate-400 hover:text-rose-500 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button onClick={() => setActiveFilters(csrEmptyFilters())} className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition-colors">Clear all</button>
                </div>
              )}

              {sortKey && sortDirection && (
                <Button size="sm" variant="outline" className="h-8 text-xs text-slate-600" onClick={() => { setSortKey(null); setSortDirection(null) }}>
                  Clear Sort
                </Button>
              )}

              {/* Filter Button */}
              <Button
                variant="outline"
                onClick={() => setSidebarOpen(true)}
                className={`flex items-center gap-2 ${filterBadgeCount > 0 ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100" : ""}`}
              >
                <SlidersHorizontal className="h-4 w-4 text-slate-700" />
                Filters
                {filterBadgeCount > 0 && (
                  <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold">{filterBadgeCount}</span>
                )}
              </Button>

              {/* Export Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-slate-700" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportCSV}>Export CSV</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportPDF}>Export PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <CSRTable
            data={tableData}
            activeFilters={activeFilters}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
            onRemoveDocument={handleRemoveDocument}
          />

        </div>
      </div>
    </div>
  )
}