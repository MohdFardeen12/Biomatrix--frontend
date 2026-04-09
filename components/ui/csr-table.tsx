"use client"

import * as React from "react"
import { IconStar, IconStarFilled } from "@tabler/icons-react"
import { Upload, FileText, ImageIcon, X, ArrowDownUp, ArrowDownAZ, ArrowUpAZ } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ─── Types (exported so index can use them) ───────────────────────────────────

export type CSRRow = {
  id: string
  customer: string
  email: string
  authenticated: number
  count: number
  feedback: string
  // document?: File | null
  documentName?: string
  date: string
  status: string
  rating: number
}

// ✅ UPDATED: added "authenticated" in sortable keys
export type CSRSortKey = "id" | "customer" | "authenticated" | "count" | "date" | "status" | "rating"
export type CSRSortDirection = "asc" | "desc" | null

// ✅ UPDATED: added new filter field keys
export type CSRFilterFieldKey = "id" | "customer" | "status" | "feedback" | "authenticated" | "count" | "date" | "rating"

export interface CSRTextFilter { value: string }

// ✅ NEW: range filter for authenticated/count
export interface CSRNumberRangeFilter {
  min?: string
  max?: string
}

// ✅ NEW: date range filter
export interface CSRDateRangeFilter {
  from?: string
  to?: string
}

// ✅ NEW: exact rating filter
export interface CSRRatingFilter {
  value?: string
}

export interface CSRActiveFilters {
  text: Partial<Record<"id" | "customer" | "status" | "feedback", CSRTextFilter>>
  numberRange: Partial<Record<"authenticated" | "count", CSRNumberRangeFilter>>
  dateRange: Partial<Record<"date", CSRDateRangeFilter>>
  rating: Partial<Record<"rating", CSRRatingFilter>>
}

// ✅ UPDATED: expanded empty filter structure
export const csrEmptyFilters = (): CSRActiveFilters => ({
  text: {},
  numberRange: {},
  dateRange: {},
  rating: {},
})

// ✅ UPDATED: count all filter types for badge
export function csrCountActiveFilters(f: CSRActiveFilters) {
  const textCount = Object.values(f.text).filter((v) => v && v.value.trim() !== "").length
  const numberRangeCount = Object.values(f.numberRange).filter((v) => v && ((v.min ?? "").trim() !== "" || (v.max ?? "").trim() !== "")).length
  const dateRangeCount = Object.values(f.dateRange).filter((v) => v && ((v.from ?? "").trim() !== "" || (v.to ?? "").trim() !== "")).length
  const ratingCount = Object.values(f.rating).filter((v) => v && (v.value ?? "").trim() !== "").length

  return textCount + numberRangeCount + dateRangeCount + ratingCount
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating
          ? <IconStarFilled key={star} className="size-4 text-amber-500" />
          : <IconStar key={star} className="size-4 text-muted-foreground/30" />
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    Resolved:      "bg-green-50 text-green-700 border-green-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    Pending:       "bg-red-50 text-red-700 border-red-200",
  }
  return <Badge variant="outline" className={variants[status] || ""}>{status}</Badge>
}

// function AuthBadge({ authenticated }: { authenticated: number }) {
//   return (
//     <Badge variant="outline" className={authenticated ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-slate-50 text-slate-500 border-slate-200"}>
//       {authenticated ? "Verified" : "Unverified"}
//     </Badge>
//   )
// } 

function DocumentCell({ documentName, rowId, onRemove }: {
  documentName?: string; rowId: string
  //onUpload(was present btw rowid-onremove)
  // onUpload: (id: string, file: File) => void
  onRemove: (id: string) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const getIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase()
    if (ext === "pdf") return <FileText className="w-3 h-3 text-rose-500" />
    return <ImageIcon className="w-3 h-3 text-blue-500" />
  }
  if (documentName) {
    return (
      <div className="flex items-center gap-1.5 max-w-[140px]">
        {getIcon(documentName)}
        <span className="text-[11px] text-slate-600 truncate flex-1" title={documentName}>{documentName}</span>
        <button onClick={() => onRemove(rowId)} className="text-slate-300 hover:text-slate-500 transition-colors flex-shrink-0"><X className="w-3 h-3" /></button>
      </div>
    )
  }
  return (
    <>
      {/* <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
        onChange={(e) => { const file = e.target.files?.[0]; if (file) onUpload(rowId, file) }} />
      <button onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 border border-dashed border-slate-200 hover:border-slate-400 rounded-md px-2 py-1 transition-colors">
        <Upload className="w-3 h-3" /><span>Upload</span>
      </button> */}
    </>
  )
}

function SortIconButton({ columnKey, sortKey, sortDirection, onSort, isText }: {
  columnKey: CSRSortKey; sortKey: CSRSortKey | null; sortDirection: CSRSortDirection
  onSort: (k: CSRSortKey) => void; isText?: boolean
}) {
  const isActive = sortKey === columnKey
  return (
    <button type="button" onClick={(e) => { e.stopPropagation(); onSort(columnKey) }}
      className={`inline-flex items-center justify-center rounded p-0.5 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
    >
      {!isActive || !sortDirection ? (
        <ArrowDownUp className="h-3.5 w-3.5" />
      ) : isText ? (
        sortDirection === "asc" ? <ArrowDownAZ className="h-3.5 w-3.5" /> : <ArrowUpAZ className="h-3.5 w-3.5" />
      ) : (
        <ArrowDownUp className={`h-3.5 w-3.5 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
      )}
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CSRTableProps {
  data?: CSRRow[]
  activeFilters: CSRActiveFilters
  sortKey: CSRSortKey | null
  sortDirection: CSRSortDirection
  onSort: (key: CSRSortKey) => void
  onRemoveDocument: (id: string) => void
}

export function CSRTable({ data, activeFilters, sortKey, sortDirection, onSort, onRemoveDocument }: CSRTableProps) {
  // IMPORTANT: No internal fallback data here now; parent fully controls the dataset.
  const tableData = React.useMemo(() => data ?? [], [data])
  const [currentPage, setCurrentPage] = React.useState(1)
  const ITEMS_PER_PAGE = 5

  // ✅ NEW: helper for date parsing (for date range filter + sorting)
  const parseRowDate = React.useCallback((dateStr: string) => {
    const parsed = new Date(dateStr)
    return isNaN(parsed.getTime()) ? null : parsed
  }, [])

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = React.useMemo(() => {
    let result = [...tableData]

    // text filters
    for (const [key, f] of Object.entries(activeFilters.text) as [keyof CSRActiveFilters["text"], CSRTextFilter][]) {
      if (!f || f.value.trim() === "") continue
      const q = f.value.trim().toLowerCase()
      result = result.filter((r) => String(r[key]).toLowerCase().includes(q))
    }

    // ✅ NEW: number range filters for authenticated and count
    for (const [key, f] of Object.entries(activeFilters.numberRange) as [keyof CSRActiveFilters["numberRange"], CSRNumberRangeFilter][]) {
      if (!f) continue
      const min = f.min?.trim() !== "" ? Number(f.min) : null
      const max = f.max?.trim() !== "" ? Number(f.max) : null

      if (min === null && max === null) continue

      result = result.filter((r) => {
        const value = r[key]
        if (min !== null && value < min) return false
        if (max !== null && value > max) return false
        return true
      })
    }

    // ✅ NEW: date range filter
    const dateFilter = activeFilters.dateRange.date
    if (dateFilter && ((dateFilter.from ?? "").trim() !== "" || (dateFilter.to ?? "").trim() !== "")) {
      const fromDate = dateFilter.from ? new Date(`${dateFilter.from}T00:00:00`) : null
      const toDate = dateFilter.to ? new Date(`${dateFilter.to}T23:59:59.999`) : null

      result = result.filter((r) => {
        const rowDate = parseRowDate(r.date)
        if (!rowDate) return false
        if (fromDate && rowDate < fromDate) return false
        if (toDate && rowDate > toDate) return false
        return true
      })
    }

    // ✅ NEW: exact rating filter
    const ratingFilter = activeFilters.rating.rating
    if (ratingFilter && (ratingFilter.value ?? "").trim() !== "") {
      const ratingValue = Number(ratingFilter.value)
      if (!isNaN(ratingValue)) {
        result = result.filter((r) => r.rating === ratingValue)
      }
    }

    return result
  }, [tableData, activeFilters, parseRowDate])

  // ── Sort ───────────────────────────────────────────────────────────────────

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDirection) return filtered
    return [...filtered].sort((a, b) => {
      // ✅ UPDATED: added authenticated as numeric sort
      if (sortKey === "authenticated" || sortKey === "count" || sortKey === "rating") {
        return sortDirection === "asc" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
      }
      if (sortKey === "date") {
        const aDate = parseRowDate(a.date)?.getTime() ?? 0
        const bDate = parseRowDate(b.date)?.getTime() ?? 0
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate
      }
      const aVal = String(a[sortKey]).toLowerCase()
      const bVal = String(b[sortKey]).toLowerCase()
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
  }, [filtered, sortKey, sortDirection, parseRowDate])

  // ── Pagination ─────────────────────────────────────────────────────────────

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return sorted.slice(start, start + ITEMS_PER_PAGE)
  }, [sorted, currentPage])

  // IMPORTANT: Reset to page 1 whenever filters/sort/data change so user never lands on empty page unexpectedly.
  React.useEffect(() => {
    setCurrentPage(1)
  }, [activeFilters, sortKey, sortDirection, tableData])

  React.useEffect(() => { if (currentPage > totalPages) setCurrentPage(1) }, [currentPage, totalPages])

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="px-8 lg:px-8">
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-[20px] font-semibold text-slate-800">Recent Customer Feedback</CardTitle>
          <CardDescription className="text-[13px] text-slate-500">Latest feedback and ratings from customers on exam products</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider pl-6">
                  <div className="inline-flex items-center gap-1">CenterID <SortIconButton columnKey="id" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} isText /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Center Name <SortIconButton columnKey="customer" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} isText /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  {/* ✅ UPDATED: added sort on Authenticated column */}
                  <div className="inline-flex items-center gap-1">Authenticated <SortIconButton columnKey="authenticated" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Count <SortIconButton columnKey="count" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider max-w-[260px]">Feedback</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Document</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Date <SortIconButton columnKey="date" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Status <SortIconButton columnKey="status" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} isText /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider pr-6">
                  <div className="inline-flex items-center gap-1">Rating <SortIconButton columnKey="rating" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-16 text-slate-500 text-sm">No records found.</TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, idx) => (
                  <TableRow key={item.id ?? idx} className="border-b border-slate-100 transition-colors hover:bg-slate-50/70">
                    <TableCell className="pl-6 text-[12px] text-slate-700 font-mono">{item.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-[13px] text-slate-700 font-medium">{item.customer}</div>
                        <div className="text-[12px] text-slate-500">{item.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] text-slate-700 tabular-nums">{item.authenticated}</TableCell>
                    <TableCell className="text-[13px] text-slate-700 tabular-nums">{item.count}</TableCell>
                    <TableCell className="max-w-[260px] truncate text-[12px] text-slate-600">{item.feedback}</TableCell>
                    <TableCell>
                      {/* onUpload={handleUpload} */}
                      <DocumentCell documentName={item.documentName} rowId={item.id} onRemove={onRemoveDocument} />
                    </TableCell>
                    <TableCell className="text-[11px] text-slate-600 whitespace-nowrap">
                      {item.date}
                    </TableCell>
                    <TableCell><StatusBadge status={item.status} /></TableCell>
                    <TableCell className="pr-6"><StarRating rating={item.rating} /></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
              <span className="text-[11px] text-slate-500">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length} records
              </span>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button key={page} size="sm" variant={currentPage === page ? "default" : "ghost"}
                    className={`h-7 w-7 text-xs ${currentPage === page ? "bg-rose-500 hover:bg-rose-600 text-white" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >{page}</Button>
                ))}
                <Button size="icon" variant="ghost" className="h-7 w-7" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}