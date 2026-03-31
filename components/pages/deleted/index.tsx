// "use client";

// import { useState } from "react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// import {
//   Trash2,
//   RotateCcw,
//   Search,
//   MoreVertical,
//   CheckCircle2,
//   XCircle,
//   ShieldAlert,
//   Filter,
//   ChevronLeft,
//   ChevronRight,
//   Download,
// } from "lucide-react";

// import { cn } from "@/lib/utils";

// // ─── Types ────────────────────────────────────────────────────────────────────

// type ExamRecord = {
//   id: number;
//   rollNo: string;
//   name: string;
//   device: string;
//   comments: string;
//   photoMatched: boolean | null;
//   centreOperator: boolean | null;
//   deletedAt: string;
// };

// // ─── Mock Data ────────────────────────────────────────────────────────────────

// const INITIAL_DATA: ExamRecord[] = [
//   {
//     id: 1,
//     rollNo: "156056706",
//     name: "KRITI KIRAN",
//     device: "HA0RCBED",
//     comments: "",
//     photoMatched: true,
//     centreOperator: true,
//      deletedAt: "12 March 2026 10:22 AM",
//   },
//   {
//     id: 2,
//     rollNo: "156038138",
//     name: "ANUGRAH HERO",
//     device: "HA2CMSIG",
//     comments: "Auto moved from 156056707",
//     photoMatched: true,
//     centreOperator: true,
//     deletedAt: "12 April 2026 12:22 PM",
//   },
//   {
//     id: 3,
//     rollNo: "156066199",
//     name: "RAMESH NARDI",
//     device: "UNRP54TVZ",
//     comments: "",
//     photoMatched: true,
//     centreOperator: false,
//     deletedAt: "12 May 2026 01:35 PM",
//   },
//   {
//     id: 4,
//     rollNo: "156056400",
//     name: "GANGADHAR HEMBRAM",
//     device: "HA0RUDGE",
//     comments: "",
//     photoMatched: false,
//     centreOperator: null,
//     deletedAt: "12 June 2026 09:10 AM",
//   },
//   {
//     id: 5,
//     rollNo: "156078342",
//     name: "PRIYA SHARMA",
//     device: "XB1TQAZW",
//     comments: "Device mismatch reported",
//     photoMatched: null,
//     centreOperator: true,
//     deletedAt: "12 August 2026 07:25 AM",
//   },
//   {
//     id: 6,
//     rollNo: "156099001",
//     name: "RAJIV MEHTA",
//     device: "ZC3PLNMQ",
//     comments: "",
//     photoMatched: true,
//     centreOperator: true,
//     deletedAt: "12 July 2026 03:50 PM",
//   },
// ];

// // ─── StatusIcon ───────────────────────────────────────────────────────────────

// const StatusIcon = ({ value }: { value: boolean | null }) => {
//   if (value === true)
//     return <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />;
//   if (value === false)
//     return <XCircle className="w-4 h-4 text-rose-500 mx-auto" />;
//   return <span className="text-slate-300 text-xs mx-auto block text-center">—</span>;
// };

// // ─── Page ─────────────────────────────────────────────────────────────────────

// export default function DeletedPage() {
//   const [records, setRecords] = useState<ExamRecord[]>(INITIAL_DATA);
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState<Set<number>>(new Set());
//   const [restoreTarget, setRestoreTarget] = useState<ExamRecord | null>(null);
//   const [permanentTarget, setPermanentTarget] = useState<ExamRecord | null>(null);
//   const [page, setPage] = useState(1);
//   const PAGE_SIZE = 4;

//   // ── Filtering ──────────────────────────────────────────────────────────────
//   const filtered = records.filter(
//     (r) =>
//       r.rollNo.includes(search) ||
//       r.name.toLowerCase().includes(search.toLowerCase()) ||
//       r.device.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   // ── Selection ──────────────────────────────────────────────────────────────
//   const toggleSelect = (id: number) => {
//     setSelected((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };
//   const allSelected =
//     paginated.length > 0 && paginated.every((r) => selected.has(r.id));
//   const toggleAll = () => {
//     if (allSelected) {
//       setSelected((prev) => {
//         const next = new Set(prev);
//         paginated.forEach((r) => next.delete(r.id));
//         return next;
//       });
//     } else {
//       setSelected((prev) => {
//         const next = new Set(prev);
//         paginated.forEach((r) => next.add(r.id));
//         return next;
//       });
//     }
//   };

//   // ── Actions ────────────────────────────────────────────────────────────────
//   const handleRestore = (record: ExamRecord) => {
//     setRecords((prev) => prev.filter((r) => r.id !== record.id));
//     setRestoreTarget(null);
//   };

//   const handlePermanentDelete = (record: ExamRecord) => {
//     setRecords((prev) => prev.filter((r) => r.id !== record.id));
//     setPermanentTarget(null);
//   };

//   const handleBulkRestore = () => {
//     setRecords((prev) => prev.filter((r) => !selected.has(r.id)));
//     setSelected(new Set());
//   };

//   //Export functionality for button________________________________________________
//     const handleExportCSV = () => {
//     const headers = [
//       "S.N.",
//       "Roll No",
//       "Name",
//       "Device",
//       "Comments",
//       "Photo Matched",
//       "Centre Operator",
//       "Deleted At",
//     ];

//     const rows = filtered.map((record, index) => [
//       index + 1,
//       record.rollNo,
//       record.name,
//       record.device,
//       record.comments || "",
//       record.photoMatched === true ? "Yes" : record.photoMatched === false ? "No" : "-",
//       record.centreOperator === true ? "Yes" : record.centreOperator === false ? "No" : "-",
//       record.deletedAt,
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) =>
//         row
//           .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
//           .join(",")
//       )
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "deleted-records.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     URL.revokeObjectURL(url);
//   };

//   //Export functionality for pdf button________________________________________________
//     const handleExportPDF = () => {
//       window.print();
//     };


//   return (
//     <TooltipProvider>
//       <div className="min-h-screen bg-white font-[Geist,system-ui,sans-serif]">
//         {/* ── Top Bar ── */}
//         <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow">
//               <Trash2 className="w-4 h-4 text-white" />
//             </div>
//             <div>
//               <h1 className="text-[15px] font-semibold text-slate-800 leading-tight">
//                 Deleted Records
//               </h1>
//               <p className="text-[11px] text-slate-400">Exam Centre — Candidate Table</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <Badge
//               variant="secondary"
//               className="bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-medium px-2 py-0.5"
//             >
//               <ShieldAlert className="w-3 h-3 mr-1" />
//               {records.length} deleted
//             </Badge>
//           </div>
//         </header>

//         {/* ── Main Content ── */}
//         <main className="px-8 py-6 max-w-8xl mx-auto">
//           {/* ── Toolbar ── */}
//           <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
//             <div className="relative flex-1 max-w-sm">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//               <Input
//                 placeholder="Search by roll no, name or device…"
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 className="pl-9 h-9 text-sm bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-rose-400"
//               />
//             </div>

//             {/* filter and export buttons */}
//             <div className="flex items-center gap-3">
//               {selected.size > 0 && (
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="h-8 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50 gap-1"
//                   onClick={handleBulkRestore}
//                 >
//                   <RotateCcw className="w-3.5 h-3.5" />
//                   Restore {selected.size} selected
//                 </Button>
//               )}

//               <Button
//                 size="sm"
//                 variant="outline"
//                 className="h-8 text-xs text-slate-600 gap-1"
//               >
//                 <Filter className="w-3.5 h-3.5" />
//                 Filter
//               </Button>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     size="sm"
//                     variant="outline"
//                     className="h-8 text-xs text-slate-600 gap-1"
//                   >
//                     <Download className="w-3.5 h-3.5" />
//                     Export
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="text-sm">
//                   <DropdownMenuItem onClick={handleExportCSV}>
//                     Export CSV
//                   </DropdownMenuItem>
//                    <DropdownMenuItem onClick={handleExportPDF}>
//                     Export PDF
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>

//           </div>

//           {/* ── Table Card ── */}
//           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
//                   <TableHead className="w-10 pl-4">
//                     <input
//                       type="checkbox"
//                       checked={allSelected}
//                       onChange={toggleAll}
//                       className="rounded border-slate-300 accent-blue-500 cursor-pointer"
//                     />
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-10">
//                     S.N.
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
//                     Roll No
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
//                     Name
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
//                     Device
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
//                     Comments
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">
//                     Photo Matched
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">
//                     Centre Operator
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
//                     Deleted At
//                   </TableHead>
//                   <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right pr-4">
//                     Actions
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {paginated.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={10}
//                       className="text-center py-16 text-slate-400 text-sm"
//                     >
//                       No deleted records found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginated.map((record, idx) => (
//                     <TableRow
//                       key={record.id}
//                       className={cn(
//                         "border-b border-slate-100 transition-colors",
//                         selected.has(record.id)
//                           ? "bg-rose-50/60"
//                           : "hover:bg-slate-50/70"
//                       )}
//                     >
//                       {/* Checkbox */}
//                       <TableCell className="pl-4">
//                         <input
//                           type="checkbox"
//                           checked={selected.has(record.id)}
//                           onChange={() => toggleSelect(record.id)}
//                           className="rounded border-slate-300 accent-blue-500 cursor-pointer"
//                         />
//                       </TableCell>

//                       {/* S.N. */}
//                       <TableCell className="text-xs text-slate-500 font-medium">
//                         {(page - 1) * PAGE_SIZE + idx + 1}
//                       </TableCell>

//                       {/* Roll No */}
//                       <TableCell>
//                         <span className="text-[13px] font-semibold text-blue-600 font-mono">
//                           {record.rollNo}
//                         </span>
//                       </TableCell>

//                       {/* Name */}
//                       <TableCell className="text-[13px] text-slate-700 font-medium">
//                         {record.name}
//                       </TableCell>

//                       {/* Device */}
//                       <TableCell>
//                         <Badge
//                           variant="outline"
//                           className="font-mono text-[11px] bg-slate-50 text-slate-600 border-slate-200"
//                         >
//                           {record.device}
//                         </Badge>
//                       </TableCell>

//                       {/* Comments */}
//                       <TableCell className="text-[12px] text-slate-500 max-w-[180px] truncate">
//                         {record.comments || (
//                           <span className="text-slate-300">—</span>
//                         )}
//                       </TableCell>

//                       {/* Photo Matched */}
//                       <TableCell className="text-center">
//                         <StatusIcon value={record.photoMatched} />
//                       </TableCell>

//                       {/* Centre Operator */}
//                       <TableCell className="text-center">
//                         <StatusIcon value={record.centreOperator} />
//                       </TableCell>

//                       {/* Deleted At */}
//                       <TableCell className="text-[11px] text-slate-400 whitespace-nowrap">
//                         {record.deletedAt}
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell className="text-right pr-4">
//                         <div className="flex items-center justify-end gap-1">
//                           <Tooltip>
//                             <TooltipTrigger asChild>
//                               <Button
//                                 size="icon"
//                                 variant="ghost"
//                                 className="h-7 w-7 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
//                                 onClick={() => setRestoreTarget(record)}
//                               >
//                                 <RotateCcw className="w-3.5 h-3.5" />
//                               </Button>
//                             </TooltipTrigger>
//                             <TooltipContent side="left" className="text-xs">
//                               Restore record
//                             </TooltipContent>
//                           </Tooltip>

//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button
//                                 size="icon"
//                                 variant="ghost"
//                                 className="h-7 w-7 text-slate-400 hover:bg-slate-100"
//                               >
//                                 <MoreVertical className="w-3.5 h-3.5" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end" className="text-sm">
//                               <DropdownMenuItem
//                                 className="text-rose-600 focus:text-rose-700 focus:bg-rose-50"
//                                 onClick={() => setPermanentTarget(record)}
//                               >
//                                 <Trash2 className="w-3.5 h-3.5 mr-2" />
//                                 Delete permanently
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>

//             {/* ── Pagination ── */}
//             {totalPages > 1 && (
//               <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
//                 <span className="text-[11px] text-slate-400">
//                   Showing {(page - 1) * PAGE_SIZE + 1}–
//                   {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
//                   {filtered.length} records
//                 </span>
//                 <div className="flex items-center gap-1">
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     className="h-7 w-7"
//                     disabled={page === 1}
//                     onClick={() => setPage((p) => p - 1)}
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </Button>
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                     (p) => (
//                       <Button
//                         key={p}
//                         size="sm"
//                         variant={p === page ? "default" : "ghost"}
//                         className={cn(
//                           "h-7 w-7 text-xs",
//                           p === page &&
//                             "bg-rose-500 hover:bg-rose-600 text-white"
//                         )}
//                         onClick={() => setPage(p)}
//                       >
//                         {p}
//                       </Button>
//                     )
//                   )}
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     className="h-7 w-7"
//                     disabled={page === totalPages}
//                     onClick={() => setPage((p) => p + 1)}
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ── Footer hint ── */}
//           <p className="text-[11px] text-slate-400 mt-3 text-center">
//             Records in this view have been soft-deleted from the Exam Centre
//             candidate table. Restore to re-activate or permanently delete to
//             purge.
//           </p>
//         </main>

//         {/* ── Restore Confirm Dialog ── */}
//         <AlertDialog
//           open={!!restoreTarget}
//           onOpenChange={() => setRestoreTarget(null)}
//         >
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle className="flex items-center gap-2">
//                 <RotateCcw className="w-4 h-4 text-emerald-500" />
//                 Restore Record
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 Restore{" "}
//                 <span className="font-semibold text-slate-700">
//                   {restoreTarget?.name}
//                 </span>{" "}
//                 (Roll No:{" "}
//                 <span className="font-mono text-rose-600">
//                   {restoreTarget?.rollNo}
//                 </span>
//                 ) back to the exam candidate table?
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 className="bg-emerald-600 hover:bg-emerald-700 text-white"
//                 onClick={() => restoreTarget && handleRestore(restoreTarget)}
//               >
//                 Yes, Restore
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         {/* ── Permanent Delete Confirm Dialog ── */}
//         <AlertDialog
//           open={!!permanentTarget}
//           onOpenChange={() => setPermanentTarget(null)}
//         >
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle className="flex items-center gap-2 text-rose-600">
//                 <Trash2 className="w-4 h-4" />
//                 Permanently Delete
//               </AlertDialogTitle>
//               <AlertDialogDescription>
//                 This will{" "}
//                 <span className="font-semibold text-rose-600">
//                   permanently delete
//                 </span>{" "}
//                 the record for{" "}
//                 <span className="font-semibold text-slate-700">
//                   {permanentTarget?.name}
//                 </span>
//                 . This action cannot be undone.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel>Cancel</AlertDialogCancel>
//               <AlertDialogAction
//                 className="bg-rose-600 hover:bg-rose-700 text-white"
//                 onClick={() =>
//                   permanentTarget && handlePermanentDelete(permanentTarget)
//                 }
//               >
//                 Delete Permanently
//               </AlertDialogAction>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>
//       </div>
//     </TooltipProvider>
//   );
// }









"use client";

import { useMemo, useState, useRef, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Trash2,
  RotateCcw,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Download,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ArrowDownUp,
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ExamRecord = {
  id: number;
  rollNo: string;
  name: string;
  device: string;
  comments: string;
  photoMatched: boolean | null;
  centreOperator: boolean | null;
  deletedAt: string;
};

type SortKey = "rollNo" | "name" | "device" | "deletedAt";
type SortDirection = "asc" | "desc" | null;

// ─── Filter types ─────────────────────────────────────────────────────────────

type FilterFieldKey = "rollNo" | "name" | "device" | "comments";

interface FilterField {
  key: FilterFieldKey;
  label: string;
  type: "text";
}

const FILTER_FIELDS: FilterField[] = [
  { key: "rollNo",   label: "Roll No",  type: "text" },
  { key: "name",     label: "Name",     type: "text" },
  { key: "device",   label: "Device",   type: "text" },
  { key: "comments", label: "Comments", type: "text" },
];

interface TextFilter { value: string }

interface ActiveFilters {
  text: Partial<Record<FilterFieldKey, TextFilter>>;
}

const emptyFilters = (): ActiveFilters => ({ text: {} });

function countActiveFilters(f: ActiveFilters) {
  return Object.values(f.text).filter((v) => v && v.value.trim() !== "").length;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_DATA: ExamRecord[] = [
  { id: 1, rollNo: "156056706", name: "KRITI KIRAN",        device: "HA0RCBED",  comments: "",                           photoMatched: true,  centreOperator: true,  deletedAt: "12 March 2026 10:22 AM" },
  { id: 2, rollNo: "156038138", name: "ANUGRAH HERO",       device: "HA2CMSIG",  comments: "Auto moved from 156056707",  photoMatched: true,  centreOperator: true,  deletedAt: "12 April 2026 12:22 PM" },
  { id: 3, rollNo: "156066199", name: "RAMESH NARDI",       device: "UNRP54TVZ", comments: "",                           photoMatched: true,  centreOperator: false, deletedAt: "12 March 2026 01:35 PM"  },
  { id: 4, rollNo: "156056400", name: "GANGADHAR HEMBRAM",  device: "HA0RUDGE",  comments: "",                           photoMatched: false, centreOperator: null,  deletedAt: "12 December 2026 09:10 AM" },
  { id: 5, rollNo: "156078342", name: "PRIYA SHARMA",       device: "XB1TQAZW",  comments: "Device mismatch reported",   photoMatched: null,  centreOperator: true,  deletedAt: "12 August 2026 07:25 AM"},
  { id: 6, rollNo: "156099001", name: "RAJIV MEHTA",        device: "ZC3PLNMQ",  comments: "",                           photoMatched: true,  centreOperator: true,  deletedAt: "12 April 2026 03:50 PM" },
];

// ─── StatusIcon ───────────────────────────────────────────────────────────────

const StatusIcon = ({ value }: { value: boolean | null }) => {
  if (value === true)  return <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />;
  if (value === false) return <XCircle className="w-4 h-4 text-rose-500 mx-auto" />;
  return <span className="text-slate-300 text-xs mx-auto block text-center">—</span>;
};

// ─── Sidebar Filter ───────────────────────────────────────────────────────────

interface SidebarFilterProps {
  open: boolean;
  onClose: () => void;
  filters: ActiveFilters;
  onApply: (f: ActiveFilters) => void;
  onClearAll: () => void;
}

function SidebarFilter({ open, onClose, filters, onApply, onClearAll }: SidebarFilterProps) {
  const [draft, setDraft] = useState<ActiveFilters>(() => JSON.parse(JSON.stringify(filters)));
  const [expanded, setExpanded] = useState<Partial<Record<FilterFieldKey, boolean>>>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setDraft(JSON.parse(JSON.stringify(filters))); }, [filters]);

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

  const setText = (key: FilterFieldKey, value: string) =>
    setDraft((p) => ({ ...p, text: { ...p.text, [key]: { value } } }));

  const clearField = (key: FilterFieldKey) => {
    setDraft((p) => { const n = JSON.parse(JSON.stringify(p)); delete n.text[key]; return n; });
  };

  const handleApply = () => { onApply(draft); onClose(); };

  const handleClearAll = () => { const f = emptyFilters(); setDraft(f); setExpanded({}); onClearAll(); };

  const draftCount = countActiveFilters(draft);

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />
      <div
        ref={ref}
        className={`fixed top-0 right-0 z-40 h-full w-80 bg-white border-l border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">Filters</span>
            {draftCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">{draftCount}</span>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fields */}
        <div className="flex-1 overflow-y-auto py-2">
          {FILTER_FIELDS.map((field) => {
            const isOpen = !!expanded[field.key];
            const val = draft.text[field.key];
            const hasValue = val && val.value.trim() !== "";
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
                      <button type="button" onClick={(e) => { e.stopPropagation(); clearField(field.key); }} className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors">Clear</button>
                    )}
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1">
                    <label className="block text-[10px] text-slate-400 mb-1 uppercase tracking-wide">Search</label>
                    <input
                      type="text"
                      value={val?.value ?? ""}
                      onChange={(e) => setText(field.key, e.target.value)}
                      placeholder={`Search ${field.label.toLowerCase()}...`}
                      className="w-full h-8 rounded-md border border-slate-200 px-2.5 text-[13px] text-slate-700 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-100 transition"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-9 text-xs text-slate-600" onClick={handleClearAll}>Clear All</Button>
          <Button size="sm" className="flex-1 h-9 text-xs bg-rose-500 hover:bg-rose-600 text-white" onClick={handleApply}>Apply Filters</Button>
        </div>
      </div>
    </>
  );
}

// ─── Sort Icon Button ─────────────────────────────────────────────────────────

function SortIconButton({
  columnKey, sortKey, sortDirection, onSort, isText,
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
      onClick={(e) => { e.stopPropagation(); onSort(columnKey); }}
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
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DeletedPage() {
  const [records, setRecords] = useState<ExamRecord[]>(INITIAL_DATA);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [restoreTarget, setRestoreTarget] = useState<ExamRecord | null>(null);
  const [permanentTarget, setPermanentTarget] = useState<ExamRecord | null>(null);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(emptyFilters());
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const PAGE_SIZE = 4;
  const filterBadgeCount = countActiveFilters(activeFilters);

  // ── Filtering ──────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let data = [...records];

    // Global search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      data = data.filter((r) =>
        r.rollNo.includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.device.toLowerCase().includes(q)
      );
    }

    // Sidebar text filters
    for (const [key, f] of Object.entries(activeFilters.text) as [FilterFieldKey, TextFilter][]) {
      if (!f || f.value.trim() === "") continue;
      const q = f.value.trim().toLowerCase();
      data = data.filter((r) => String(r[key]).toLowerCase().includes(q));
    }

    return data;
  }, [records, search, activeFilters]);

  // ── Sorting ────────────────────────────────────────────────────────────────

  const sorted = useMemo(() => {
    if (!sortKey || !sortDirection) return filtered;
    return [...filtered].sort((a, b) => {
      if (sortKey === "deletedAt") {
        const aDate = new Date(a.deletedAt).getTime();
        const bDate = new Date(b.deletedAt).getTime();
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      }
      const aVal = a[sortKey].toLowerCase();
      const bVal = b[sortKey].toLowerCase();
      return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [filtered, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    setPage(1);
    if (sortKey !== key) { setSortKey(key); setSortDirection("asc"); return; }
    if (sortDirection === "asc") { setSortDirection("desc"); return; }
    setSortKey(null); setSortDirection(null);
  };

  // ── Pagination ─────────────────────────────────────────────────────────────

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Selection ──────────────────────────────────────────────────────────────

  const toggleSelect = (id: number) => {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const allSelected = paginated.length > 0 && paginated.every((r) => selected.has(r.id));
  const toggleAll = () => {
    if (allSelected) setSelected((p) => { const n = new Set(p); paginated.forEach((r) => n.delete(r.id)); return n; });
    else setSelected((p) => { const n = new Set(p); paginated.forEach((r) => n.add(r.id)); return n; });
  };

  // ── Actions ────────────────────────────────────────────────────────────────

  const handleRestore = (record: ExamRecord) => { setRecords((p) => p.filter((r) => r.id !== record.id)); setRestoreTarget(null); };
  const handlePermanentDelete = (record: ExamRecord) => { setRecords((p) => p.filter((r) => r.id !== record.id)); setPermanentTarget(null); };
  const handleBulkRestore = () => { setRecords((p) => p.filter((r) => !selected.has(r.id))); setSelected(new Set()); };

  const handleApplyFilters = (f: ActiveFilters) => { setActiveFilters(f); setPage(1); };
  const handleClearAllFilters = () => { setActiveFilters(emptyFilters()); setPage(1); };

  // ── Export ─────────────────────────────────────────────────────────────────

  const handleExportCSV = () => {
    const headers = ["S.N.","Roll No","Name","Device","Comments","Photo Matched","Centre Operator","Deleted At"];
    const rows = filtered.map((r, i) => [
      i + 1, r.rollNo, r.name, r.device, r.comments || "",
      r.photoMatched === true ? "Yes" : r.photoMatched === false ? "No" : "-",
      r.centreOperator === true ? "Yes" : r.centreOperator === false ? "No" : "-",
      r.deletedAt,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.setAttribute("download", "deleted-records.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => window.print();

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white font-[Geist,system-ui,sans-serif]">

        <SidebarFilter
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          filters={activeFilters}
          onApply={handleApplyFilters}
          onClearAll={handleClearAllFilters}
        />

        {/* ── Top Bar ── */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow">
              <Trash2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-[15px] font-semibold text-slate-800 leading-tight">Deleted Records</h1>
              <p className="text-[11px] text-slate-400">Exam Centre — Candidate Table</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-medium px-2 py-0.5">
              <ShieldAlert className="w-3 h-3 mr-1" />
              {records.length} deleted
            </Badge>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="px-8 py-6 max-w-8xl mx-auto">

          {/* ── Toolbar ── */}
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by roll no, name or device…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 h-9 text-sm bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-rose-400"
              />
            </div>

            <div className="flex items-center gap-2">
              {selected.size > 0 && (
                <Button size="sm" variant="outline" className="h-8 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50 gap-1" onClick={handleBulkRestore}>
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore {selected.size} selected
                </Button>
              )}

              {/* Sidebar Filter Button */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSidebarOpen(true)}
                className={cn("h-8 text-xs gap-1.5", filterBadgeCount > 0 ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100" : "text-slate-600")}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters
                {filterBadgeCount > 0 && (
                  <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold">{filterBadgeCount}</span>
                )}
              </Button>

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
              <button onClick={handleClearAllFilters} className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition-colors">
                Clear all
              </button>
            </div>
          )}

          {/* ── Table Card ── */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                  <TableHead className="w-10 pl-4">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-slate-300 accent-blue-500 cursor-pointer" />
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-10">S.N.</TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="inline-flex items-center gap-1">
                      Roll No
                      <SortIconButton columnKey="rollNo" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} />
                    </div>
                  </TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="inline-flex items-center gap-1">
                      Name
                      <SortIconButton columnKey="name" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} isText />
                    </div>
                  </TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="inline-flex items-center gap-1">
                      Device
                      <SortIconButton columnKey="device" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} isText />
                    </div>
                  </TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Comments</TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">Photo Matched</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center">Centre Operator</TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="inline-flex items-center gap-1">
                      Deleted At
                      <SortIconButton columnKey="deletedAt" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} isText />
                    </div>
                  </TableHead>

                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-16 text-slate-400 text-sm">No deleted records found.</TableCell>
                  </TableRow>
                ) : (
                  paginated.map((record, idx) => (
                    <TableRow
                      key={record.id}
                      className={cn("border-b border-slate-100 transition-colors", selected.has(record.id) ? "bg-rose-50/60" : "hover:bg-slate-50/70")}
                    >
                      <TableCell className="pl-4">
                        <input type="checkbox" checked={selected.has(record.id)} onChange={() => toggleSelect(record.id)} className="rounded border-slate-300 accent-blue-500 cursor-pointer" />
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 font-medium">{(page - 1) * PAGE_SIZE + idx + 1}</TableCell>
                      <TableCell><span className="text-[13px] font-semibold text-blue-600 font-mono">{record.rollNo}</span></TableCell>
                      <TableCell className="text-[13px] text-slate-700 font-medium">{record.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono text-[11px] bg-slate-50 text-slate-600 border-slate-200">{record.device}</Badge>
                      </TableCell>
                      <TableCell className="text-[12px] text-slate-500 max-w-[180px] truncate">
                        {record.comments || <span className="text-slate-300">—</span>}
                      </TableCell>
                      <TableCell className="text-center"><StatusIcon value={record.photoMatched} /></TableCell>
                      <TableCell className="text-center"><StatusIcon value={record.centreOperator} /></TableCell>
                      <TableCell className="text-[11px] text-slate-400 whitespace-nowrap">{record.deletedAt}</TableCell>
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700" onClick={() => setRestoreTarget(record)}>
                                <RotateCcw className="w-3.5 h-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-xs">Restore record</TooltipContent>
                          </Tooltip>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" className="h-7 w-7 text-slate-400 hover:bg-slate-100">
                                <MoreVertical className="w-3.5 h-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="text-sm">
                              <DropdownMenuItem className="text-rose-600 focus:text-rose-700 focus:bg-rose-50" onClick={() => setPermanentTarget(record)}>
                                <Trash2 className="w-3.5 h-3.5 mr-2" />
                                Delete permanently
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                <span className="text-[11px] text-slate-400">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} records
                </span>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button key={p} size="sm" variant={p === page ? "default" : "ghost"} className={cn("h-7 w-7 text-xs", p === page && "bg-rose-500 hover:bg-rose-600 text-white")} onClick={() => setPage(p)}>
                      {p}
                    </Button>
                  ))}
                  <Button size="icon" variant="ghost" className="h-7 w-7" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center">
            Records in this view have been soft-deleted from the Exam Centre candidate table. Restore to re-activate or permanently delete to purge.
          </p>
        </main>

        {/* ── Restore Dialog ── */}
        <AlertDialog open={!!restoreTarget} onOpenChange={() => setRestoreTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2"><RotateCcw className="w-4 h-4 text-emerald-500" />Restore Record</AlertDialogTitle>
              <AlertDialogDescription>
                Restore <span className="font-semibold text-slate-700">{restoreTarget?.name}</span> (Roll No: <span className="font-mono text-rose-600">{restoreTarget?.rollNo}</span>) back to the exam candidate table?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => restoreTarget && handleRestore(restoreTarget)}>Yes, Restore</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ── Permanent Delete Dialog ── */}
        <AlertDialog open={!!permanentTarget} onOpenChange={() => setPermanentTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-rose-600"><Trash2 className="w-4 h-4" />Permanently Delete</AlertDialogTitle>
              <AlertDialogDescription>
                This will <span className="font-semibold text-rose-600">permanently delete</span> the record for <span className="font-semibold text-slate-700">{permanentTarget?.name}</span>. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-rose-600 hover:bg-rose-700 text-white" onClick={() => permanentTarget && handlePermanentDelete(permanentTarget)}>Delete Permanently</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}