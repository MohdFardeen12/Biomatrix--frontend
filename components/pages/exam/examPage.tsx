"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowUpAZ,
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface RowData {
  sn: number;
  devices: number;
  centreCode: string;
  city: string;
  rm: string;
  name: string;
  total: number;
  enrollments: number;
  walkins: number;
  fr: number;

  // ✅ UPDATED: CSR is now star rating (1 to 5) instead of score value
  csr: number | null;

  csrColor: string;
  duplicate: string;
  dataDownload: string;
}

type SortKey =
  | "devices"
  | "centreCode"
  | "city"
  | "rm"
  | "name"
  | "total"
  | "enrollments"
  | "walkins"
  | "fr"
  | "csr"
  | "duplicate";

type SortDirection = "asc" | "desc" | null;

// ─── Filter field definitions ─────────────────────────────────────────────────

type FilterFieldKey =
  | "devices"
  | "centreCode"
  | "city"
  | "rm"
  | "name"
  | "total"
  | "enrollments"
  | "walkins"
  | "fr"
  | "csr"
  | "duplicate";

interface FilterField {
  key: FilterFieldKey;
  label: string;
  type: "numeric" | "text" | "star";
}

const FILTER_FIELDS: FilterField[] = [
  { key: "devices",     label: "Devices",      type: "numeric" },
  { key: "centreCode",  label: "Centre Code",  type: "text"    },
  { key: "city",        label: "City",         type: "text"    },
  { key: "rm",          label: "RM",           type: "text"    },
  { key: "name",        label: "Name",         type: "text"    },
  { key: "total",       label: "Total",        type: "numeric" },
  { key: "enrollments", label: "Enrollments",  type: "numeric" },
  { key: "walkins",     label: "Walkins",      type: "numeric" },
  { key: "fr",          label: "FR Count",     type: "numeric" },

  // ✅ UPDATED: CSR filter is now star-based exact match instead of numeric min/max
  { key: "csr",         label: "CSR",          type: "star"    },

  { key: "duplicate",   label: "Duplicate",    type: "numeric" },
];

interface NumericFilter { min: string; max: string }
interface TextFilter    { value: string }

// ✅ UPDATED: New CSR star filter type (exact star match 1–5)
interface StarFilter    { value: string }

interface ActiveFilters {
  numeric: Partial<Record<Exclude<FilterFieldKey, "csr">, NumericFilter>>;
  text:    Partial<Record<FilterFieldKey, TextFilter>>;
  star:    Partial<Record<"csr", StarFilter>>;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const tableData: RowData[] = [
  {
    sn: 1, devices: 6, centreCode: "156008", city: "JH-Jamshedpur",
    rm: "Vivek", name: "AIWC ACADEMY OF EXCELLENCE JAMSHEDPUR",
    total: 540, enrollments: 466, walkins: 7, fr: 456,
    // ✅ UPDATED: CSR changed from score to star rating
    csr: 4,
    csrColor: "bg-orange-400", duplicate: "3", dataDownload: "5/6",
  },
  {
    sn: 2, devices: 5, centreCode: "156011", city: "JH-Dhanbad",
    rm: "Ravi", name: "ST MARY SCHOOL BISTUPUR",
    total: 480, enrollments: 413, walkins: 6, fr: 394,
    csr: 5,
    csrColor: "bg-green-500", duplicate: "2", dataDownload: "4/5",
  },
  {
    sn: 3, devices: 4, centreCode: "156014", city: "JH-Ranchi",
    rm: "Kiran", name: "VALLEY VIEW SCHOOL TELCO",
    total: 360, enrollments: 299, walkins: 5, fr: 294,
    csr: 3,
    csrColor: "bg-green-500", duplicate: "4", dataDownload: "3/4",
  },
  {
    sn: 4, devices: 4, centreCode: "156018", city: "UP-Agra",
    rm: "Amit", name: "DAV PUBLIC SCHOOL AGRA",
    total: 350, enrollments: 280, walkins: 8, fr: 275,
    csr: 4,
    csrColor: "bg-green-500", duplicate: "1", dataDownload: "2/4",
  },
  {
    sn: 5, devices: 7, centreCode: "156022", city: "MH-Mumbai",
    rm: "Sneha", name: "OXFORD HIGH SCHOOL MUMBAI",
    total: 600, enrollments: 520, walkins: 9, fr: 510,
    csr: 2,
    csrColor: "bg-orange-400", duplicate: "5", dataDownload: "6/7",
  },
  {
    sn: 6, devices: 3, centreCode: "156030", city: "DL-Delhi",
    rm: "Ankit", name: "DELHI PUBLIC SCHOOL DELHI",
    total: 300, enrollments: 250, walkins: 4, fr: 245,
    csr: 5,
    csrColor: "bg-green-500", duplicate: "2", dataDownload: "2/3",
  },
  {
    sn: 7, devices: 5, centreCode: "156035", city: "KA-Bangalore",
    rm: "Deepak", name: "NATIONAL SCHOOL BANGALORE",
    total: 450, enrollments: 390, walkins: 7, fr: 385,
    csr: 1,
    csrColor: "bg-orange-400", duplicate: "3", dataDownload: "4/5",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRowValue(row: RowData, key: FilterFieldKey): string | number {
  switch (key) {
    case "devices":     return row.devices;
    case "centreCode":  return row.centreCode;
    case "city":        return row.city;
    case "rm":          return row.rm;
    case "name":        return row.name;
    case "total":       return row.total;
    case "enrollments": return row.enrollments;
    case "walkins":     return row.walkins;
    case "fr":          return row.fr;
    case "csr":         return row.csr ?? -1;
    case "duplicate":   return Number(row.duplicate);
    default:            return "";
  }
}

function countActiveFilters(filters: ActiveFilters): number {
  let count = 0;
  for (const f of Object.values(filters.numeric)) {
    if (f && (f.min !== "" || f.max !== "")) count++;
  }
  for (const f of Object.values(filters.text)) {
    if (f && f.value.trim() !== "") count++;
  }

  // ✅ UPDATED: Count active CSR star filter
  for (const f of Object.values(filters.star)) {
    if (f && f.value.trim() !== "") count++;
  }

  return count;
}

const emptyFilters = (): ActiveFilters => ({ numeric: {}, text: {}, star: {} });

// ─── Sidebar filter component ─────────────────────────────────────────────────

interface SidebarFilterProps {
  open: boolean;
  onClose: () => void;
  filters: ActiveFilters;
  onApply: (filters: ActiveFilters) => void;
  onClearAll: () => void;
}

function SidebarFilter({ open, onClose, filters, onApply, onClearAll }: SidebarFilterProps) {
  // Local draft state — only committed when user hits Apply
  const [draft, setDraft] = useState<ActiveFilters>(() => JSON.parse(JSON.stringify(filters)));
  const [expanded, setExpanded] = useState<Partial<Record<FilterFieldKey, boolean>>>({});
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Sync draft when filters prop changes (e.g. after clear all)
  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(filters)));
  }, [filters]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const toggleExpanded = (key: FilterFieldKey) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const setNumeric = (key: Exclude<FilterFieldKey, "csr">, field: "min" | "max", value: string) => {
    setDraft((prev) => ({
      ...prev,
      numeric: {
        ...prev.numeric,
        [key]: { ...(prev.numeric[key] ?? { min: "", max: "" }), [field]: value },
      },
    }));
  };

  const setText = (key: FilterFieldKey, value: string) => {
    setDraft((prev) => ({
      ...prev,
      text: { ...prev.text, [key]: { value } },
    }));
  };

  // ✅ UPDATED: Setter for CSR star filter
  const setStar = (key: "csr", value: string) => {
    let sanitized = value.replace(/\D/g, "");
    if (sanitized !== "") {
      const numeric = Number(sanitized);
      if (numeric < 1) sanitized = "1";
      if (numeric > 5) sanitized = "5";
    }

    setDraft((prev) => ({
      ...prev,
      star: { ...prev.star, [key]: { value: sanitized } },
    }));
  };

  const clearField = (field: FilterField) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as ActiveFilters;
      if (field.type === "numeric") delete next.numeric[field.key as Exclude<FilterFieldKey, "csr">];
      else if (field.type === "star") delete next.star[field.key as "csr"];
      else delete next.text[field.key];
      return next;
    });
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleClearAll = () => {
    const fresh = emptyFilters();
    setDraft(fresh);
    setExpanded({});
    onClearAll();
  };

  const draftCount = countActiveFilters(draft);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-40 h-full w-80 bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Filters</span>
            {draftCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {draftCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable fields */}
        <div className="flex-1 overflow-y-auto py-2">
          {FILTER_FIELDS.map((field) => {
            const isOpen = !!expanded[field.key];
            const numVal = field.type === "numeric" ? draft.numeric[field.key as Exclude<FilterFieldKey, "csr">] : undefined;
            const txtVal = draft.text[field.key];
            const starVal = field.type === "star" ? draft.star[field.key as "csr"] : undefined;

            const hasValue =
              field.type === "numeric"
                ? !!(numVal && (numVal.min !== "" || numVal.max !== ""))
                : field.type === "star"
                ? !!(starVal && starVal.value.trim() !== "")
                : !!(txtVal && txtVal.value.trim() !== "");

            return (
              <div key={field.key} className="border-b border-slate-100 last:border-0">
                {/* Field header row */}
                <div
                  onClick={() => toggleExpanded(field.key)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-slate-700">
                      {field.label}
                    </span>
                    {hasValue && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {hasValue && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); clearField(field); }}
                        className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                    {isOpen
                      ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                      : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    }
                  </div>
                </div>

                {/* Expanded input area */}
                {isOpen && (
                  <div className="px-5 pb-4 pt-1">
                    {field.type === "numeric" ? (
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Min</label>
                          <input
                            type="number"
                            value={numVal?.min ?? ""}
                            onChange={(e) => setNumeric(field.key as Exclude<FilterFieldKey, "csr">, "min", e.target.value)}
                            placeholder="0"
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                        <span className="text-slate-300 mt-4 text-sm">—</span>
                        <div className="flex-1">
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Max</label>
                          <input
                            type="number"
                            value={numVal?.max ?? ""}
                            onChange={(e) => setNumeric(field.key as Exclude<FilterFieldKey, "csr">, "max", e.target.value)}
                            placeholder="∞"
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                      </div>
                    ) : field.type === "star" ? (
                      // ✅ UPDATED: CSR filter UI now accepts exact star number (1–5)
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Star Rating</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={starVal?.value ?? ""}
                          onChange={(e) => setStar(field.key as "csr", e.target.value)}
                          placeholder="Enter 1 to 5"
                          className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                        />
                        <p className="mt-1 text-[10px] text-slate-400">
                          Enter exact star value (1⭐ to 5⭐)
                        </p>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Search</label>
                        <input
                          type="text"
                          value={txtVal?.value ?? ""}
                          onChange={(e) => setText(field.key, e.target.value)}
                          placeholder={`Search ${field.label.toLowerCase()}...`}
                          className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-slate-100 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9 text-xs text-slate-600"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
          <Button
            size="sm"
            className="flex-1 h-9 text-xs bg-rose-500 hover:bg-rose-600 text-white"
            onClick={handleApply}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── Main Table Component ─────────────────────────────────────────────────────

export default function DataTable() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(emptyFilters());

  const PAGE_SIZE = 5;

  const filterBadgeCount = countActiveFilters(activeFilters);

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    let data = [...tableData];

    // Global search
    if (query) {
      data = data.filter((row) => {
        const values = [
          row.sn,
          row.devices,
          row.centreCode,
          row.city,
          row.rm,
          row.name,
          row.total,
          row.enrollments,
          row.walkins,
          row.fr,

          // ✅ UPDATED: Include display format in global search too (e.g. 4⭐)
          row.csr !== null ? `${row.csr}⭐` : "",

          row.duplicate,
          row.dataDownload,
        ];
        return values.some((v) => String(v).toLowerCase().includes(query));
      });
    }

    // Sidebar numeric filters
    for (const [key, filter] of Object.entries(activeFilters.numeric) as [Exclude<FilterFieldKey, "csr">, NumericFilter][]) {
      if (!filter) continue;
      const min = filter.min !== "" ? Number(filter.min) : null;
      const max = filter.max !== "" ? Number(filter.max) : null;
      data = data.filter((row) => {
        const val = Number(getRowValue(row, key));
        if (min !== null && val < min) return false;
        if (max !== null && val > max) return false;
        return true;
      });
    }

    // Sidebar text filters
    for (const [key, filter] of Object.entries(activeFilters.text) as [FilterFieldKey, TextFilter][]) {
      if (!filter || filter.value.trim() === "") continue;
      const q = filter.value.trim().toLowerCase();
      data = data.filter((row) =>
        String(getRowValue(row, key)).toLowerCase().includes(q)
      );
    }

    // ✅ UPDATED: CSR star filter (exact match 1–5)
    for (const [key, filter] of Object.entries(activeFilters.star) as ["csr", StarFilter][]) {
      if (!filter || filter.value.trim() === "") continue;
      const selectedStar = Number(filter.value);
      data = data.filter((row) => row[key] === selectedStar);
    }

    return data;
  }, [searchTerm, activeFilters]);

  // ── Sorting ────────────────────────────────────────────────────────────────

  const getSortValue = (row: RowData, key: SortKey): string | number => {
    switch (key) {
      case "devices":     return row.devices;
      case "centreCode":  return Number(row.centreCode);
      case "city":        return row.city.toLowerCase();
      case "rm":          return row.rm.toLowerCase();
      case "name":        return row.name.toLowerCase();
      case "total":       return row.total;
      case "enrollments": return row.enrollments;
      case "walkins":     return row.walkins;
      case "fr":          return row.fr;

      // ✅ UPDATED: CSR sort now sorts by star value (1–5)
      case "csr":         return row.csr ?? -1;

      case "duplicate":   return Number(row.duplicate);
      default:            return "";
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return [...filteredData];
    return [...filteredData].sort((a, b) => {
      const aVal = getSortValue(a, sortKey);
      const bVal = getSortValue(b, sortKey);
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortKey, sortDirection]);

  // ── Pagination ─────────────────────────────────────────────────────────────

  const totalPages = Math.max(1, Math.ceil(sortedData.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // ── Sort handler ───────────────────────────────────────────────────────────

  const handleSort = (key: SortKey) => {
    setPage(1);
    if (sortKey !== key) { setSortKey(key); setSortDirection("asc"); return; }
    if (sortDirection === "asc") { setSortDirection("desc"); return; }
    setSortKey(null); setSortDirection(null);
  };

  const clearSorting = () => { setSortKey(null); setSortDirection(null); setPage(1); };

  const handleSearchChange = (value: string) => { setSearchTerm(value); setPage(1); };

  // ── Sidebar handlers ───────────────────────────────────────────────────────

  const handleApplyFilters = (filters: ActiveFilters) => {
    setActiveFilters(filters);
    setPage(1);
  };

  const handleClearAllFilters = () => {
    setActiveFilters(emptyFilters());
    setPage(1);
  };

  // ── Export ─────────────────────────────────────────────────────────────────

  const handleExportCSV = () => {
    const headers = ["S.N.","Devices","Centre Code","City","RM","Name","Total","Enrollments","Walkins","FR count","CSR","Duplicate","Data download"];
    const rows = sortedData.map((row) => [
      row.sn,
      row.devices,
      row.centreCode,
      row.city,
      row.rm,
      row.name,
      row.total,
      row.enrollments,
      row.walkins,
      row.fr,

      // ✅ UPDATED: Export CSR in display format like 4⭐
      row.csr !== null ? `${row.csr}⭐` : "-",

      row.duplicate,
      row.dataDownload,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "exam-records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => window.print();

  // ── Sort icon ──────────────────────────────────────────────────────────────

  const isTextSortKey = (key: SortKey) => key === "city" || key === "rm" || key === "name";

  const SortIconButton = ({ columnKey }: { columnKey: SortKey }) => {
    const isActive = sortKey === columnKey;
    return (
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); handleSort(columnKey); }}
        className={`inline-flex items-center justify-center rounded p-0.5 transition-colors ${
          isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
        }`}
      >
        {!isActive || !sortDirection ? (
          <ArrowDownUp className="h-3.5 w-3.5" />
        ) : isTextSortKey(columnKey) ? (
          sortDirection === "asc"
            ? <ArrowDownAZ className="h-3.5 w-3.5" />
            : <ArrowUpAZ className="h-3.5 w-3.5" />
        ) : (
          <ArrowDownUp className={`h-3.5 w-3.5 ${sortDirection === "asc" ? "rotate-180" : ""}`} />
        )}
      </button>
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white px-8 pt-1 pb-2 font-[Geist,system-ui,sans-serif]">

      {/* Sidebar */}
      <SidebarFilter
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={activeFilters}
        onApply={handleApplyFilters}
        onClearAll={handleClearAllFilters}
      />

      {/* Heading */}
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-slate-800">Exams Record</h1>
      </div>

      {/* Top controls */}
      <div className="flex justify-between gap-3 items-center mb-4 flex-wrap">
        {/* Global Search */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search any field..."
            className="w-full h-9 rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-1 focus:ring-slate-200"
          />
        </div>

        <div className="flex justify-end gap-2 items-center flex-wrap">
          {(sortKey && sortDirection) && (
            <Button size="sm" variant="outline" onClick={clearSorting} className="h-8 text-xs text-slate-600 gap-1">
              Clear Sorting
            </Button>
          )}

          {/* Advanced Filter Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSidebarOpen(true)}
            className={`h-8 text-xs gap-1.5 relative ${
              filterBadgeCount > 0
                ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100"
                : "text-slate-600"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {filterBadgeCount > 0 && (
              <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {filterBadgeCount}
              </span>
            )}
          </Button>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 text-xs text-slate-600 gap-1">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-sm">
              <DropdownMenuItem onClick={handleExportCSV}>Export CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF}>Export PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active filter chips */}
      {filterBadgeCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {(Object.entries(activeFilters.numeric) as [Exclude<FilterFieldKey, "csr">, NumericFilter][]).map(([key, f]) => {
            if (!f || (f.min === "" && f.max === "")) return null;
            const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key;
            return (
              <span key={key} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                {label}: {f.min !== "" ? f.min : "0"} – {f.max !== "" ? f.max : "∞"}
                <button
                  onClick={() => {
                    const next = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                    delete next.numeric[key];
                    setActiveFilters(next);
                    setPage(1);
                  }}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          {(Object.entries(activeFilters.text) as [FilterFieldKey, TextFilter][]).map(([key, f]) => {
            if (!f || f.value.trim() === "") return null;
            const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key;
            return (
              <span key={key} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                {label}: "{f.value}"
                <button
                  onClick={() => {
                    const next = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                    delete next.text[key];
                    setActiveFilters(next);
                    setPage(1);
                  }}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          {/* ✅ UPDATED: Active chip for CSR star filter */}
          {(Object.entries(activeFilters.star) as ["csr", StarFilter][]).map(([key, f]) => {
            if (!f || f.value.trim() === "") return null;
            const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key;
            return (
              <span key={key} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                {label}: {f.value}⭐
                <button
                  onClick={() => {
                    const next = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                    delete next.star[key];
                    setActiveFilters(next);
                    setPage(1);
                  }}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          <button
            onClick={handleClearAllFilters}
            className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="min-w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">S.N.</th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">Devices <SortIconButton columnKey="devices" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex flex-col items-center leading-tight">
                  <span>Centre Code</span>
                  <span className="mt-0.5"><SortIconButton columnKey="centreCode" /></span>
                </div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">City <SortIconButton columnKey="city" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">RM <SortIconButton columnKey="rm" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">Name <SortIconButton columnKey="name" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">Total <SortIconButton columnKey="total" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">Enrollments <SortIconButton columnKey="enrollments" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">Walkins <SortIconButton columnKey="walkins" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">FR count <SortIconButton columnKey="fr" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">CSR <SortIconButton columnKey="csr" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">Duplicate <SortIconButton columnKey="duplicate" /></div>
              </th>
              <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                Data<br />download
              </th>
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={13} className="text-center py-16 text-slate-400 text-sm">
                  No records found.
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={row.sn + "-" + idx}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-2 py-3 text-center text-[12px] text-slate-500 font-medium">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.devices}</td>
                  <td className="px-2 py-3 text-center">
                    <Link
                      href={`/exam/center/${row.centreCode}`}
                      className="text-[13px] font-semibold text-blue-600 hover:underline"
                    >
                      {row.centreCode}
                    </Link>
                  </td>
                  <td className="px-2 py-3 text-[12px] text-slate-700 whitespace-nowrap">{row.city}</td>
                  <td className="px-2 py-3 text-[12px] text-slate-700 whitespace-nowrap">{row.rm}</td>
                  <td className="px-2 py-3 text-[12px] text-slate-700 max-w-xs">{row.name}</td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.total}</td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.enrollments}</td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.walkins}</td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.fr}</td>

                  {/* ✅ UPDATED: CSR now displays exactly like 4⭐ instead of score or repeated stars */}
                  <td className="px-2 py-3 text-center">
                    {/* {row.csr !== null && (
                      <span className={`inline-block px-2 py-0.5 rounded text-white font-semibold ${row.csrColor}`}>
                        {row.csr}⭐
                      </span>
                    )} */}
                    {row.csr}★
                  </td>

                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.duplicate}</td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700">{row.dataDownload}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {sortedData.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[11px] text-slate-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sortedData.length)} of {sortedData.length} records
            </span>
            <div className="flex items-center gap-1">
              <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page === 1} onClick={() => goToPage(page - 1)}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={p === page ? "default" : "ghost"}
                  className={`h-7 w-7 text-xs ${p === page ? "bg-rose-500 hover:bg-rose-600 text-white" : ""}`}
                  onClick={() => goToPage(p)}
                >
                  {p}
                </Button>
              ))}
              <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page === totalPages} onClick={() => goToPage(page + 1)}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}





//old updated code of exam in which we used search filter over column.

// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Download,
//   Filter,
//   X,
// } from "lucide-react";

// interface RowData {
//   sn: number;
//   devices: number;
//   centreCode: string;
//   city: string;
//   rm: string;
//   name: string;
//   total: number;
//   enrollments: number;
//   walkins: number;
//   fr: number;
//   csr: number | null;
//   csrColor: string;
//   duplicate: string;
//   dataDownload: string;
// }

// const tableData: RowData[] = [
//   {
//     sn: 1,
//     devices: 6,
//     centreCode: "156008",
//     city: "JH-Jamshedpur",
//     rm: "Vivek, Afsar, Jyoti",
//     name: "AIWC ACADEMY OF EXCELLENCE JAMSHEDPUR",
//     total: 540,
//     enrollments: 466,
//     walkins: 7,
//     fr: 456,
//     csr: 460,
//     csrColor: "bg-orange-400",
//     duplicate: "3",
//     dataDownload: "5/6",
//   },
//   {
//     sn: 2,
//     devices: 5,
//     centreCode: "156011",
//     city: "JH-Dhanbad",
//     rm: "Ravi, Neha, Aman",
//     name: "ST MARY SCHOOL BISTUPUR",
//     total: 480,
//     enrollments: 413,
//     walkins: 6,
//     fr: 394,
//     csr: 413,
//     csrColor: "bg-green-500",
//     duplicate: "2",
//     dataDownload: "4/5",
//   },
//   {
//     sn: 3,
//     devices: 4,
//     centreCode: "156014",
//     city: "JH-Ranchi",
//     rm: "Kiran, Mohit, Sona",
//     name: "VALLEY VIEW SCHOOL TELCO",
//     total: 360,
//     enrollments: 299,
//     walkins: 5,
//     fr: 294,
//     csr: 299,
//     csrColor: "bg-green-500",
//     duplicate: "4",
//     dataDownload: "3/4",
//   },
//   {
//     sn: 4,
//     devices: 4,
//     centreCode: "156018",
//     city: "UP-Agra",
//     rm: "Amit, Pooja, Raj",
//     name: "DAV PUBLIC SCHOOL AGRA",
//     total: 350,
//     enrollments: 280,
//     walkins: 8,
//     fr: 275,
//     csr: 280,
//     csrColor: "bg-green-500",
//     duplicate: "1",
//     dataDownload: "2/4",
//   },
//   {
//     sn: 5,
//     devices: 7,
//     centreCode: "156022",
//     city: "MH-Mumbai",
//     rm: "Sneha, Rahul, Kunal",
//     name: "OXFORD HIGH SCHOOL MUMBAI",
//     total: 600,
//     enrollments: 520,
//     walkins: 9,
//     fr: 510,
//     csr: 515,
//     csrColor: "bg-orange-400",
//     duplicate: "5",
//     dataDownload: "6/7",
//   },
//   {
//     sn: 6,
//     devices: 3,
//     centreCode: "156030",
//     city: "DL-Delhi",
//     rm: "Ankit, Priya, Rohan",
//     name: "DELHI PUBLIC SCHOOL DELHI",
//     total: 300,
//     enrollments: 250,
//     walkins: 4,
//     fr: 245,
//     csr: 248,
//     csrColor: "bg-green-500",
//     duplicate: "2",
//     dataDownload: "2/3",
//   },
//   {
//     sn: 7,
//     devices: 5,
//     centreCode: "156035",
//     city: "KA-Bangalore",
//     rm: "Deepak, Nisha, Arjun",
//     name: "NATIONAL SCHOOL BANGALORE",
//     total: 450,
//     enrollments: 390,
//     walkins: 7,
//     fr: 385,
//     csr: 388,
//     csrColor: "bg-orange-400",
//     duplicate: "3",
//     dataDownload: "4/5",
//   },
// ];

// type NumericFilterKey =
//   | "devices"
//   | "centreCode"
//   | "total"
//   | "enrollments"
//   | "walkins"
//   | "fr"
//   | "csr"
//   | "duplicate";

// type TextFilterKey = "city" | "rm" | "name";

// type NumericFilterState = Partial<
//   Record<NumericFilterKey, { min: string; max: string }>
// >;

// type TextFilterState = Partial<Record<TextFilterKey, string>>;

// export default function DataTable() {
//   const [page, setPage] = useState(1);
//   const [search, setsearch] = useState("");

//   const [numericFilters, setNumericFilters] = useState<NumericFilterState>({});
//   const [textFilters, setTextFilters] = useState<TextFilterState>({});

//   const [openNumericFilter, setOpenNumericFilter] = useState<NumericFilterKey | null>(null);
//   const [openTextFilter, setOpenTextFilter] = useState<TextFilterKey | null>(null);

//   const [numericDraft, setNumericDraft] = useState({ min: "", max: "" });
//   const [textDraft, setTextDraft] = useState("");

//   const numericFilterRef = useRef<HTMLDivElement | null>(null);
//   const textFilterRef = useRef<HTMLDivElement | null>(null);

//   const PAGE_SIZE = 4;

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as Node;

//       if (
//         openNumericFilter &&
//         numericFilterRef.current &&
//         !numericFilterRef.current.contains(target)
//       ) {
//         setOpenNumericFilter(null);
//       }

//       if (
//         openTextFilter &&
//         textFilterRef.current &&
//         !textFilterRef.current.contains(target)
//       ) {
//         setOpenTextFilter(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [openNumericFilter, openTextFilter]);

//   const getNumericValue = (row: RowData, key: NumericFilterKey): number | null => {
//     switch (key) {
//       case "devices":
//         return row.devices;
//       case "centreCode":
//         return Number(row.centreCode);
//       case "total":
//         return row.total;
//       case "enrollments":
//         return row.enrollments;
//       case "walkins":
//         return row.walkins;
//       case "fr":
//         return row.fr;
//       case "csr":
//         return row.csr;
//       case "duplicate":
//         return Number(row.duplicate);
//       default:
//         return null;
//     }
//   };

//   const hasNumericFilter = (key: NumericFilterKey) => {
//     const f = numericFilters[key];
//     return !!(f && (f.min !== "" || f.max !== ""));
//   };

//   const hasTextFilter = (key: TextFilterKey) => {
//     const f = textFilters[key];
//     return !!(f && f.trim() !== "");
//   };

//   const filtered = useMemo(() => {
//     return tableData.filter((row) => {
//       // Global search
//       const combined = Object.values(row).join(" ").toLowerCase();
//       const matchesSearch = combined.includes(search.toLowerCase());

//       if (!matchesSearch) return false;

//       // Numeric filters
//       for (const key of Object.keys(numericFilters) as NumericFilterKey[]) {
//         const filter = numericFilters[key];
//         if (!filter) continue;

//         const value = getNumericValue(row, key);
//         if (value === null) return false;

//         const min = filter.min !== "" ? Number(filter.min) : null;
//         const max = filter.max !== "" ? Number(filter.max) : null;

//         if (min !== null && value < min) return false;
//         if (max !== null && value > max) return false;
//       }

//       // Text filters
//       for (const key of Object.keys(textFilters) as TextFilterKey[]) {
//         const filter = textFilters[key];
//         if (!filter || !filter.trim()) continue;

//         const value = String(row[key]).toLowerCase();
//         if (!value.includes(filter.toLowerCase().trim())) return false;
//       }

//       return true;
//     });
//   }, [search, numericFilters, textFilters]);

//   const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

//   const paginated = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;
//     return filtered.slice(start, start + PAGE_SIZE);
//   }, [filtered, page]);

//   const handleExportCSV = () => {
//     const headers = [
//       "S.N.",
//       "Devices",
//       "Centre Code",
//       "City",
//       "RM",
//       "Name",
//       "Total",
//       "Enrollments",
//       "Walkins",
//       "FR count",
//       "CSR",
//       "Duplicate",
//       "Data download",
//     ];

//     const rows = filtered.map((row) => [
//       row.sn,
//       row.devices,
//       row.centreCode,
//       row.city,
//       row.rm,
//       row.name,
//       row.total,
//       row.enrollments,
//       row.walkins,
//       row.fr,
//       row.csr ?? "-",
//       row.duplicate,
//       row.dataDownload,
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) =>
//         row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
//       )
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "exam-records.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);
//   };

//   const handleExportPDF = () => {
//     window.print();
//   };

//   const goToPage = (p: number) => {
//     if (p >= 1 && p <= totalPages) setPage(p);
//   };

//   const openNumericPopup = (key: NumericFilterKey) => {
//     setOpenTextFilter(null);
//     setOpenNumericFilter((prev) => (prev === key ? null : key));
//     const existing = numericFilters[key];
//     setNumericDraft({
//       min: existing?.min ?? "",
//       max: existing?.max ?? "",
//     });
//   };

//   const applyNumericFilter = () => {
//     if (!openNumericFilter) return;

//     const isEmpty = numericDraft.min === "" && numericDraft.max === "";

//     setNumericFilters((prev) => {
//       const next = { ...prev };
//       if (isEmpty) {
//         delete next[openNumericFilter];
//       } else {
//         next[openNumericFilter] = {
//           min: numericDraft.min,
//           max: numericDraft.max,
//         };
//       }
//       return next;
//     });

//     setPage(1);
//     setOpenNumericFilter(null);
//   };

//   const resetNumericFilter = () => {
//     if (!openNumericFilter) return;

//     setNumericFilters((prev) => {
//       const next = { ...prev };
//       delete next[openNumericFilter];
//       return next;
//     });

//     setNumericDraft({ min: "", max: "" });
//     setPage(1);
//     setOpenNumericFilter(null);
//   };

//   const openTextPopup = (key: TextFilterKey) => {
//     setOpenNumericFilter(null);
//     setOpenTextFilter((prev) => (prev === key ? null : key));
//     setTextDraft(textFilters[key] ?? "");
//   };

//   const applyTextFilter = () => {
//     if (!openTextFilter) return;

//     const value = textDraft.trim();

//     setTextFilters((prev) => {
//       const next = { ...prev };
//       if (!value) {
//         delete next[openTextFilter];
//       } else {
//         next[openTextFilter] = value;
//       }
//       return next;
//     });

//     setPage(1);
//     setOpenTextFilter(null);
//   };

//   const resetTextFilter = () => {
//     if (!openTextFilter) return;

//     setTextFilters((prev) => {
//       const next = { ...prev };
//       delete next[openTextFilter];
//       return next;
//     });

//     setTextDraft("");
//     setPage(1);
//     setOpenTextFilter(null);
//   };

//   const clearAllFilters = () => {
//     setsearch("");
//     setNumericFilters({});
//     setTextFilters({});
//     setOpenNumericFilter(null);
//     setOpenTextFilter(null);
//     setNumericDraft({ min: "", max: "" });
//     setTextDraft("");
//     setPage(1);
//   };

//   const FilterIconButton = ({
//     active,
//     onClick,
//   }: {
//     active: boolean;
//     onClick: () => void;
//   }) => (
//     <button
//       type="button"
//       onClick={(e) => {
//         e.stopPropagation();
//         onClick();
//       }}
//       className={`inline-flex items-center justify-center rounded p-0.5 transition-colors ${
//         active ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
//       }`}
//     >
//       <Filter className="h-3.5 w-3.5" />
//     </button>
//   );

//   const NumericFilterPopup = ({
//     title,
//   }: {
//     title: string;
//   }) => (
//     <div
//       ref={numericFilterRef}
//       className="absolute top-full left-1/2 z-50 mt-2 w-56 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div className="mb-2 text-left text-[11px] font-semibold text-slate-600">
//         Filter {title}
//       </div>

//       <div className="space-y-2">
//         <input
//           type="number"
//           placeholder="Min"
//           value={numericDraft.min}
//           onChange={(e) =>
//             setNumericDraft((prev) => ({ ...prev, min: e.target.value }))
//           }
//           className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
//         />
//         <input
//           type="number"
//           placeholder="Max"
//           value={numericDraft.max}
//           onChange={(e) =>
//             setNumericDraft((prev) => ({ ...prev, max: e.target.value }))
//           }
//           className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
//         />
//       </div>

//       <div className="mt-3 flex gap-2">
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           className="h-7 flex-1 text-[11px]"
//           onClick={resetNumericFilter}
//         >
//           Reset
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           className="h-7 flex-1 bg-blue-600 hover:bg-blue-700 text-[11px]"
//           onClick={applyNumericFilter}
//         >
//           Apply
//         </Button>
//       </div>
//     </div>
//   );

//   const TextFilterPopup = ({
//     title,
//   }: {
//     title: string;
//   }) => (
//     <div
//       ref={textFilterRef}
//       className="absolute top-full left-1/2 z-50 mt-2 w-60 -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-3 shadow-lg"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <div className="mb-2 text-left text-[11px] font-semibold text-slate-600">
//         Filter {title}
//       </div>

//       <input
//         type="text"
//         placeholder={`Type ${title.toLowerCase()}...`}
//         value={textDraft}
//         onChange={(e) => setTextDraft(e.target.value)}
//         className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
//       />

//       <div className="mt-3 flex gap-2">
//         <Button
//           type="button"
//           size="sm"
//           variant="outline"
//           className="h-7 flex-1 text-[11px]"
//           onClick={resetTextFilter}
//         >
//           Reset
//         </Button>
//         <Button
//           type="button"
//           size="sm"
//           className="h-7 flex-1 bg-blue-600 hover:bg-blue-700 text-[11px]"
//           onClick={applyTextFilter}
//         >
//           Apply
//         </Button>
//       </div>
//     </div>
//   );

//   const activeFilterCount =
//     Object.keys(numericFilters).length + Object.keys(textFilters).length;

//   return (
//     <div className="min-h-screen bg-white p-8 font-[Geist,system-ui,sans-serif]">
//       {/* Top controls */}
//       <div className="flex justify-end gap-3 items-center mb-4 flex-wrap">
//         {/* LEFT: Search Filter */}
//         <input
//           type="text"
//           placeholder="Search anything..."
//           value={search}
//           onChange={(e) => {
//             setsearch(e.target.value);
//             setPage(1);
//           }}
//           className="w-64 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500"
//         />

//         {activeFilterCount > 0 && (
//           <Button
//             size="sm"
//             variant="outline"
//             onClick={clearAllFilters}
//             className="h-8 text-xs text-slate-600 gap-1"
//           >
//             <X className="w-3.5 h-3.5" />
//             Clear Filters
//           </Button>
//         )}

//         {/* RIGHT: Export Button */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button
//               size="sm"
//               variant="outline"
//               className="h-8 text-xs text-slate-600 gap-1"
//             >
//               <Download className="w-3.5 h-3.5" />
//               Export
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end" className="text-sm">
//             <DropdownMenuItem onClick={handleExportCSV}>
//               Export CSV
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleExportPDF}>
//               Export PDF
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>

//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
//         <table className="min-w-full border-collapse text-[11px]">
//           <thead>
//             <tr className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 S.N.
//               </th>

//               {/* Devices - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   Devices
//                   <FilterIconButton
//                     active={hasNumericFilter("devices")}
//                     onClick={() => openNumericPopup("devices")}
//                   />
//                 </div>
//                 {openNumericFilter === "devices" && (
//                   <NumericFilterPopup title="Devices" />
//                 )}
//               </th>

//               {/* Centre Code - numeric, icon below */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex flex-col items-center leading-tight">
//                   <span>Centre</span>
//                   <span>Code</span>
//                   <span className="mt-0.5">
//                     <FilterIconButton
//                       active={hasNumericFilter("centreCode")}
//                       onClick={() => openNumericPopup("centreCode")}
//                     />
//                   </span>
//                 </div>
//                 {openNumericFilter === "centreCode" && (
//                   <NumericFilterPopup title="Centre Code" />
//                 )}
//               </th>

//               {/* City - text */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   City
//                   <FilterIconButton
//                     active={hasTextFilter("city")}
//                     onClick={() => openTextPopup("city")}
//                   />
//                 </div>
//                 {openTextFilter === "city" && <TextFilterPopup title="City" />}
//               </th>

//               {/* RM - text */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   RM
//                   <FilterIconButton
//                     active={hasTextFilter("rm")}
//                     onClick={() => openTextPopup("rm")}
//                   />
//                 </div>
//                 {openTextFilter === "rm" && <TextFilterPopup title="RM" />}
//               </th>

//               {/* Name - text */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   Name
//                   <FilterIconButton
//                     active={hasTextFilter("name")}
//                     onClick={() => openTextPopup("name")}
//                   />
//                 </div>
//                 {openTextFilter === "name" && <TextFilterPopup title="Name" />}
//               </th>

//               {/* Total - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   Total
//                   <FilterIconButton
//                     active={hasNumericFilter("total")}
//                     onClick={() => openNumericPopup("total")}
//                   />
//                 </div>
//                 {openNumericFilter === "total" && (
//                   <NumericFilterPopup title="Total" />
//                 )}
//               </th>

//               {/* Enrollments - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   Enrollments
//                   <FilterIconButton
//                     active={hasNumericFilter("enrollments")}
//                     onClick={() => openNumericPopup("enrollments")}
//                   />
//                 </div>
//                 {openNumericFilter === "enrollments" && (
//                   <NumericFilterPopup title="Enrollments" />
//                 )}
//               </th>

//               {/* Walkins - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   Walkins
//                   <FilterIconButton
//                     active={hasNumericFilter("walkins")}
//                     onClick={() => openNumericPopup("walkins")}
//                   />
//                 </div>
//                 {openNumericFilter === "walkins" && (
//                   <NumericFilterPopup title="Walkins" />
//                 )}
//               </th>

//               {/* FR count - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   FR count
//                   <FilterIconButton
//                     active={hasNumericFilter("fr")}
//                     onClick={() => openNumericPopup("fr")}
//                   />
//                 </div>
//                 {openNumericFilter === "fr" && (
//                   <NumericFilterPopup title="FR count" />
//                 )}
//               </th>

//               {/* CSR - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   CSR
//                   <FilterIconButton
//                     active={hasNumericFilter("csr")}
//                     onClick={() => openNumericPopup("csr")}
//                   />
//                 </div>
//                 {openNumericFilter === "csr" && (
//                   <NumericFilterPopup title="CSR" />
//                 )}
//               </th>

//               {/* Duplicate - numeric */}
//               <th className="relative px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 <div className="inline-flex items-center gap-1">
//                   Duplicate
//                   <FilterIconButton
//                     active={hasNumericFilter("duplicate")}
//                     onClick={() => openNumericPopup("duplicate")}
//                   />
//                 </div>
//                 {openNumericFilter === "duplicate" && (
//                   <NumericFilterPopup title="Duplicate" />
//                 )}
//               </th>

//               {/* Data download - keep same, no filter */}
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Data
//                 <br />
//                 download
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginated.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={13}
//                   className="text-center py-16 text-slate-400 text-sm"
//                 >
//                   No records found.
//                 </td>
//               </tr>
//             ) : (
//               paginated.map((row, idx) => (
//                 <tr
//                   key={row.sn + "-" + idx}
//                   className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
//                 >
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-500 font-medium">
//                     {(page - 1) * PAGE_SIZE + idx + 1}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[13px] text-slate-700">
//                     {row.devices}
//                   </td>
//                   <td className="px-2 py-3 text-center">
//                     <span className="text-[13px] font-semibold text-blue-600 cursor-pointer hover:underline">
//                       {row.centreCode}
//                     </span>
//                   </td>
//                   <td className="px-2 py-3 text-[12px] text-slate-700 whitespace-nowrap">
//                     {row.city}
//                   </td>
//                   <td className="px-2 py-3 text-[12px] text-slate-700 whitespace-nowrap">
//                     {row.rm}
//                   </td>
//                   <td className="px-2 py-3 text-[12px] text-slate-700 max-w-xs">
//                     {row.name}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700">
//                     {row.total}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700">
//                     {row.enrollments}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700">
//                     {row.walkins}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700">
//                     {row.fr}
//                   </td>
//                   <td className="px-2 py-3 text-center">
//                     {row.csr !== null && (
//                       <span
//                         className={`inline-block px-2 py-0.5 rounded text-white font-semibold ${row.csrColor}`}
//                       >
//                         {row.csr}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700">
//                     {row.duplicate}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700">
//                     {row.dataDownload}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {filtered.length > 0 && (
//           <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
//             <span className="text-[11px] text-slate-400">
//               Showing {(page - 1) * PAGE_SIZE + 1}–
//               {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} records
//             </span>

//             <div className="flex items-center gap-1">
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="h-7 w-7"
//                 disabled={page === 1}
//                 onClick={() => goToPage(page - 1)}
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </Button>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
//                 <Button
//                   key={p}
//                   size="sm"
//                   variant={p === page ? "default" : "ghost"}
//                   className={`h-7 w-7 text-xs ${
//                     p === page
//                       ? "bg-rose-500 hover:bg-rose-600 text-white"
//                       : ""
//                   }`}
//                   onClick={() => goToPage(p)}
//                 >
//                   {p}
//                 </Button>
//               ))}

//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="h-7 w-7"
//                 disabled={page === totalPages}
//                 onClick={() => goToPage(page + 1)}
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }