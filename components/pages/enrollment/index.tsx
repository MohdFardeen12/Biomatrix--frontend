// "use client";

// import React from "react";

// interface EnrollmentRow {
//   sn: number;
//   centerId: string;
//   deviceId: string;
//   operatorName: string;
//   loginTime: string;
//   enrolledStudentsPercent: string;
// }

// const enrollmentData: EnrollmentRow[] = [
//   {
//     sn: 1,
//     centerId: "156008",
//     deviceId: "DEV-001",
//     operatorName: "Amit Kumar",
//     loginTime: "09:15 AM",
//     enrolledStudentsPercent: "84%",
//   },
//   {
//     sn: 2,
//     centerId: "156008",
//     deviceId: "DEV-002",
//     operatorName: "Neha Singh",
//     loginTime: "09:22 AM",
//     enrolledStudentsPercent: "91%",
//   },
//   {
//     sn: 3,
//     centerId: "156008",
//     deviceId: "DEV-003",
//     operatorName: "Ravi Sharma",
//     loginTime: "09:30 AM",
//     enrolledStudentsPercent: "76%",
//   },
//   {
//     sn: 4,
//     centerId: "156008",
//     deviceId: "DEV-004",
//     operatorName: "Pooja Verma",
//     loginTime: "09:40 AM",
//     enrolledStudentsPercent: "88%",
//   },

//   {
//     sn: 5,
//     centerId: "156011",
//     deviceId: "DEV-005",
//     operatorName: "Suresh Yadav",
//     loginTime: "09:10 AM",
//     enrolledStudentsPercent: "82%",
//   },
//   {
//     sn: 6,
//     centerId: "156011",
//     deviceId: "DEV-006",
//     operatorName: "Anjali Gupta",
//     loginTime: "09:18 AM",
//     enrolledStudentsPercent: "90%",
//   },
//   {
//     sn: 7,
//     centerId: "156011",
//     deviceId: "DEV-007",
//     operatorName: "Deepak Mishra",
//     loginTime: "09:25 AM",
//     enrolledStudentsPercent: "79%",
//   },

//   {
//     sn: 8,
//     centerId: "156014",
//     deviceId: "DEV-008",
//     operatorName: "Kavita Joshi",
//     loginTime: "09:05 AM",
//     enrolledStudentsPercent: "86%",
//   },
//   {
//     sn: 9,
//     centerId: "156014",
//     deviceId: "DEV-009",
//     operatorName: "Manoj Tiwari",
//     loginTime: "09:12 AM",
//     enrolledStudentsPercent: "83%",
//   },
//   {
//     sn: 10,
//     centerId: "156014",
//     deviceId: "DEV-010",
//     operatorName: "Priya Saxena",
//     loginTime: "09:28 AM",
//     enrolledStudentsPercent: "92%",
//   },
//   {
//     sn: 11,
//     centerId: "156014",
//     deviceId: "DEV-011",
//     operatorName: "Rahul Chauhan",
//     loginTime: "09:35 AM",
//     enrolledStudentsPercent: "87%",
//   },

//   {
//     sn: 12,
//     centerId: "156020",
//     deviceId: "DEV-012",
//     operatorName: "Sneha Kapoor",
//     loginTime: "09:08 AM",
//     enrolledStudentsPercent: "89%",
//   },
//   {
//     sn: 13,
//     centerId: "156020",
//     deviceId: "DEV-013",
//     operatorName: "Vikas Arora",
//     loginTime: "09:16 AM",
//     enrolledStudentsPercent: "81%",
//   },
//   {
//     sn: 14,
//     centerId: "156020",
//     deviceId: "DEV-014",
//     operatorName: "Nitin Bansal",
//     loginTime: "09:24 AM",
//     enrolledStudentsPercent: "85%",
//   },
//   {
//     sn: 15,
//     centerId: "156020",
//     deviceId: "DEV-015",
//     operatorName: "Ritu Malhotra",
//     loginTime: "09:32 AM",
//     enrolledStudentsPercent: "93%",
//   },
// ];

// export default function Enrollment() {
//   return (
//     <div className="min-h-screen bg-white px-8 py-2 font-[Geist,system-ui,sans-serif]">
//       <div className="mb-4 ml-2 mt-2">
//         <h1 className="text-lg font-semibold text-slate-900">Active Enrollment Overview</h1>
//       </div>

//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
//         <table className="min-w-full border-collapse text-[11px]">
//           <thead>
//             <tr className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 S.N.
//               </th>
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Center ID
//               </th>
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Device ID
//               </th>
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Operator Name
//               </th>
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Login Time
//               </th>
//               <th className="px-2 py-2 text-center text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
//                 Enrolled Students %
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {enrollmentData.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-16 text-slate-400 text-sm">
//                   No records found.
//                 </td>
//               </tr>
//             ) : (
//               enrollmentData.map((row) => (
//                 <tr
//                   key={row.sn}
//                   className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
//                 >
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-500 font-medium">
//                     {row.sn}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[13px] text-blue-600 font-medium">
//                     {row.centerId}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700 whitespace-nowrap">
//                     {row.deviceId}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700 whitespace-nowrap">
//                     {row.operatorName}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700 whitespace-nowrap">
//                     {row.loginTime}
//                   </td>
//                   <td className="px-2 py-3 text-center text-[12px] text-slate-700 font-medium">
//                     {row.enrolledStudentsPercent}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ArrowDownUp,
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EnrollmentRow {
  sn: number;
  centerId: string;
  deviceId: string;
  operatorName: string;
  loginTime: string;
  loginAddress: string;
  enrolledStudentsPercent: string;
}

type SortKey =
  | "centerId"
  | "deviceId"
  | "operatorName"
  | "loginTime"
  | "enrolledStudentsPercent";

type SortDirection = "asc" | "desc" | null;

type FilterFieldKey =
  | "centerId"
  | "deviceId"
  | "operatorName"
  | "loginTimeOnly"
  | "loginDateTime";

interface FilterField {
  key: FilterFieldKey;
  label: string;
  type: "text" | "time" | "datetime";
}

const FILTER_FIELDS: FilterField[] = [
  { key: "centerId", label: "Center ID", type: "text" },
  { key: "deviceId", label: "Device ID", type: "text" },
  { key: "operatorName", label: "Operator Name", type: "text" },
  { key: "loginTimeOnly", label: "Login Time (Time Only)", type: "time" },
  { key: "loginDateTime", label: "Login Date & Time", type: "datetime" },
];

interface TextFilter {
  value: string;
}
interface TimeRangeFilter {
  from: string;
  to: string;
}
interface DateTimeRangeFilter {
  from: string;
  to: string;
}

interface ActiveFilters {
  text: Partial<Record<"centerId" | "deviceId" | "operatorName", TextFilter>>;
  time: Partial<Record<"loginTimeOnly", TimeRangeFilter>>;
  datetime: Partial<Record<"loginDateTime", DateTimeRangeFilter>>;
}

const emptyFilters = (): ActiveFilters => ({
  text: {},
  time: {},
  datetime: {},
});

function countActiveFilters(f: ActiveFilters) {
  let count = 0;

  for (const v of Object.values(f.text)) {
    if (v && v.value.trim() !== "") count++;
  }

  for (const v of Object.values(f.time)) {
    if (v && (v.from !== "" || v.to !== "")) count++;
  }

  for (const v of Object.values(f.datetime)) {
    if (v && (v.from !== "" || v.to !== "")) count++;
  }

  return count;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const enrollmentData: EnrollmentRow[] = [
  {
    sn: 1,
    centerId: "156008",
    deviceId: "DEV-001",
    operatorName: "Amit Kumar",
    loginTime: "23 March, 2025 10:05 AM",
    loginAddress: "Sector 62, Noida, Uttar Pradesh",
    enrolledStudentsPercent: "84%",
  },
  {
    sn: 2,
    centerId: "156008",
    deviceId: "DEV-002",
    operatorName: "Neha Singh",
    loginTime: "05 April, 2025 09:22 AM",
    loginAddress: "Block B, Raj Nagar Extension, Ghaziabad, Uttar Pradesh",
    enrolledStudentsPercent: "91%",
  },
  {
    sn: 3,
    centerId: "156008",
    deviceId: "DEV-003",
    operatorName: "Ravi Sharma",
    loginTime: "11 May, 2025 09:30 AM",
    loginAddress: "Near City Center Mall, Gomti Nagar, Lucknow, Uttar Pradesh",
    enrolledStudentsPercent: "76%",
  },
  {
    sn: 4,
    centerId: "156008",
    deviceId: "DEV-004",
    operatorName: "Pooja Verma",
    loginTime: "02 June, 2025 09:40 AM",
    loginAddress: "Civil Lines, Prayagraj, Uttar Pradesh",
    enrolledStudentsPercent: "88%",
  },
  {
    sn: 5,
    centerId: "156011",
    deviceId: "DEV-005",
    operatorName: "Suresh Yadav",
    loginTime: "19 July, 2025 09:10 AM",
    loginAddress: "MG Road, Indore, Madhya Pradesh",
    enrolledStudentsPercent: "82%",
  },
  {
    sn: 6,
    centerId: "156011",
    deviceId: "DEV-006",
    operatorName: "Anjali Gupta",
    loginTime: "07 August, 2025 09:18 AM",
    loginAddress: "Vijay Nagar Square, Indore, Madhya Pradesh",
    enrolledStudentsPercent: "90%",
  },
  {
    sn: 7,
    centerId: "156011",
    deviceId: "DEV-007",
    operatorName: "Deepak Mishra",
    loginTime: "14 September, 2025 09:25 AM",
    loginAddress:
      "Flat 203, Shanti Residency, Near Metro Station, Vaishali, Ghaziabad, Uttar Pradesh",
    enrolledStudentsPercent: "79%",
  },
  {
    sn: 8,
    centerId: "156014",
    deviceId: "DEV-008",
    operatorName: "Kavita Joshi",
    loginTime: "03 October, 2025 09:05 AM",
    loginAddress: "Shastri Nagar, Meerut, Uttar Pradesh",
    enrolledStudentsPercent: "86%",
  },
  {
    sn: 9,
    centerId: "156014",
    deviceId: "DEV-009",
    operatorName: "Manoj Tiwari",
    loginTime: "21 November, 2025 09:12 AM",
    loginAddress: "Aliganj, Lucknow, Uttar Pradesh",
    enrolledStudentsPercent: "83%",
  },
  {
    sn: 10,
    centerId: "156014",
    deviceId: "DEV-010",
    operatorName: "Priya Saxena",
    loginTime: "09 December, 2025 09:28 AM",
    loginAddress:
      "House No. 45, Green Park Colony, Near District Court, Kanpur, Uttar Pradesh",
    enrolledStudentsPercent: "92%",
  },
  {
    sn: 11,
    centerId: "156014",
    deviceId: "DEV-011",
    operatorName: "Rahul Chauhan",
    loginTime: "15 January, 2026 09:35 AM",
    loginAddress: "Kavi Nagar, Ghaziabad, Uttar Pradesh",
    enrolledStudentsPercent: "87%",
  },
  {
    sn: 12,
    centerId: "156020",
    deviceId: "DEV-012",
    operatorName: "Sneha Kapoor",
    loginTime: "18 February, 2026 09:08 AM",
    loginAddress: "Model Town, Ludhiana, Punjab",
    enrolledStudentsPercent: "89%",
  },
  {
    sn: 13,
    centerId: "156020",
    deviceId: "DEV-013",
    operatorName: "Vikas Arora",
    loginTime: "01 March, 2026 09:16 AM",
    loginAddress: "Rajouri Garden, New Delhi",
    enrolledStudentsPercent: "81%",
  },
  {
    sn: 14,
    centerId: "156020",
    deviceId: "DEV-014",
    operatorName: "Nitin Bansal",
    loginTime: "10 April, 2026 09:24 AM",
    loginAddress:
      "Shop No. 12, First Floor, Business Hub Complex, Zirakpur, Punjab",
    enrolledStudentsPercent: "85%",
  },
  {
    sn: 15,
    centerId: "156020",
    deviceId: "DEV-015",
    operatorName: "Ritu Malhotra",
    loginTime: "22 May, 2026 09:32 AM",
    loginAddress: "Sector 17, Chandigarh",
    enrolledStudentsPercent: "93%",
  },
];

// ─── Date / Time Helpers ──────────────────────────────────────────────────────

function parseLoginTime(loginTime: string): number {
  // Format: "23 March,2025 10:05 AM" → normalize comma → "23 March 2025 10:05 AM"
  const normalized = loginTime.replace(",", "");
  return new Date(normalized).getTime();
}

function getTimeOnlyInMinutes(loginTime: string): number {
  const date = new Date(loginTime.replace(",", ""));
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes;
}

function parseTimeInputToMinutes(value: string): number {
  // "09:30" -> 570
  const [hh, mm] = value.split(":").map(Number);
  return hh * 60 + mm;
}

function formatDateTimeForInput(loginTime: string): string {
  const date = new Date(loginTime.replace(",", ""));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${mins}`;
}

// ─── Sort Icon Button ─────────────────────────────────────────────────────────

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

// ─── Sidebar Filter ───────────────────────────────────────────────────────────

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
  const [expanded, setExpanded] = useState<Partial<Record<FilterFieldKey, boolean>>>(
    {}
  );
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

  const setText = (key: "centerId" | "deviceId" | "operatorName", value: string) =>
    setDraft((p) => ({
      ...p,
      text: { ...p.text, [key]: { value } },
    }));

  const setTimeRange = (key: "loginTimeOnly", part: "from" | "to", value: string) =>
    setDraft((p) => ({
      ...p,
      time: {
        ...p.time,
        [key]: {
          from: part === "from" ? value : p.time[key]?.from ?? "",
          to: part === "to" ? value : p.time[key]?.to ?? "",
        },
      },
    }));

  const setDateTimeRange = (
    key: "loginDateTime",
    part: "from" | "to",
    value: string
  ) =>
    setDraft((p) => ({
      ...p,
      datetime: {
        ...p.datetime,
        [key]: {
          from: part === "from" ? value : p.datetime[key]?.from ?? "",
          to: part === "to" ? value : p.datetime[key]?.to ?? "",
        },
      },
    }));

  const clearField = (key: FilterFieldKey) =>
    setDraft((p) => {
      const n = JSON.parse(JSON.stringify(p)) as ActiveFilters;

      if (key === "centerId" || key === "deviceId" || key === "operatorName") {
        delete n.text[key];
      } else if (key === "loginTimeOnly") {
        delete n.time[key];
      } else if (key === "loginDateTime") {
        delete n.datetime[key];
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
              field.type === "text"
                ? !!(
                    draft.text[field.key as "centerId" | "deviceId" | "operatorName"]?.value?.trim()
                  )
                : field.type === "time"
                ? !!(
                    draft.time.loginTimeOnly &&
                    (draft.time.loginTimeOnly.from !== "" ||
                      draft.time.loginTimeOnly.to !== "")
                  )
                : !!(
                    draft.datetime.loginDateTime &&
                    (draft.datetime.loginDateTime.from !== "" ||
                      draft.datetime.loginDateTime.to !== "")
                  );

            return (
              <div key={field.key} className="border-b border-slate-100 last:border-0">
                <button
                  type="button"
                  onClick={() => toggle(field.key)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors"
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

                {isOpen && field.type === "text" && (
                  <div className="px-5 pb-4 pt-1">
                    <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                      Search
                    </label>
                    <input
                      type="text"
                      value={
                        draft.text[field.key as "centerId" | "deviceId" | "operatorName"]
                          ?.value ?? ""
                      }
                      onChange={(e) =>
                        setText(
                          field.key as "centerId" | "deviceId" | "operatorName",
                          e.target.value
                        )
                      }
                      placeholder={`Search ${field.label.toLowerCase()}...`}
                      className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                    />
                  </div>
                )}

                {isOpen && field.type === "time" && (
                  <div className="px-5 pb-4 pt-1 space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                        From Time
                      </label>
                      <input
                        type="time"
                        value={draft.time.loginTimeOnly?.from ?? ""}
                        onChange={(e) =>
                          setTimeRange("loginTimeOnly", "from", e.target.value)
                        }
                        className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                        To Time
                      </label>
                      <input
                        type="time"
                        value={draft.time.loginTimeOnly?.to ?? ""}
                        onChange={(e) =>
                          setTimeRange("loginTimeOnly", "to", e.target.value)
                        }
                        className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                      />
                    </div>
                  </div>
                )}

                {isOpen && field.type === "datetime" && (
                  <div className="px-5 pb-4 pt-1 space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                        From Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={draft.datetime.loginDateTime?.from ?? ""}
                        onChange={(e) =>
                          setDateTimeRange("loginDateTime", "from", e.target.value)
                        }
                        className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">
                        To Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={draft.datetime.loginDateTime?.to ?? ""}
                        onChange={(e) =>
                          setDateTimeRange("loginDateTime", "to", e.target.value)
                        }
                        className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                      />
                    </div>
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Enrollment() {
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(emptyFilters());
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const PAGE_SIZE = 5;
  const filterBadgeCount = countActiveFilters(activeFilters);

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let data = [...enrollmentData];

    // Text filters
    for (const [key, f] of Object.entries(activeFilters.text) as [
      "centerId" | "deviceId" | "operatorName",
      TextFilter
    ][]) {
      if (!f || f.value.trim() === "") continue;
      const q = f.value.trim().toLowerCase();
      data = data.filter((r) => String(r[key]).toLowerCase().includes(q));
    }

    // Time only filter (across all dates)
    const timeFilter = activeFilters.time.loginTimeOnly;
    if (timeFilter && (timeFilter.from || timeFilter.to)) {
      const fromMinutes =
        timeFilter.from !== "" ? parseTimeInputToMinutes(timeFilter.from) : null;
      const toMinutes =
        timeFilter.to !== "" ? parseTimeInputToMinutes(timeFilter.to) : null;

      data = data.filter((row) => {
        const rowMinutes = getTimeOnlyInMinutes(row.loginTime);

        if (fromMinutes !== null && toMinutes !== null) {
          return rowMinutes >= fromMinutes && rowMinutes <= toMinutes;
        }

        if (fromMinutes !== null) {
          return rowMinutes >= fromMinutes;
        }

        if (toMinutes !== null) {
          return rowMinutes <= toMinutes;
        }

        return true;
      });
    }

    // Full date & time filter
    const dateTimeFilter = activeFilters.datetime.loginDateTime;
    if (dateTimeFilter && (dateTimeFilter.from || dateTimeFilter.to)) {
      const fromTs = dateTimeFilter.from ? new Date(dateTimeFilter.from).getTime() : null;
      const toTs = dateTimeFilter.to ? new Date(dateTimeFilter.to).getTime() : null;

      data = data.filter((row) => {
        const rowTs = parseLoginTime(row.loginTime);

        if (fromTs !== null && toTs !== null) {
          return rowTs >= fromTs && rowTs <= toTs;
        }

        if (fromTs !== null) {
          return rowTs >= fromTs;
        }

        if (toTs !== null) {
          return rowTs <= toTs;
        }

        return true;
      });
    }

    return data;
  }, [activeFilters]);

  // ── Sort ───────────────────────────────────────────────────────────────────

  const sorted = useMemo(() => {
    if (!sortKey || !sortDirection) return filtered;

    return [...filtered].sort((a, b) => {
      if (sortKey === "loginTime") {
        return sortDirection === "asc"
          ? parseLoginTime(a.loginTime) - parseLoginTime(b.loginTime)
          : parseLoginTime(b.loginTime) - parseLoginTime(a.loginTime);
      }

      if (sortKey === "enrolledStudentsPercent") {
        const aVal = parseFloat(a.enrolledStudentsPercent);
        const bVal = parseFloat(b.enrolledStudentsPercent);
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aVal = String(a[sortKey]).toLowerCase();
      const bVal = String(b[sortKey]).toLowerCase();
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    });
  }, [filtered, sortKey, sortDirection]);

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

  // ── Pagination ─────────────────────────────────────────────────────────────

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, page]);

  // ── Export ─────────────────────────────────────────────────────────────────

  const handleExportCSV = () => {
    const headers = [
      "S.N.",
      "Center ID",
      "Device ID",
      "Operator Name",
      "Login Time",
      "Login Address",
      "Enrolled Students %",
    ];

    const rows = sorted.map((row) => [
      row.sn,
      row.centerId,
      row.deviceId,
      row.operatorName,
      row.loginTime,
      row.loginAddress,
      row.enrolledStudentsPercent,
    ]);

    const csv = [headers, ...rows]
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "enrollment-records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => window.print();

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white px-8 py-2 font-[Geist,system-ui,sans-serif]">
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

      {/* Heading */}
      <div className="mb-4 ml-2 mt-2">
        <h1 className="text-lg font-semibold text-slate-900">
          Active Enrollment Overview
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex justify-end items-center gap-2 mb-4 flex-wrap">
        {/* Active filter chips */}
        {filterBadgeCount > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {/* Text chips */}
            {(Object.entries(activeFilters.text) as [
              "centerId" | "deviceId" | "operatorName",
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

            {/* Time only chip */}
            {activeFilters.time.loginTimeOnly &&
              (activeFilters.time.loginTimeOnly.from !== "" ||
                activeFilters.time.loginTimeOnly.to !== "") && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                  Login Time: {activeFilters.time.loginTimeOnly.from || "Any"} →{" "}
                  {activeFilters.time.loginTimeOnly.to || "Any"}
                  <button
                    onClick={() => {
                      const n = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                      delete n.time.loginTimeOnly;
                      setActiveFilters(n);
                      setPage(1);
                    }}
                    className="text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

            {/* DateTime chip */}
            {activeFilters.datetime.loginDateTime &&
              (activeFilters.datetime.loginDateTime.from !== "" ||
                activeFilters.datetime.loginDateTime.to !== "") && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                  Login Date & Time:{" "}
                  {activeFilters.datetime.loginDateTime.from || "Any"} →{" "}
                  {activeFilters.datetime.loginDateTime.to || "Any"}
                  <button
                    onClick={() => {
                      const n = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters;
                      delete n.datetime.loginDateTime;
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

        {sortKey && sortDirection && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs text-slate-600"
            onClick={() => {
              setSortKey(null);
              setSortDirection(null);
            }}
          >
            Clear Sorting
          </Button>
        )}

        {/* Filter Button */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSidebarOpen(true)}
          className={`h-8 text-xs gap-1.5 ${
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto mt-2">
        <table className="min-w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                S.N.
              </th>
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">
                  Device ID{" "}
                  <SortIconButton
                    columnKey="deviceId"
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    isText
                  />
                </div>
              </th>
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">
                  Operator Name{" "}
                  <SortIconButton
                    columnKey="operatorName"
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    isText
                  />
                </div>
              </th>
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">
                  Login Time{" "}
                  <SortIconButton
                    columnKey="loginTime"
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </div>
              </th>
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                Login Address
              </th>
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">
                  Enrolled %{" "}
                  <SortIconButton
                    columnKey="enrolledStudentsPercent"
                    sortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </div>
              </th>
              <th className="px-2 py-3 text-center text-[11px] font-semibold text-slate-600 uppercase tracking-wider whitespace-nowrap">
                <div className="inline-flex items-center gap-1">
                  Center ID{" "}
                  <SortIconButton
                    columnKey="centerId"
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
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-slate-400 text-sm">
                  No records found.
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={row.sn}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700 font-medium">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-2 py-3 text-center font-mono font-semibold text-slate-700 whitespace-nowrap">
                    {row.deviceId}
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700 whitespace-nowrap">
                    {row.operatorName}
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700 whitespace-nowrap">
                    {row.loginTime}
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700 whitespace-normal break-words min-w-[220px] max-w-[320px]">
                    {row.loginAddress}
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700 font-medium">
                    {row.enrolledStudentsPercent}
                  </td>
                  <td className="px-2 py-3 text-center text-[12px] text-slate-700 font-medium">
                    {row.centerId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {sorted.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
            <span className="text-[11px] text-slate-400">
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} records
            </span>

            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={p === page ? "default" : "ghost"}
                  className={`h-7 w-7 text-xs ${
                    p === page ? "bg-rose-500 hover:bg-rose-600 text-white" : ""
                  }`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}

              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}