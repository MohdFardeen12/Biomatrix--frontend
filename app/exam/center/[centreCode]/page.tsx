"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  Download,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ArrowDownUp,
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StudentRow {
  rollNo: string;
  name: string;
  walkin: string;
  time: string;
  status: "Present" | "Absent";
}

interface CenterDetails {
  centreCode: string;
  centreName: string;
  city: string;
  totalStudents: number;
  students: StudentRow[];
}

// DUMMY STATIC DATA
const dummyCenterData: Record<string, CenterDetails> = {
  "156008": {
    centreCode: "156008",
    centreName: "AIWC ACADEMY OF EXCELLENCE JAMSHEDPUR",
    city: "JH-Jamshedpur",
    totalStudents: 12,
    students: [
      { rollNo: "1001", name: "Aman Kumar", walkin: "No", time: "9:00 AM", status: "Present" },
      { rollNo: "1002", name: "Riya Singh", walkin: "Yes", time: "10:20 AM", status: "Absent" },
      { rollNo: "1003", name: "Mohit Das", walkin: "No", time: "11:45 AM", status: "Present" },
      { rollNo: "1004", name: "Sana Khan", walkin: "Yes", time: "12:10 PM", status: "Present" },
      { rollNo: "1005", name: "Rohit Shaw", walkin: "No", time: "1:34 PM", status: "Absent" },
      { rollNo: "1006", name: "Pooja Mishra", walkin: "No", time: "9:30 AM", status: "Present" },
      { rollNo: "1007", name: "Deepak Yadav", walkin: "Yes", time: "2:15 PM", status: "Present" },
      { rollNo: "1008", name: "Sneha Paul", walkin: "No", time: "11:00 AM", status: "Absent" },
      { rollNo: "1009", name: "Ankit Kumar", walkin: "No", time: "8:45 AM", status: "Present" },
      { rollNo: "1010", name: "Nisha Kumari", walkin: "Yes", time: "3:10 PM", status: "Present" },
      { rollNo: "1011", name: "Vikash Singh", walkin: "No", time: "10:50 AM", status: "Absent" },
      { rollNo: "1012", name: "Rahul Das", walkin: "Yes", time: "12:40 PM", status: "Present" },
    ],
  },

  "156018": {
    centreCode: "156018",
    centreName: "DAV PUBLIC SCHOOL AGRA",
    city: "UP-Agra",
    totalStudents: 11,
    students: [
      { rollNo: "2001", name: "Rahul Verma", walkin: "No", time: "10:00 AM", status: "Present" },
      { rollNo: "2002", name: "Priya Sharma", walkin: "Yes", time: "12:23 PM", status: "Present" },
      { rollNo: "2003", name: "Arjun Yadav", walkin: "No", time: "11:00 AM", status: "Absent" },
      { rollNo: "2004", name: "Neha Gupta", walkin: "No", time: "3:00 PM", status: "Present" },
      { rollNo: "2005", name: "Karan Singh", walkin: "Yes", time: "7:15 AM", status: "Absent" },
      { rollNo: "2006", name: "Simran Kaur", walkin: "No", time: "9:40 AM", status: "Present" },
      { rollNo: "2007", name: "Manish Tiwari", walkin: "Yes", time: "1:10 PM", status: "Present" },
      { rollNo: "2008", name: "Ritu Saxena", walkin: "No", time: "2:25 PM", status: "Absent" },
      { rollNo: "2009", name: "Amit Chauhan", walkin: "No", time: "8:55 AM", status: "Present" },
      { rollNo: "2010", name: "Kavita Jain", walkin: "Yes", time: "11:35 AM", status: "Present" },
      { rollNo: "2011", name: "Sunil Gupta", walkin: "No", time: "4:00 PM", status: "Absent" },
    ],
  },

  "156011": {
    centreCode: "156011",
    centreName: "ST MARY SCHOOL BISTUPUR",
    city: "JH-Dhanbad",
    totalStudents: 10,
    students: [
      { rollNo: "3001", name: "Aditya Raj", walkin: "No", time: "9:05 AM", status: "Present" },
      { rollNo: "3002", name: "Priti Kumari", walkin: "Yes", time: "10:30 AM", status: "Present" },
      { rollNo: "3003", name: "Saurabh Kumar", walkin: "No", time: "11:15 AM", status: "Absent" },
      { rollNo: "3004", name: "Neelam Devi", walkin: "No", time: "12:45 PM", status: "Present" },
      { rollNo: "3005", name: "Rakesh Yadav", walkin: "Yes", time: "2:00 PM", status: "Absent" },
      { rollNo: "3006", name: "Jyoti Singh", walkin: "No", time: "9:50 AM", status: "Present" },
      { rollNo: "3007", name: "Vivek Sharma", walkin: "Yes", time: "1:20 PM", status: "Present" },
      { rollNo: "3008", name: "Anjali Kumari", walkin: "No", time: "3:30 PM", status: "Absent" },
      { rollNo: "3009", name: "Kunal Das", walkin: "No", time: "8:40 AM", status: "Present" },
      { rollNo: "3010", name: "Meena Kumari", walkin: "Yes", time: "11:55 AM", status: "Present" },
    ],
  },

  "156014": {
    centreCode: "156014",
    centreName: "VALLEY VIEW SCHOOL TELCO",
    city: "JH-Ranchi",
    totalStudents: 13,
    students: [
      { rollNo: "4001", name: "Rohit Kumar", walkin: "No", time: "9:10 AM", status: "Present" },
      { rollNo: "4002", name: "Sneha Singh", walkin: "Yes", time: "10:40 AM", status: "Present" },
      { rollNo: "4003", name: "Aakash Verma", walkin: "No", time: "11:20 AM", status: "Absent" },
      { rollNo: "4004", name: "Pooja Kumari", walkin: "No", time: "12:30 PM", status: "Present" },
      { rollNo: "4005", name: "Rahul Gupta", walkin: "Yes", time: "1:50 PM", status: "Present" },
      { rollNo: "4006", name: "Neha Sharma", walkin: "No", time: "2:40 PM", status: "Absent" },
      { rollNo: "4007", name: "Manoj Singh", walkin: "Yes", time: "3:10 PM", status: "Present" },
      { rollNo: "4008", name: "Kiran Devi", walkin: "No", time: "9:25 AM", status: "Present" },
      { rollNo: "4009", name: "Ankit Yadav", walkin: "No", time: "10:05 AM", status: "Absent" },
      { rollNo: "4010", name: "Ritu Kumari", walkin: "Yes", time: "11:35 AM", status: "Present" },
      { rollNo: "4011", name: "Sanjay Kumar", walkin: "No", time: "1:15 PM", status: "Present" },
      { rollNo: "4012", name: "Deepika Sharma", walkin: "Yes", time: "2:55 PM", status: "Absent" },
      { rollNo: "4013", name: "Vikas Kumar", walkin: "No", time: "8:50 AM", status: "Present" },
    ],
  },

  "156030": {
    centreCode: "156030",
    centreName: "DELHI PUBLIC SCHOOL DELHI",
    city: "DL-Delhi",
    totalStudents: 15,
    students: [
      { rollNo: "5001", name: "Aryan Mehta", walkin: "No", time: "9:00 AM", status: "Present" },
      { rollNo: "5002", name: "Isha Kapoor", walkin: "Yes", time: "10:10 AM", status: "Present" },
      { rollNo: "5003", name: "Kabir Singh", walkin: "No", time: "11:00 AM", status: "Absent" },
      { rollNo: "5004", name: "Riya Malhotra", walkin: "No", time: "12:20 PM", status: "Present" },
      { rollNo: "5005", name: "Aditya Khanna", walkin: "Yes", time: "1:30 PM", status: "Present" },
      { rollNo: "5006", name: "Simran Arora", walkin: "No", time: "2:15 PM", status: "Absent" },
      { rollNo: "5007", name: "Kunal Bansal", walkin: "Yes", time: "3:05 PM", status: "Present" },
      { rollNo: "5008", name: "Neha Verma", walkin: "No", time: "9:35 AM", status: "Present" },
      { rollNo: "5009", name: "Rahul Arora", walkin: "No", time: "10:45 AM", status: "Absent" },
      { rollNo: "5010", name: "Pooja Mehta", walkin: "Yes", time: "11:55 AM", status: "Present" },
      { rollNo: "5011", name: "Sahil Gupta", walkin: "No", time: "1:05 PM", status: "Present" },
      { rollNo: "5012", name: "Nikita Sharma", walkin: "Yes", time: "2:25 PM", status: "Absent" },
      { rollNo: "5013", name: "Vikas Arora", walkin: "No", time: "3:40 PM", status: "Present" },
      { rollNo: "5014", name: "Anjali Mehra", walkin: "Yes", time: "8:50 AM", status: "Present" },
      { rollNo: "5015", name: "Rohit Kapoor", walkin: "No", time: "9:20 AM", status: "Absent" },
    ],
  },
};

// SORT / FILTER TYPES
type SortKey = "rollNo" | "name" | "walkin" | "time" | "status";
type SortDirection = "asc" | "desc" | null;
type FilterFieldKey = "rollNo" | "name" | "walkin" | "time" | "status";

interface FilterField {
  key: FilterFieldKey;
  label: string;
}

const FILTER_FIELDS: FilterField[] = [
  { key: "rollNo", label: "Roll No" },
  { key: "name", label: "Name" },
  { key: "walkin", label: "Walkin" },
  { key: "time", label: "Time" },
  { key: "status", label: "Present / Absent" },
];

interface TextFilter {
  value: string;
}

interface TimeRangeFilter {
  from?: string;
  to?: string;
}

interface ActiveFilters {
  text: Partial<Record<Exclude<FilterFieldKey, "time">, TextFilter>>;
  time?: TimeRangeFilter;
}

// HELPERS
const emptyFilters = (): ActiveFilters => ({ text: {} });

function countActiveFilters(f: ActiveFilters) {
  const textCount = Object.values(f.text).filter((v) => v && v.value.trim() !== "").length;
  const timeCount = f.time && (f.time.from || f.time.to) ? 1 : 0;
  return textCount + timeCount;
}

function parseTimeToMinutes(time: string) {
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function convert24HourToMinutes(time24: string) {
  const [hours, minutes] = time24.split(":").map(Number);
  return hours * 60 + minutes;
}

function format24To12Hour(time24: string) {
  if (!time24) return "";

  const [hourStr, minuteStr] = time24.split(":");
  let hours = Number(hourStr);
  const minutes = minuteStr;
  const modifier = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours - 12;
  }

  return `${hours}:${minutes} ${modifier}`;
}

// SORT ICON BUTTON
function SortIconButton({
  columnKey,
  sortKey,
  sortDirection,
  onSort,
  isText,
}: {
  columnKey: SortKey;
  sortKey: SortKey | null;
  sortDirection: SortDirection;
  onSort: (k: SortKey) => void;
  isText?: boolean;
}) {
  const isActive = sortKey === columnKey;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onSort(columnKey);
      }}
      className={`inline-flex items-center justify-center rounded p-0.5 transition-colors ${
        isActive ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      {!isActive || !sortDirection ? (
        <ArrowDownUp className="h-3.5 w-3.5" />
      ) : isText ? (
        sortDirection === "asc" ? (
          <ArrowDownAZ className="h-3.5 w-3.5" />
        ) : (
          <ArrowUpAZ className="h-3.5 w-3.5" />
        )
      ) : (
        <ArrowDownUp
          className={`h-3.5 w-3.5 ${sortDirection === "asc" ? "rotate-180" : ""}`}
        />
      )}
    </button>
  );
}

// FILTER SIDEBAR
function SidebarFilter({
  open,
  onClose,
  filters,
  onApply,
  onClearAll,
}: {
  open: boolean;
  onClose: () => void;
  filters: ActiveFilters;
  onApply: (f: ActiveFilters) => void;
  onClearAll: () => void;
}) {
  const [draft, setDraft] = useState<ActiveFilters>(() =>
    JSON.parse(JSON.stringify(filters))
  );

  const [expanded, setExpanded] = useState<Partial<Record<FilterFieldKey, boolean>>>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(filters)));
  }, [filters]);

  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const toggle = (key: FilterFieldKey) =>
    setExpanded((p) => ({ ...p, [key]: !p[key] }));

  const setText = (key: Exclude<FilterFieldKey, "time">, value: string) =>
    setDraft((p) => ({
      ...p,
      text: { ...p.text, [key]: { value } },
    }));

  const setTimeRange = (type: "from" | "to", value: string) =>
    setDraft((p) => ({
      ...p,
      time: {
        ...p.time,
        [type]: value,
      },
    }));

  const clearField = (key: FilterFieldKey) =>
    setDraft((p) => {
      const n = JSON.parse(JSON.stringify(p)) as ActiveFilters;

      if (key === "time") {
        delete n.time;
      } else {
        delete n.text[key];
      }

      return n;
    });

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleClearAll = () => {
    setDraft(emptyFilters());
    setExpanded({});
    onClearAll();
  };

  const draftCount = countActiveFilters(draft);

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        ref={ref}
        className={`fixed top-0 right-0 z-40 h-full w-80 bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
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

        <div className="flex-1 overflow-y-auto py-2">
          {FILTER_FIELDS.map((field) => {
            const isOpen = !!expanded[field.key];

            const hasValue =
              field.key === "time"
                ? !!(draft.time?.from || draft.time?.to)
                : !!(draft.text[field.key as Exclude<FilterFieldKey, "time">]?.value?.trim());

            const val =
              field.key === "time"
                ? null
                : draft.text[field.key as Exclude<FilterFieldKey, "time">];

            return (
              <div key={field.key} className="border-b border-slate-100 last:border-0">
                <button
                  type="button"
                  onClick={() => toggle(field.key)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-slate-700">{field.label}</span>
                    {hasValue && <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {hasValue && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearField(field.key);
                        }}
                        className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        Clear
                      </button>
                    )}

                    {isOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1">
                    {field.key === "time" ? (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                            From Time
                          </label>
                          <input
                            type="time"
                            value={draft.time?.from ?? ""}
                            onChange={(e) => setTimeRange("from", e.target.value)}
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                            To Time
                          </label>
                          <input
                            type="time"
                            value={draft.time?.to ?? ""}
                            onChange={(e) => setTimeRange("to", e.target.value)}
                            className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                          Search
                        </label>
                        <input
                          type="text"
                          value={val?.value ?? ""}
                          onChange={(e) =>
                            setText(field.key as Exclude<FilterFieldKey, "time">, e.target.value)
                          }
                          placeholder={`Search ${field.label.toLowerCase()}...`}
                          className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

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

/* =========================================================
   MAIN PAGE COMPONENT
========================================================= */
  
  //--------------------modalopening logic----------------------

  function CandidateDetailsModal({
    open,
    onClose,
    student,
  }: {
      open: boolean;
      onClose: () => void;
      student: StudentRow | null;
  })  
  {
      if (!open || !student) return null;
    
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-6xl rounded-xl bg-white shadow-2xl border border-slate-200">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
    
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-2xl font-semibold text-center text-slate-800">
                Candidate Details of Roll No: {student.rollNo}
              </h2>
            </div>
    
            <div className="p-4 md:p-6 overflow-x-auto">
              <table className="min-w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Roll No.
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Name
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Original Photo
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Photo
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Finger
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Iris
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Device
                    </th>
                    <th className="border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700">
                      Scanned
                    </th>
                  </tr>
                </thead>
    
                <tbody>
                  <tr>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700">
                      {student.rollNo}
                    </td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700">
                      {student.name}
                    </td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700"></td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700"></td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700"></td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700"></td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700"></td>
                    <td className="border border-slate-300 px-4 py-8 text-center text-slate-700"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
  }

export default function CentreDetailsPage() {
  const params = useParams();
  const centreCode = params.centreCode as string;

  // PAGE STATE
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(emptyFilters());
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  //modal opening for student details
  const [selectedStudent, setSelectedStudent] = useState<StudentRow | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // DATA + CONSTANTS
  const center = dummyCenterData[centreCode];
  const PAGE_SIZE = 5;
  const filterBadgeCount = countActiveFilters(activeFilters);

  // INVALID CENTER FALLBACK
  if (!center) {
    return (
      <div className="min-h-screen bg-white p-8 font-[Geist,system-ui,sans-serif]">
        <div className="mb-4">
          <Link href="/exam">
            <Button variant="outline" size="sm">← Back to Exam Page</Button>
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 p-6 text-slate-500">
          No center data found for code: <span className="font-semibold">{centreCode}</span>
        </div>
      </div>
    );
  }

  // FILTERING
  const filteredStudents = useMemo(() => {
    let data = [...center.students];

    for (const [key, f] of Object.entries(activeFilters.text) as [
      Exclude<FilterFieldKey, "time">,
      TextFilter
    ][]) {
      if (!f || f.value.trim() === "") continue;
      const q = f.value.trim().toLowerCase();

      data = data.filter((student) =>
        String(student[key]).toLowerCase().includes(q)
      );
    }

    if (activeFilters.time?.from || activeFilters.time?.to) {
      const fromMinutes = activeFilters.time?.from
        ? convert24HourToMinutes(activeFilters.time.from)
        : null;
      const toMinutes = activeFilters.time?.to
        ? convert24HourToMinutes(activeFilters.time.to)
        : null;

      data = data.filter((student) => {
        const studentMinutes = parseTimeToMinutes(student.time);

        if (fromMinutes !== null && toMinutes !== null) {
          return studentMinutes >= fromMinutes && studentMinutes <= toMinutes;
        }

        if (fromMinutes !== null) {
          return studentMinutes >= fromMinutes;
        }

        if (toMinutes !== null) {
          return studentMinutes <= toMinutes;
        }

        return true;
      });
    }

    return data;
  }, [center.students, activeFilters]);

  // SORTING
  const sortedStudents = useMemo(() => {
    if (!sortKey || !sortDirection) return filteredStudents;

    return [...filteredStudents].sort((a, b) => {
      if (sortKey === "rollNo") {
        const aNum = Number(a.rollNo);
        const bNum = Number(b.rollNo);
        return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
      }

      if (sortKey === "time") {
        const aTime = parseTimeToMinutes(a.time);
        const bTime = parseTimeToMinutes(b.time);
        return sortDirection === "asc" ? aTime - bTime : bTime - aTime;
      }

      const aVal = String(a[sortKey]).toLowerCase();
      const bVal = String(b[sortKey]).toLowerCase();

      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [filteredStudents, sortKey, sortDirection]);

  // SORT CLICK
  const handleSort = (key: SortKey) => {
    setPage(1);

    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }

    setSortKey(null);
    setSortDirection(null);
  };

  // PAGINATION
  const totalPages = Math.ceil(sortedStudents.length / PAGE_SIZE);

  const paginatedStudents = sortedStudents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // EXPORT CSV
  const exportToCSV = () => {
    const headers = ["Roll No", "Name", "Walkin", "Time", "Present / Absent"];

    const rows = sortedStudents.map((student) => [
      student.rollNo,
      student.name,
      student.walkin,
      student.time,
      student.status,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${center.centreCode}-students-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // EXPORT PDF / PRINT
  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const rowsHtml = sortedStudents
      .map(
        (student, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.walkin}</td>
            <td>${student.time}</td>
            <td>${student.status}</td>
          </tr>
        `
      )
      .join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Centre Students Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
            h1 { font-size: 20px; margin-bottom: 8px; }
            p { font-size: 12px; color: #64748b; margin-bottom: 16px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #e2e8f0; padding: 8px; text-align: left; }
            th { background: #f8fafc; color: #475569; text-transform: uppercase; font-size: 11px; letter-spacing: .04em; }
          </style>
        </head>
        <body>
          <h1>Centre Students Report</h1>
          <p>Centre: ${center.centreName} (${center.centreCode})</p>
          <p>Generated on ${new Date().toLocaleString("en-IN")}</p>
          <table>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Walkin</th>
                <th>Time</th>
                <th>Present / Absent</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="min-h-screen bg-white p-8 font-[Geist,system-ui,sans-serif]">
      <SidebarFilter
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={activeFilters}
        onApply={(f) => {
          setActiveFilters(f);
          setPage(1);
        }}
        onClearAll={() => {
          setActiveFilters(emptyFilters());
          setPage(1);
        }}
      />

      {/* ------------ Candidate Details Modal ---------------- */}

      <CandidateDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        student={selectedStudent}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/exam">
          <Button variant="outline" size="sm">← Back to Exam Page</Button>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setSidebarOpen(true)}
            className={`gap-2 ${
              filterBadgeCount > 0
                ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters

            {filterBadgeCount > 0 && (
              <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {filterBadgeCount}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={exportToCSV}>Export CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDF}>Export PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {filterBadgeCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.entries(activeFilters.text) as [
            Exclude<FilterFieldKey, "time">,
            TextFilter
          ][]).map(([key, f]) => {
            if (!f || f.value.trim() === "") return null;
            const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key;

            return (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium"
              >
                {label}: "{f.value}"

                <button
                  onClick={() => {
                    const n = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                    delete n.text[key];
                    setActiveFilters(n);
                    setPage(1);
                  }}
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}

          {(activeFilters.time?.from || activeFilters.time?.to) && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
              Time: "{activeFilters.time?.from ? format24To12Hour(activeFilters.time.from) : "Any"} - {activeFilters.time?.to ? format24To12Hour(activeFilters.time.to) : "Any"}"

              <button
                onClick={() => {
                  const n = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                  delete n.time;
                  setActiveFilters(n);
                  setPage(1);
                }}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={() => {
              setActiveFilters(emptyFilters());
              setPage(1);
            }}
            className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="mb-6 rounded-xl border border-slate-200 bg-white shadow-sm p-5">
        <h1 className="text-lg font-semibold text-slate-800 mb-4">Centre Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Centre Name</p>
            <p className="font-medium text-slate-800 mt-1">{center.centreName}</p>
          </div>

          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">Centre Code</p>
            <p className="font-medium text-slate-800 mt-1">{center.centreCode}</p>
          </div>

          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide">City</p>
            <p className="font-medium text-slate-800 mt-1">{center.city}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-[12px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">S No.</th>

                <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">
                  <div className="inline-flex items-center gap-1">
                    Roll No
                    <SortIconButton
                      columnKey="rollNo"
                      sortKey={sortKey}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </div>
                </th>

                <th className="px-3 py-3 text-left font-semibold text-slate-500 uppercase">
                  <div className="inline-flex items-center gap-1">
                    Name
                    <SortIconButton
                      columnKey="name"
                      sortKey={sortKey}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      isText
                    />
                  </div>
                </th>

                <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">
                  <div className="inline-flex items-center gap-1">
                    Walkin
                    <SortIconButton
                      columnKey="walkin"
                      sortKey={sortKey}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      isText
                    />
                  </div>
                </th>

                <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">
                  <div className="inline-flex items-center gap-1">
                    Time
                    <SortIconButton
                      columnKey="time"
                      sortKey={sortKey}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  </div>
                </th>

                <th className="px-3 py-3 text-center font-semibold text-slate-500 uppercase">
                  <div className="inline-flex items-center gap-1">
                    Present / Absent
                    <SortIconButton
                      columnKey="status"
                      sortKey={sortKey}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                      isText
                    />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedStudents.map((student, index) => (
                <tr
                  key={student.rollNo}
                  className="border-b border-slate-100 hover:bg-slate-50/70"
                >
                  <td className="px-3 py-3 text-center text-slate-700">
                    {(page - 1) * PAGE_SIZE + index + 1}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStudent(student);
                        setDetailsModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {student.rollNo}
                    </button>
                  </td>
                  <td className="px-3 py-3 text-slate-700">{student.name}</td>
                  <td className="px-3 py-3 text-center text-slate-700">{student.walkin}</td>
                  <td className="px-3 py-3 text-center text-slate-700">{student.time}</td>

                  <td className="px-3 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-white text-[11px] font-semibold ${
                        student.status === "Present" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
            <span className="text-xs text-slate-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sortedStudents.length)} of {sortedStudents.length} records
            </span>

            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-slate-500"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                {"<"}
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={p === page ? "default" : "ghost"}
                  className={`h-8 w-8 text-xs ${
                    p === page
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "text-slate-600"
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}

              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-slate-500"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                {">"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}