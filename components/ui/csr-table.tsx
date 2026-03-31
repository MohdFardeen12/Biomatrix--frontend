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
  document?: File | null
  documentName?: string
  date: string
  status: string
  rating: number
}

export type CSRSortKey = "id" | "customer" | "count" | "date" | "status" | "rating"
export type CSRSortDirection = "asc" | "desc" | null

export type CSRFilterFieldKey = "id" | "customer" | "status"

export interface CSRTextFilter { value: string }
export interface CSRActiveFilters {
  text: Partial<Record<CSRFilterFieldKey, CSRTextFilter>>
}

export const csrEmptyFilters = (): CSRActiveFilters => ({ text: {} })

export function csrCountActiveFilters(f: CSRActiveFilters) {
  return Object.values(f.text).filter((v) => v && v.value.trim() !== "").length
}

// ─── Default data ─────────────────────────────────────────────────────────────

const defaultFeedbackData: CSRRow[] = [
  { id: "A1B2C", customer: "John Smith",     email: "john.smith@example.com", authenticated: 38,  count: 42, feedback: "Excellent product! Exam preparation tools are very comprehensive.",        documentName: "exam_report_march.pdf",  date: "2024-03-15", status: "Resolved",    rating: 5 },
  { id: "D3E4F", customer: "Sarah Johnson",  email: "sarah.j@example.com",    authenticated: 28,  count: 28, feedback: "Good analytics features, but could use more customization options.",      documentName: "analytics_feedback.png", date: "2024-03-14", status: "Resolved",    rating: 4 },
  { id: "G5H6I", customer: "Michael Chen",   email: "m.chen@example.com",     authenticated: 10,  count: 15, feedback: "Perfect for creating assessments. Very intuitive interface.",              documentName: undefined,               date: "2024-03-13", status: "Resolved",    rating: 5 },
  { id: "J7K8L", customer: "Emily Davis",    email: "emily.d@example.com",    authenticated: 7,   count: 7,  feedback: "Had some issues with the reporting feature. Support is helping.",        documentName: "issue_screenshot.jpg",   date: "2024-03-12", status: "In Progress", rating: 3 },
  { id: "M9N0P", customer: "Robert Wilson",  email: "r.wilson@example.com",   authenticated: 53,  count: 63, feedback: "The insights provided have significantly improved our pass rates.",       documentName: "pass_rate_report.pdf",   date: "2024-03-11", status: "Resolved",    rating: 5 },
  { id: "Q1R2S", customer: "Lisa Anderson",  email: "l.anderson@example.com", authenticated: 10,  count: 11, feedback: "Great tool for creating varied question types across exams.",             documentName: undefined,               date: "2024-03-10", status: "Resolved",    rating: 4 },
  { id: "T3U4V", customer: "David Martinez", email: "d.martinez@example.com", authenticated: 3,   count: 3,  feedback: "Experiencing technical difficulties with batch processing module.",      documentName: "error_log.pdf",          date: "2024-03-09", status: "Pending",     rating: 2 },
  { id: "W5X6Y", customer: "Demo Center",    email: "demoemail@example.com",  authenticated: 79,  count: 89, feedback: "Outstanding support team and excellent overall product quality.",        documentName: "support_ticket.jpeg",    date: "2024-03-08", status: "Resolved",    rating: 5 },
]

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

function DocumentCell({ documentName, rowId, onUpload, onRemove }: {
  documentName?: string; rowId: string
  onUpload: (id: string, file: File) => void
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
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
        onChange={(e) => { const file = e.target.files?.[0]; if (file) onUpload(rowId, file) }} />
      <button onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 border border-dashed border-slate-200 hover:border-slate-400 rounded-md px-2 py-1 transition-colors">
        <Upload className="w-3 h-3" /><span>Upload</span>
      </button>
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
}

export function CSRTable({ data, activeFilters, sortKey, sortDirection, onSort }: CSRTableProps) {
  const [tableData, setTableData] = React.useState<CSRRow[]>(data && data.length > 0 ? data : defaultFeedbackData)
  const [currentPage, setCurrentPage] = React.useState(1)
  const ITEMS_PER_PAGE = 5

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = React.useMemo(() => {
    let result = [...tableData]
    for (const [key, f] of Object.entries(activeFilters.text) as [CSRFilterFieldKey, CSRTextFilter][]) {
      if (!f || f.value.trim() === "") continue
      const q = f.value.trim().toLowerCase()
      result = result.filter((r) => String(r[key]).toLowerCase().includes(q))
    }
    return result
  }, [tableData, activeFilters])

  // ── Sort ───────────────────────────────────────────────────────────────────

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDirection) return filtered
    return [...filtered].sort((a, b) => {
      if (sortKey === "count" || sortKey === "rating") {
        return sortDirection === "asc" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]
      }
      if (sortKey === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      const aVal = String(a[sortKey]).toLowerCase()
      const bVal = String(b[sortKey]).toLowerCase()
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
  }, [filtered, sortKey, sortDirection])

  // ── Pagination ─────────────────────────────────────────────────────────────

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return sorted.slice(start, start + ITEMS_PER_PAGE)
  }, [sorted, currentPage])

  React.useEffect(() => { if (currentPage > totalPages) setCurrentPage(1) }, [currentPage, totalPages])

  // ── Document handlers ──────────────────────────────────────────────────────

  const handleUpload = (id: string, file: File) =>
    setTableData((prev) => prev.map((row) => row.id === id ? { ...row, documentName: file.name, document: file } : row))

  const handleRemove = (id: string) =>
    setTableData((prev) => prev.map((row) => row.id === id ? { ...row, documentName: undefined, document: null } : row))

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="px-8 lg:px-8">
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="text-[20px] font-semibold text-slate-800">Recent Customer Feedback</CardTitle>
          <CardDescription className="text-[13px] text-slate-400">Latest feedback and ratings from customers on exam products</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-6">
                  <div className="inline-flex items-center gap-1">ID <SortIconButton columnKey="id" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} isText /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Center Name <SortIconButton columnKey="customer" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} isText /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Authenticated</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Count <SortIconButton columnKey="count" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider max-w-[260px]">Feedback</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Document</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Date <SortIconButton columnKey="date" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="inline-flex items-center gap-1">Status <SortIconButton columnKey="status" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} isText /></div>
                </TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pr-6">
                  <div className="inline-flex items-center gap-1">Rating <SortIconButton columnKey="rating" sortKey={sortKey} sortDirection={sortDirection} onSort={onSort} /></div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-16 text-slate-400 text-sm">No records found.</TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, idx) => (
                  <TableRow key={item.id ?? idx} className="border-b border-slate-100 transition-colors hover:bg-slate-50/70">
                    <TableCell className="pl-6 text-[12px] text-blue-500 font-mono">{item.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-[13px] text-slate-700 font-medium">{item.customer}</div>
                        <div className="text-[12px] text-slate-400">{item.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[13px] text-slate-700 font-medium tabular-nums">{item.authenticated}</TableCell>
                    <TableCell className="text-[13px] text-slate-700 font-medium tabular-nums">{item.count}</TableCell>
                    <TableCell className="max-w-[260px] truncate text-[12px] text-slate-500">{item.feedback}</TableCell>
                    <TableCell>
                      <DocumentCell documentName={item.documentName} rowId={item.id} onUpload={handleUpload} onRemove={handleRemove} />
                    </TableCell>
                    <TableCell className="text-[11px] text-slate-400 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
              <span className="text-[11px] text-slate-400">
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