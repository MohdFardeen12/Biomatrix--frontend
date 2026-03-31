// "use client";

// import { useState, useEffect } from "react";
// import { Wifi } from "lucide-react";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   RefreshCw,
//   CheckCircle2,
//   Clock,
//   AlertCircle,
//   Download,
//   ChevronDown,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// type SyncStatus = "synced" | "pending" | "error" | "syncing";

// interface AttendanceRecord {
//   id: string;
//   machineId: string;
//   operatorName: string;
//   centerId: string;
//   centerSync: {
//     date: string;
//     lastSyncTime: string;
//     syncData: number;
//     totalData: number;
//     status: SyncStatus;
//   };
// }

// const initialData: AttendanceRecord[] = [
//   {
//     id: "1",
//     machineId: "MCH-001",
//     operatorName: "Ravi Kumar",
//     centerId: "DOME-DELHI-042",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "09:45 AM",
//       syncData: 120,
//       totalData: 120,
//       status: "synced",
//     },
//   },
//   {
//     id: "2",
//     machineId: "MCH-002",
//     operatorName: "Priya Sharma",
//     centerId: "DOME-MUMBAI-017",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "11:20 AM",
//       syncData: 85,
//       totalData: 102,
//       status: "pending",
//     },
//   },
//   {
//     id: "3",
//     machineId: "MCH-003",
//     operatorName: "Amit Verma",
//     centerId: "DOME-BLORE-089",
//     centerSync: {
//       date: "2026-03-08",
//       lastSyncTime: "06:15 PM",
//       syncData: 0,
//       totalData: 74,
//       status: "error",
//     },
//   },
//   {
//     id: "4",
//     machineId: "MCH-004",
//     operatorName: "Sunita Patel",
//     centerId: "DOME-HYD-031",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "08:30 AM",
//       syncData: 210,
//       totalData: 210,
//       status: "synced",
//     },
//   },
//   {
//     id: "5",
//     machineId: "MCH-005",
//     operatorName: "Deepak Nair",
//     centerId: "DOME-CHENNAI-056",
//     centerSync: {
//       date: "2026-03-07",
//       lastSyncTime: "03:55 PM",
//       syncData: 45,
//       totalData: 98,
//       status: "pending",
//     },
//   },
//   {
//     id: "6",
//     machineId: "MCH-006",
//     operatorName: "Meena Joshi",
//     centerId: "DOME-PUNE-073",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "10:10 AM",
//       syncData: 133,
//       totalData: 133,
//       status: "synced",
//     },
//   },
//   {
//     id: "7",
//     machineId: "MCH-001",
//     operatorName: "Ravi Kumar",
//     centerId: "DOME-DELHI-042",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "09:45 AM",
//       syncData: 120,
//       totalData: 120,
//       status: "synced",
//     },
//   },
//   {
//     id: "8",
//     machineId: "MCH-002",
//     operatorName: "Priya Sharma",
//     centerId: "DOME-MUMBAI-017",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "11:20 AM",
//       syncData: 85,
//       totalData: 102,
//       status: "pending",
//     },
//   },
//   {
//     id: "9",
//     machineId: "MCH-003",
//     operatorName: "Amit Verma",
//     centerId: "DOME-BLORE-089",
//     centerSync: {
//       date: "2026-03-08",
//       lastSyncTime: "06:15 PM",
//       syncData: 0,
//       totalData: 74,
//       status: "error",
//     },
//   },
//   {
//     id: "10",
//     machineId: "MCH-004",
//     operatorName: "Sunita Patel",
//     centerId: "DOME-HYD-031",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "08:30 AM",
//       syncData: 210,
//       totalData: 210,
//       status: "synced",
//     },
//   },
//   {
//     id: "11",
//     machineId: "MCH-005",
//     operatorName: "Deepak Nair",
//     centerId: "DOME-CHENNAI-056",
//     centerSync: {
//       date: "2026-03-07",
//       lastSyncTime: "03:55 PM",
//       syncData: 45,
//       totalData: 98,
//       status: "pending",
//     },
//   },
//   {
//     id: "12",
//     machineId: "MCH-006",
//     operatorName: "Meena Joshi",
//     centerId: "DOME-PUNE-073",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "10:10 AM",
//       syncData: 133,
//       totalData: 133,
//       status: "synced",
//     },
//   },
//   {
//     id: "13",
//     machineId: "MCH-001",
//     operatorName: "Ravi Kumar",
//     centerId: "DOME-DELHI-042",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "09:45 AM",
//       syncData: 120,
//       totalData: 120,
//       status: "synced",
//     },
//   },
//   {
//     id: "14",
//     machineId: "MCH-002",
//     operatorName: "Priya Sharma",
//     centerId: "DOME-MUMBAI-017",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "11:20 AM",
//       syncData: 85,
//       totalData: 102,
//       status: "pending",
//     },
//   },
//   {
//     id: "15",
//     machineId: "MCH-003",
//     operatorName: "Amit Verma",
//     centerId: "DOME-BLORE-089",
//     centerSync: {
//       date: "2026-03-08",
//       lastSyncTime: "06:15 PM",
//       syncData: 0,
//       totalData: 74,
//       status: "error",
//     },
//   },
//   {
//     id: "16",
//     machineId: "MCH-004",
//     operatorName: "Sunita Patel",
//     centerId: "DOME-HYD-031",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "08:30 AM",
//       syncData: 210,
//       totalData: 210,
//       status: "synced",
//     },
//   },
//   {
//     id: "17",
//     machineId: "MCH-005",
//     operatorName: "Deepak Nair",
//     centerId: "DOME-CHENNAI-056",
//     centerSync: {
//       date: "2026-03-07",
//       lastSyncTime: "03:55 PM",
//       syncData: 45,
//       totalData: 98,
//       status: "pending",
//     },
//   },
//   {
//     id: "18",
//     machineId: "MCH-006",
//     operatorName: "Meena Joshi",
//     centerId: "DOME-PUNE-073",
//     centerSync: {
//       date: "2026-03-09",
//       lastSyncTime: "10:10 AM",
//       syncData: 133,
//       totalData: 133,
//       status: "synced",
//     },
//   },
// ];

// const statusConfig: Record<
//   SyncStatus,
//   { label: string; color: string; icon: React.ReactNode }
// > = {
//   synced: {
//     label: "Synced",
//     color:
//       "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300",
//     icon: <CheckCircle2 className="w-3 h-3" />,
//   },
//   pending: {
//     label: "Pending",
//     color:
//       "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
//     icon: <Clock className="w-3 h-3" />,
//   },
//   error: {
//     label: "Error",
//     color:
//       "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
//     icon: <AlertCircle className="w-3 h-3" />,
//   },
//   syncing: {
//     label: "Syncing…",
//     color:
//       "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300",
//     icon: <RefreshCw className="w-3 h-3 animate-spin" />,
//   },
// };

// function SyncProgress({
//   syncData,
//   totalData,
// }: {
//   syncData: number;
//   totalData: number;
// }) {
//   const pct = totalData === 0 ? 0 : Math.round((syncData / totalData) * 100);

//   return (
//     <div className="flex min-w-[120px] flex-col gap-1.5">
//       <div className="flex items-center justify-between text-xs font-medium">
//         <span className="text-slate-700 dark:text-slate-200">
//           {syncData}
//           <span className="font-normal text-slate-400"> / {totalData}</span>
//         </span>
//         <span
//           className={`font-semibold ${
//             pct === 100
//               ? "text-emerald-600"
//               : pct > 50
//               ? "text-amber-600"
//               : "text-red-500"
//           }`}
//         >
//           {pct}%
//         </span>
//       </div>

//       <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
//         <div
//           className={`h-full rounded-full transition-all duration-700 ${
//             pct === 100
//               ? "bg-emerald-500"
//               : pct > 50
//               ? "bg-amber-400"
//               : "bg-red-400"
//           }`}
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// export default function AttendanceSync() {
//   const [records, setRecords] = useState<AttendanceRecord[]>(initialData);
//   const [syncingAll, setSyncingAll] = useState(false);

//   const [page, setPage] = useState(1);
//   const PAGE_SIZE = 8;

//   const handleSync = (id: string) => {
//     setRecords((prev) =>
//       prev.map((r) =>
//         r.id === id
//           ? { ...r, centerSync: { ...r.centerSync, status: "syncing" } }
//           : r
//       )
//     );

//     setTimeout(() => {
//       setRecords((prev) =>
//         prev.map((r) =>
//           r.id === id
//             ? {
//                 ...r,
//                 centerSync: {
//                   ...r.centerSync,
//                   date: new Date().toISOString().split("T")[0],
//                   lastSyncTime: new Date().toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                   }),
//                   syncData: r.centerSync.totalData,
//                   status: "synced",
//                 },
//               }
//             : r
//         )
//       );
//     }, 1800);
//   };

//   const handleSyncAll = () => {
//     setSyncingAll(true);

//     setRecords((prev) =>
//       prev.map((r) => ({
//         ...r,
//         centerSync: { ...r.centerSync, status: "syncing" },
//       }))
//     );

//     setTimeout(() => {
//       setRecords((prev) =>
//         prev.map((r) => ({
//           ...r,
//           centerSync: {
//             ...r.centerSync,
//             date: new Date().toISOString().split("T")[0],
//             lastSyncTime: new Date().toLocaleTimeString("en-US", {
//               hour: "2-digit",
//               minute: "2-digit",
//               hour12: true,
//             }),
//             syncData: r.centerSync.totalData,
//             status: "synced",
//           },
//         }))
//       );
//       setSyncingAll(false);
//     }, 2200);
//   };

//   const formatDate = (d: string) => {
//     const [year, month, day] = d.split("-");
//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
//   };

//   const [refreshedAt, setRefreshedAt] = useState<string>("");

//   useEffect(() => {
//     setRefreshedAt(
//       new Date().toLocaleTimeString("en-IN", {
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: true,
//       })
//     );
//   }, []);

//   const syncedCount = records.filter(
//     (r) => r.centerSync.status === "synced"
//   ).length;

//   const totalSyncedData = records.reduce(
//     (sum, r) => sum + r.centerSync.syncData,
//     0
//   );
//   const totalAllData = records.reduce(
//     (sum, r) => sum + r.centerSync.totalData,
//     0
//   );
//   const overallPct =
//     totalAllData === 0 ? 0 : Math.round((totalSyncedData / totalAllData) * 100);

//   const totalPages = Math.ceil(records.length / PAGE_SIZE);

//   const paginatedRecords = records.slice(
//     (page - 1) * PAGE_SIZE,
//     page * PAGE_SIZE
//   );

//   const exportToCSV = () => {
//     const headers = [
//       "Machine ID",
//       "Operator Name",
//       "Center ID",
//       "Date",
//       "Last Sync Time",
//       "Synced Data",
//       "Total Data",
//       "Status",
//     ];

//     const rows = records.map((record) => [
//       record.machineId,
//       record.operatorName,
//       record.centerId,
//       formatDate(record.centerSync.date),
//       record.centerSync.lastSyncTime,
//       record.centerSync.syncData,
//       record.centerSync.totalData,
//       statusConfig[record.centerSync.status].label,
//     ]);

//     const csvContent = [
//       headers.join(","),
//       ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "attendance-sync-report.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const exportToPDF = () => {
//     const printWindow = window.open("", "_blank");
//     if (!printWindow) return;

//     const rowsHtml = records
//       .map(
//         (record) => `
//         <tr>
//           <td>${record.machineId}</td>
//           <td>${record.operatorName}</td>
//           <td>${record.centerId}</td>
//           <td>${formatDate(record.centerSync.date)}</td>
//           <td>${record.centerSync.lastSyncTime}</td>
//           <td>${record.centerSync.syncData} / ${record.centerSync.totalData}</td>
//           <td>${statusConfig[record.centerSync.status].label}</td>
//         </tr>
//       `
//       )
//       .join("");

//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Attendance Sync Report</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               padding: 24px;
//               color: #0f172a;
//             }
//             h1 {
//               font-size: 20px;
//               margin-bottom: 8px;
//             }
//             p {
//               font-size: 12px;
//               color: #64748b;
//               margin-bottom: 16px;
//             }
//             table {
//               width: 100%;
//               border-collapse: collapse;
//               font-size: 12px;
//             }
//             th, td {
//               border: 1px solid #e2e8f0;
//               padding: 8px;
//               text-align: left;
//             }
//             th {
//               background: #f8fafc;
//               color: #475569;
//               text-transform: uppercase;
//               font-size: 11px;
//               letter-spacing: 0.04em;
//             }
//           </style>
//         </head>
//         <body>
//           <h1>Attendance Sync Report</h1>
//           <p>Generated on ${new Date().toLocaleString("en-IN")}</p>
//           <table>
//             <thead>
//               <tr>
//                 <th>Machine ID</th>
//                 <th>Operator Name</th>
//                 <th>Center ID</th>
//                 <th>Date</th>
//                 <th>Last Sync Time</th>
//                 <th>Sync Data / Total Data</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${rowsHtml}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `);

//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   return (
//     <div className="min-h-screen bg-white p-6 font-sans dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
//       <div className=" px-2 max-w-8xl">
//         {/* Header */}
//         <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//           <div>
//             <div className="flex items-center gap-2">
//               <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
//                 <Wifi className="h-5 w-5 text-white" />
//               </div>
          
//               <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
//                 Attendance Sync
//               </h1>
//             </div>
//             <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
//               {syncedCount} of {records.length} machines synced
//             </p>

//             <div className="mt-3 flex flex-wrap items-center gap-2">
//               <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                 Total Synced Across All Centers:
//               </span>
//               <span className="text-sm font-semibold text-slate-800 dark:text-white">
//                 {totalSyncedData.toLocaleString()}
//                 <span className="text-xs font-normal text-slate-400">
//                   {" "}
//                   / {totalAllData.toLocaleString()}
//                 </span>
//               </span>
//               <span
//                 className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
//                   overallPct === 100
//                     ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
//                     : overallPct >= 70
//                     ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
//                     : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
//                 }`}
//               >
//                 {overallPct}%
//               </span>
//             </div>

//             <div className="mt-2 h-2 w-64 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
//               <div
//                 className={`h-full rounded-full transition-all duration-700 ${
//                   overallPct === 100
//                     ? "bg-emerald-500"
//                     : overallPct >= 70
//                     ? "bg-amber-400"
//                     : "bg-red-400"
//                 }`}
//                 style={{ width: `${overallPct}%` }}
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
//                 >
//                   <Download className="h-4 w-4" />
//                   Export
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-40">
//                 <DropdownMenuItem onClick={exportToCSV}>
//                   Export CSV
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={exportToPDF}>
//                   Export PDF
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             <Button
//               onClick={handleSyncAll}
//               disabled={syncingAll}
//               className="gap-2 bg-blue-500 text-white hover:bg-blue-600"
//             >
//               <RefreshCw
//                 className={`h-4 w-4 ${syncingAll ? "animate-spin" : ""}`}
//               />
//               {syncingAll ? "Syncing All…" : "Sync All"}
//             </Button>
//           </div>
//         </div>

//         {/* Stats Strip */}
//         <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
//           {(
//             [
//               ["synced", "Synced"],
//               ["pending", "Pending"],
//               ["error", "Error"],
//               ["syncing", "Syncing"],
//             ] as [SyncStatus, string][]
//           ).map(([status, label]) => {
//             const count = records.filter(
//               (r) => r.centerSync.status === status
//             ).length;

//             return (
//               <div
//                 key={status}
//                 className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
//               >
//                 <span className="text-sm text-slate-500 dark:text-slate-400">
//                   {label}
//                 </span>
//                 <span className="text-xl font-bold text-slate-800 dark:text-white">
//                   {count}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Table */}
//         <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-slate-50 hover:bg-slate-50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50">
//                 <TableHead className="h-11 px-4 text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Machine ID
//                 </TableHead>
//                 <TableHead className="h-11 px-4 text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Operator Name
//                 </TableHead>
//                 <TableHead className="h-11 px-4 text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Center ID
//                 </TableHead>
//                 <TableHead className="h-11 px-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Date
//                 </TableHead>
//                 <TableHead className="h-11 px-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Sync Data / Total Data
//                 </TableHead>
//                 <TableHead className="h-11 px-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
//                   Sync Button
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {paginatedRecords.map((record) => {
//                 const { date, lastSyncTime, syncData, totalData, status } =
//                   record.centerSync;
//                 const cfg = statusConfig[status];
//                 const isSyncing = status === "syncing";
//                 const isSynced = status === "synced";

//                 return (
//                     <TableRow
//                       key={record.id}
//                       className="border-b border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
//                     >
//                     <TableCell className="text-sm font-semibold font-mono text-slate-700 dark:text-slate-200">
//                       {record.machineId}
//                     </TableCell>

//                     <TableCell className="text-slate-700 dark:text-slate-200">
//                       <div className="flex items-center gap-2">
//                         <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white">
//                           {record.operatorName
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </div>
//                         <span className="font-medium">{record.operatorName}</span>
//                       </div>
//                     </TableCell>

//                     <TableCell className="text-sm font-medium font-mono text-blue-500 dark:text-slate-200">
//                       {record.centerId}
//                     </TableCell>

//                     <TableCell className="text-center">
//                       <div className="flex flex-col items-center gap-1">
//                         <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
//                           {formatDate(date)}
//                         </span>
//                         <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
//                           {lastSyncTime}
//                         </span>
//                       </div>
//                     </TableCell>

//                     <TableCell>
//                       <div className="flex justify-center">
//                         <SyncProgress
//                           syncData={syncData}
//                           totalData={totalData}
//                         />
//                       </div>
//                     </TableCell>

//                     <TableCell className="text-center">
//                       <div className="flex flex-col items-center gap-1.5">
//                         <Button
//                           size="sm"
//                           variant={isSynced ? "outline" : "default"}
//                           disabled={isSyncing}
//                           onClick={() => handleSync(record.id)}
//                           className={`gap-1.5 text-xs font-medium transition-all ${
//                             isSynced
//                               ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400"
//                               : isSyncing
//                               ? "cursor-not-allowed bg-blue-500 text-white"
//                               : "bg-blue-600 text-white hover:bg-blue-700"
//                           }`}
//                         >
//                           <RefreshCw
//                             className={`h-3 w-3 ${isSyncing ? "animate-spin" : ""}`}
//                           />
//                           {isSyncing
//                             ? "Syncing…"
//                             : isSynced
//                             ? "Re-Sync"
//                             : "Sync"}
//                         </Button>

//                         <span
//                           className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${cfg.color}`}
//                         >
//                           {cfg.icon}
//                           {cfg.label}
//                         </span>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
//               <span className="text-xs text-slate-500 dark:text-slate-400">
//                 Showing {(page - 1) * PAGE_SIZE + 1}–
//                 {Math.min(page * PAGE_SIZE, records.length)} of {records.length}{" "}
//                 records
//               </span>

//               <div className="flex items-center gap-1">
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="h-8 w-8 text-slate-500"
//                   disabled={page === 1}
//                   onClick={() => setPage(page - 1)}
//                 >
//                   {"<"}
//                 </Button>

//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                   (p) => (
//                     <Button
//                       key={p}
//                       size="sm"
//                       variant={p === page ? "default" : "ghost"}
//                       className={`h-8 w-8 text-xs ${
//                         p === page
//                           ? "bg-rose-500 text-white hover:bg-rose-600"
//                           : "text-slate-600"
//                       }`}
//                       onClick={() => setPage(p)}
//                     >
//                       {p}
//                     </Button>
//                   )
//                 )}

//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="h-8 w-8 text-slate-500"
//                   disabled={page === totalPages}
//                   onClick={() => setPage(page + 1)}
//                 >
//                   {">"}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-600">
//           {refreshedAt ? `Last refreshed · ${refreshedAt}` : ""}
//         </p>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Wifi } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
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

// ─── Types ────────────────────────────────────────────────────────────────────

type SyncStatus = "synced" | "pending" | "error" | "syncing";

interface AttendanceRecord {
  id: string;
  machineId: string;
  operatorName: string;
  centerId: string;
  centerSync: {
    date: string;
    lastSyncTime: string;
    syncData: number;
    totalData: number;
    status: SyncStatus;
  };
}

type SortKey = "machineId" | "operatorName" | "centerId" | "date";
type SortDirection = "asc" | "desc" | null;

// ─── Filter types ─────────────────────────────────────────────────────────────

type FilterFieldKey = "machineId" | "operatorName" | "centerId";

interface FilterField { key: FilterFieldKey; label: string }

const FILTER_FIELDS: FilterField[] = [
  { key: "machineId",    label: "Machine ID"    },
  { key: "operatorName", label: "Operator Name" },
  { key: "centerId",     label: "Center ID"     },
];

interface TextFilter { value: string }
interface ActiveFilters { text: Partial<Record<FilterFieldKey, TextFilter>> }

const emptyFilters = (): ActiveFilters => ({ text: {} });

function countActiveFilters(f: ActiveFilters) {
  return Object.values(f.text).filter((v) => v && v.value.trim() !== "").length;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const initialData: AttendanceRecord[] = [
  { id: "1",  machineId: "MCH-001", operatorName: "Ravi Kumar",   centerId: "DOME-DELHI-042",   centerSync: { date: "2026-03-09", lastSyncTime: "09:45 AM", syncData: 120, totalData: 120, status: "synced"  } },
  { id: "2",  machineId: "MCH-002", operatorName: "Priya Sharma", centerId: "DOME-MUMBAI-017",  centerSync: { date: "2026-03-09", lastSyncTime: "11:20 AM", syncData: 85,  totalData: 102, status: "pending" } },
  { id: "3",  machineId: "MCH-003", operatorName: "Amit Verma",   centerId: "DOME-BLORE-089",   centerSync: { date: "2026-03-08", lastSyncTime: "06:15 PM", syncData: 0,   totalData: 74,  status: "error"   } },
  { id: "4",  machineId: "MCH-004", operatorName: "Sunita Patel", centerId: "DOME-HYD-031",     centerSync: { date: "2026-03-09", lastSyncTime: "08:30 AM", syncData: 210, totalData: 210, status: "synced"  } },
  { id: "5",  machineId: "MCH-005", operatorName: "Deepak Nair",  centerId: "DOME-CHENNAI-056", centerSync: { date: "2026-03-07", lastSyncTime: "03:55 PM", syncData: 45,  totalData: 98,  status: "pending" } },
  { id: "6",  machineId: "MCH-006", operatorName: "Meena Joshi",  centerId: "DOME-PUNE-073",    centerSync: { date: "2026-03-09", lastSyncTime: "10:10 AM", syncData: 133, totalData: 133, status: "synced"  } },
  { id: "7",  machineId: "MCH-001", operatorName: "Ravi Kumar",   centerId: "DOME-DELHI-042",   centerSync: { date: "2026-03-09", lastSyncTime: "09:45 AM", syncData: 120, totalData: 120, status: "synced"  } },
  { id: "8",  machineId: "MCH-002", operatorName: "Priya Sharma", centerId: "DOME-MUMBAI-017",  centerSync: { date: "2026-03-09", lastSyncTime: "11:20 AM", syncData: 85,  totalData: 102, status: "pending" } },
  { id: "9",  machineId: "MCH-003", operatorName: "Amit Verma",   centerId: "DOME-BLORE-089",   centerSync: { date: "2026-03-08", lastSyncTime: "06:15 PM", syncData: 0,   totalData: 74,  status: "error"   } },
  { id: "10", machineId: "MCH-004", operatorName: "Sunita Patel", centerId: "DOME-HYD-031",     centerSync: { date: "2026-03-09", lastSyncTime: "08:30 AM", syncData: 210, totalData: 210, status: "synced"  } },
  { id: "11", machineId: "MCH-005", operatorName: "Deepak Nair",  centerId: "DOME-CHENNAI-056", centerSync: { date: "2026-03-07", lastSyncTime: "03:55 PM", syncData: 45,  totalData: 98,  status: "pending" } },
  { id: "12", machineId: "MCH-006", operatorName: "Meena Joshi",  centerId: "DOME-PUNE-073",    centerSync: { date: "2026-03-09", lastSyncTime: "10:10 AM", syncData: 133, totalData: 133, status: "synced"  } },
  { id: "13", machineId: "MCH-001", operatorName: "Ravi Kumar",   centerId: "DOME-DELHI-042",   centerSync: { date: "2026-03-09", lastSyncTime: "09:45 AM", syncData: 120, totalData: 120, status: "synced"  } },
  { id: "14", machineId: "MCH-002", operatorName: "Priya Sharma", centerId: "DOME-MUMBAI-017",  centerSync: { date: "2026-03-09", lastSyncTime: "11:20 AM", syncData: 85,  totalData: 102, status: "pending" } },
  { id: "15", machineId: "MCH-003", operatorName: "Amit Verma",   centerId: "DOME-BLORE-089",   centerSync: { date: "2026-03-08", lastSyncTime: "06:15 PM", syncData: 0,   totalData: 74,  status: "error"   } },
  { id: "16", machineId: "MCH-004", operatorName: "Sunita Patel", centerId: "DOME-HYD-031",     centerSync: { date: "2026-03-09", lastSyncTime: "08:30 AM", syncData: 210, totalData: 210, status: "synced"  } },
  { id: "17", machineId: "MCH-005", operatorName: "Deepak Nair",  centerId: "DOME-CHENNAI-056", centerSync: { date: "2026-03-07", lastSyncTime: "03:55 PM", syncData: 45,  totalData: 98,  status: "pending" } },
  { id: "18", machineId: "MCH-006", operatorName: "Meena Joshi",  centerId: "DOME-PUNE-073",    centerSync: { date: "2026-03-09", lastSyncTime: "10:10 AM", syncData: 133, totalData: 133, status: "synced"  } },
];

// ─── Status config ────────────────────────────────────────────────────────────

const statusConfig: Record<SyncStatus, { label: string; color: string; icon: React.ReactNode }> = {
  synced:  { label: "Synced",    color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle2 className="w-3 h-3" /> },
  pending: { label: "Pending",   color: "bg-amber-50 text-amber-700 border-amber-200",       icon: <Clock className="w-3 h-3" /> },
  error:   { label: "Error",     color: "bg-red-50 text-red-700 border-red-200",             icon: <AlertCircle className="w-3 h-3" /> },
  syncing: { label: "Syncing…",  color: "bg-blue-50 text-blue-700 border-blue-200",          icon: <RefreshCw className="w-3 h-3 animate-spin" /> },
};

// ─── SyncProgress ─────────────────────────────────────────────────────────────

function SyncProgress({ syncData, totalData }: { syncData: number; totalData: number }) {
  const pct = totalData === 0 ? 0 : Math.round((syncData / totalData) * 100);
  return (
    <div className="flex min-w-[120px] flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-slate-700">{syncData}<span className="font-normal text-slate-400"> / {totalData}</span></span>
        <span className={`font-semibold ${pct === 100 ? "text-emerald-600" : pct > 50 ? "text-amber-600" : "text-red-500"}`}>{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? "bg-emerald-500" : pct > 50 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Sort Icon Button ─────────────────────────────────────────────────────────

function SortIconButton({ columnKey, sortKey, sortDirection, onSort, isText }: {
  columnKey: SortKey; sortKey: SortKey | null; sortDirection: SortDirection;
  onSort: (k: SortKey) => void; isText?: boolean;
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

// ─── Sidebar Filter ───────────────────────────────────────────────────────────

function SidebarFilter({ open, onClose, filters, onApply, onClearAll }: {
  open: boolean; onClose: () => void; filters: ActiveFilters;
  onApply: (f: ActiveFilters) => void; onClearAll: () => void;
}) {
  const [draft, setDraft] = useState<ActiveFilters>(() => JSON.parse(JSON.stringify(filters)));
  const [expanded, setExpanded] = useState<Partial<Record<FilterFieldKey, boolean>>>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setDraft(JSON.parse(JSON.stringify(filters))); }, [filters]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  const toggle = (key: FilterFieldKey) => setExpanded((p) => ({ ...p, [key]: !p[key] }));
  const setText = (key: FilterFieldKey, value: string) => setDraft((p) => ({ ...p, text: { ...p.text, [key]: { value } } }));
  const clearField = (key: FilterFieldKey) => setDraft((p) => { const n = JSON.parse(JSON.stringify(p)); delete n.text[key]; return n; });
  const handleApply = () => { onApply(draft); onClose(); };
  const handleClearAll = () => { setDraft(emptyFilters()); setExpanded({}); onClearAll(); };
  const draftCount = countActiveFilters(draft);

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
            const isOpen = !!expanded[field.key];
            const val = draft.text[field.key];
            const hasValue = val && val.value.trim() !== "";
            return (
              <div key={field.key} className="border-b border-slate-100 last:border-0">
                <button type="button" onClick={() => toggle(field.key)} className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-slate-700">{field.label}</span>
                    {hasValue && <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {hasValue && <button type="button" onClick={(e) => { e.stopPropagation(); clearField(field.key); }} className="text-[11px] text-slate-400 hover:text-rose-500 transition-colors">Clear</button>}
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

        <div className="px-5 py-4 border-t border-slate-100 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-9 text-xs text-slate-600" onClick={handleClearAll}>Clear All</Button>
          <Button size="sm" className="flex-1 h-9 text-xs bg-rose-500 hover:bg-rose-600 text-white" onClick={handleApply}>Apply Filters</Button>
        </div>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AttendanceSync() {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialData);
  const [syncingAll, setSyncingAll] = useState(false);
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(emptyFilters());
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [refreshedAt, setRefreshedAt] = useState<string>("");

  const PAGE_SIZE = 8;
  const filterBadgeCount = countActiveFilters(activeFilters);

  useEffect(() => {
    setRefreshedAt(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
  }, []);

  // ── Filter ─────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => {
    let data = [...records];
    for (const [key, f] of Object.entries(activeFilters.text) as [FilterFieldKey, TextFilter][]) {
      if (!f || f.value.trim() === "") continue;
      const q = f.value.trim().toLowerCase();
      data = data.filter((r) => String(r[key]).toLowerCase().includes(q));
    }
    return data;
  }, [records, activeFilters]);

  // ── Sort ───────────────────────────────────────────────────────────────────

  const sorted = useMemo(() => {
    if (!sortKey || !sortDirection) return filtered;
    return [...filtered].sort((a, b) => {
      if (sortKey === "date") {
        const aMs = new Date(`${a.centerSync.date} ${a.centerSync.lastSyncTime}`).getTime();
        const bMs = new Date(`${b.centerSync.date} ${b.centerSync.lastSyncTime}`).getTime();
        return sortDirection === "asc" ? aMs - bMs : bMs - aMs;
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
  const paginatedRecords = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // ── Sync handlers ──────────────────────────────────────────────────────────

  const handleSync = (id: string) => {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, centerSync: { ...r.centerSync, status: "syncing" } } : r));
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => r.id === id ? {
        ...r, centerSync: { ...r.centerSync, date: new Date().toISOString().split("T")[0],
          lastSyncTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
          syncData: r.centerSync.totalData, status: "synced" }
      } : r));
    }, 1800);
  };

  const handleSyncAll = () => {
    setSyncingAll(true);
    setRecords((prev) => prev.map((r) => ({ ...r, centerSync: { ...r.centerSync, status: "syncing" } })));
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => ({
        ...r, centerSync: { ...r.centerSync, date: new Date().toISOString().split("T")[0],
          lastSyncTime: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
          syncData: r.centerSync.totalData, status: "synced" }
      })));
      setSyncingAll(false);
    }, 2200);
  };

  // ── Stats ──────────────────────────────────────────────────────────────────

  const syncedCount = records.filter((r) => r.centerSync.status === "synced").length;
  const totalSyncedData = records.reduce((s, r) => s + r.centerSync.syncData, 0);
  const totalAllData = records.reduce((s, r) => s + r.centerSync.totalData, 0);
  const overallPct = totalAllData === 0 ? 0 : Math.round((totalSyncedData / totalAllData) * 100);

  // ── Export ─────────────────────────────────────────────────────────────────

  const formatDate = (d: string) => {
    const [year, month, day] = d.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${day} ${months[parseInt(month, 10) - 1]} ${year}`;
  };

  const exportToCSV = () => {
    const headers = ["Machine ID","Operator Name","Center ID","Date","Last Sync Time","Synced Data","Total Data","Status"];
    const rows = records.map((r) => [r.machineId, r.operatorName, r.centerId, formatDate(r.centerSync.date), r.centerSync.lastSyncTime, r.centerSync.syncData, r.centerSync.totalData, statusConfig[r.centerSync.status].label]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url; link.setAttribute("download", "attendance-sync-report.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    const rowsHtml = records.map((r) => `<tr><td>${r.machineId}</td><td>${r.operatorName}</td><td>${r.centerId}</td><td>${formatDate(r.centerSync.date)}</td><td>${r.centerSync.lastSyncTime}</td><td>${r.centerSync.syncData} / ${r.centerSync.totalData}</td><td>${statusConfig[r.centerSync.status].label}</td></tr>`).join("");
    printWindow.document.write(`<html><head><title>Attendance Sync Report</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#0f172a}h1{font-size:20px;margin-bottom:8px}p{font-size:12px;color:#64748b;margin-bottom:16px}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #e2e8f0;padding:8px;text-align:left}th{background:#f8fafc;color:#475569;text-transform:uppercase;font-size:11px;letter-spacing:.04em}</style></head><body><h1>Attendance Sync Report</h1><p>Generated on ${new Date().toLocaleString("en-IN")}</p><table><thead><tr><th>Machine ID</th><th>Operator Name</th><th>Center ID</th><th>Date</th><th>Last Sync Time</th><th>Sync Data / Total Data</th><th>Status</th></tr></thead><tbody>${rowsHtml}</tbody></table></body></html>`);
    printWindow.document.close(); printWindow.focus(); printWindow.print();
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <SidebarFilter
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        filters={activeFilters}
        onApply={(f) => { setActiveFilters(f); setPage(1); }}
        onClearAll={() => { setActiveFilters(emptyFilters()); setPage(1); }}
      />

      <div className="px-2 max-w-8xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-slate-900">Attendance Sync</h1>
            </div>
            <p className="mt-1 text-sm text-slate-500">{syncedCount} of {records.length} machines synced</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Total Synced Across All Centers:</span>
              <span className="text-sm font-semibold text-slate-800">{totalSyncedData.toLocaleString()}<span className="text-xs font-normal text-slate-400"> / {totalAllData.toLocaleString()}</span></span>
              <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${overallPct === 100 ? "bg-emerald-100 text-emerald-700" : overallPct >= 70 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600"}`}>{overallPct}%</span>
            </div>
            <div className="mt-2 h-2 w-64 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full transition-all duration-700 ${overallPct === 100 ? "bg-emerald-500" : overallPct >= 70 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${overallPct}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setSidebarOpen(true)}
              className={`gap-2 ${filterBadgeCount > 0 ? "border-rose-300 text-rose-600 bg-rose-50 hover:bg-rose-100" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {filterBadgeCount > 0 && (
                <span className="inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold">{filterBadgeCount}</span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={exportToCSV}>Export CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF}>Export PDF</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={handleSyncAll} disabled={syncingAll} className="gap-2 bg-blue-500 text-white hover:bg-blue-600">
              <RefreshCw className={`h-4 w-4 ${syncingAll ? "animate-spin" : ""}`} />
              {syncingAll ? "Syncing All…" : "Sync All"}
            </Button>
          </div>
        </div>

        {/* Active filter chips */}
        {filterBadgeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.entries(activeFilters.text) as [FilterFieldKey, TextFilter][]).map(([key, f]) => {
              if (!f || f.value.trim() === "") return null;
              const label = FILTER_FIELDS.find((x) => x.key === key)?.label ?? key;
              return (
                <span key={key} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] text-slate-600 font-medium">
                  {label}: "{f.value}"
                  <button onClick={() => { const n = JSON.parse(JSON.stringify(activeFilters)) as ActiveFilters; delete n.text[key]; setActiveFilters(n); setPage(1); }} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            <button onClick={() => { setActiveFilters(emptyFilters()); setPage(1); }} className="text-[11px] text-rose-500 hover:text-rose-700 font-medium transition-colors">Clear all</button>
          </div>
        )}

        {/* Stats Strip */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(["synced","pending","error","syncing"] as SyncStatus[]).map((status) => (
            <div key={status} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <span className="text-sm text-slate-500">{statusConfig[status].label}</span>
              <span className="text-xl font-bold text-slate-800">{records.filter((r) => r.centerSync.status === status).length}</span>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="h-11 px-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <div className="inline-flex items-center gap-1">Machine ID <SortIconButton columnKey="machineId" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} isText /></div>
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <div className="inline-flex items-center gap-1">Operator Name <SortIconButton columnKey="operatorName" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} isText /></div>
                </TableHead>
                <TableHead className="h-11 px-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <div className="inline-flex items-center gap-1">Center ID <SortIconButton columnKey="centerId" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} isText /></div>
                </TableHead>
                <TableHead className="h-11 px-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
                  <div className="inline-flex items-center justify-center gap-1">Date <SortIconButton columnKey="date" sortKey={sortKey} sortDirection={sortDirection} onSort={handleSort} /></div>
                </TableHead>
                <TableHead className="h-11 px-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">Sync Data / Total Data</TableHead>
                <TableHead className="h-11 px-4 text-center text-xs font-medium uppercase tracking-wide text-slate-500">Sync Button</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginatedRecords.map((record) => {
                const { date, lastSyncTime, syncData, totalData, status } = record.centerSync;
                const cfg = statusConfig[status];
                const isSyncing = status === "syncing";
                const isSynced = status === "synced";
                return (
                  <TableRow key={record.id} className="border-b border-slate-200 transition-colors hover:bg-slate-50/80">
                    <TableCell className="text-sm font-semibold font-mono text-slate-700">{record.machineId}</TableCell>
                    <TableCell className="text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-xs font-bold text-white">
                          {record.operatorName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium">{record.operatorName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium font-mono text-blue-500">{record.centerId}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-medium text-slate-700">{formatDate(date)}</span>
                        <span className="font-mono text-[11px] text-slate-400">{lastSyncTime}</span>
                      </div>
                    </TableCell>
                    <TableCell><div className="flex justify-center"><SyncProgress syncData={syncData} totalData={totalData} /></div></TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <Button
                          size="sm"
                          variant={isSynced ? "outline" : "default"}
                          disabled={isSyncing}
                          onClick={() => handleSync(record.id)}
                          className={`gap-1.5 text-xs font-medium transition-all ${isSynced ? "border-emerald-300 text-emerald-700 hover:bg-emerald-50" : isSyncing ? "cursor-not-allowed bg-blue-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                        >
                          <RefreshCw className={`h-3 w-3 ${isSyncing ? "animate-spin" : ""}`} />
                          {isSyncing ? "Syncing…" : isSynced ? "Re-Sync" : "Sync"}
                        </Button>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${cfg.color}`}>
                          {cfg.icon}{cfg.label}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <span className="text-xs text-slate-500">Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, sorted.length)} of {sorted.length} records</span>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500" disabled={page === 1} onClick={() => setPage(page - 1)}>{"<"}</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button key={p} size="sm" variant={p === page ? "default" : "ghost"} className={`h-8 w-8 text-xs ${p === page ? "bg-rose-500 text-white hover:bg-rose-600" : "text-slate-600"}`} onClick={() => setPage(p)}>{p}</Button>
                ))}
                <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-500" disabled={page === totalPages} onClick={() => setPage(page + 1)}>{">"}</Button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">{refreshedAt ? `Last refreshed · ${refreshedAt}` : ""}</p>
      </div>
    </div>
  );
}