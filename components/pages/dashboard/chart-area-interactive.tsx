// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   TooltipProps,
// } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
// import { Separator } from "@/components/ui/separator";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface CentreData {
//   centre: string;
//   city: string;
//   TotalVal: number;
//   AppearedVal: number;
//   Percentage: number;
//   trend: number;
// }

// type ViewKey = "centre" | "city" | "enrollment";
// type OrderByKey = "default" | "TotalVal" | "AppearedVal" | "Percentage" | "centre" | "city" | "enrollment";

// interface ChartRow {
//   label: string;
//   TotalVal: number;
//   AppearedVal: number;
//   Percentage: number; 
//   trend: number;
// }

// // ─── Data ─────────────────────────────────────────────────────────────────────

// const rawData: CentreData[] = [
//   { centre: "NMIMS Mumbai", city: "Mumbai", TotalVal: 72, AppearedVal: 58, Percentage: 81, trend: 80 },
//   { centre: "MAIT Delhi", city: "Delhi", TotalVal: 85, AppearedVal: 70, Percentage: 82, trend: 83 },
//   { centre: "COEP Pune", city: "Pune", TotalVal: 60, AppearedVal: 48, Percentage: 80, trend: 79 },
//   { centre: "Anna University", city: "Chennai", TotalVal: 90, AppearedVal: 75, Percentage: 83, trend: 84 },
//   { centre: "Jadavpur University", city: "Kolkata", TotalVal: 55, AppearedVal: 42, Percentage: 76, trend: 75 },
//   { centre: "Osmania University", city: "Hyderabad", TotalVal: 78, AppearedVal: 63, Percentage: 81, trend: 82 },
//   { centre: "IISc Bangalore", city: "Bangalore", TotalVal: 95, AppearedVal: 80, Percentage: 84, trend: 85 },
//   { centre: "Nirma University", city: "Ahmedabad", TotalVal: 65, AppearedVal: 52, Percentage: 80, trend: 81 },
//   { centre: "MNIT Jaipur", city: "Jaipur", TotalVal: 70, AppearedVal: 57, Percentage: 81, trend: 80 },
//   { centre: "IET Lucknow", city: "Lucknow", TotalVal: 82, AppearedVal: 68, Percentage: 83, trend: 82 },
//   { centre: "SVNIT Surat", city: "Surat", TotalVal: 58, AppearedVal: 45, Percentage: 78, trend: 77 },
//   { centre: "VNIT Nagpur", city: "Nagpur", TotalVal: 88, AppearedVal: 73, Percentage: 83, trend: 84 },
//   { centre: "IIT Indore", city: "Indore", TotalVal: 63, AppearedVal: 50, Percentage: 79, trend: 78 },
//   { centre: "MANIT Bhopal", city: "Bhopal", TotalVal: 76, AppearedVal: 62, Percentage: 82, trend: 81 },
//   { centre: "NIT Patna", city: "Patna", TotalVal: 50, AppearedVal: 38, Percentage: 76, trend: 75 },
//   { centre: "MSU Vadodara", city: "Vadodara", TotalVal: 84, AppearedVal: 69, Percentage: 82, trend: 83 },
//   { centre: "PSG Tech", city: "Coimbatore", TotalVal: 68, AppearedVal: 55, Percentage: 81, trend: 80 },
//   { centre: "Dayalbagh University", city: "Agra", TotalVal: 92, AppearedVal: 77, Percentage: 84, trend: 85 },
//   { centre: "CUSAT Kochi", city: "Kochi", TotalVal: 61, AppearedVal: 49, Percentage: 80, trend: 79 },
//   { centre: "Panjab University", city: "Chandigarh", TotalVal: 79, AppearedVal: 64, Percentage: 81, trend: 82 }
// ]

// // ─── Constants ────────────────────────────────────────────────────────────────

// const VIEWS: { key: ViewKey; label: string }[] = [
//   { key: "centre",     label: "Centre" },
//   { key: "city",       label: "City" },
//   { key: "enrollment", label: "EnrollmentTime" }, 
// ];

// const LEGEND_ITEMS = [
//   { key: "TotalVal",     label: "Total",       color: "#22c55e", line: false },
//   { key: "AppearedVal",  label: "Appeared",    color: "#eab308", line: false },
//   { key: "Percentage",   label: "Percentage",  color: "#f97316", line: false },
//   { key: "trend",        label: "Trend Line",  color: "#3b82f6", line: true  },
// ] as const;

// // ─── Custom Tooltip ───────────────────────────────────────────────────────────

// function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
//   if (!active || !payload?.length) return null;


//   return (
//     <div className="rounded-xl border border-slate-200 bg-white px-2 py-3 shadow-xl text-sm">
//       <p className="mb-2 font-semibold text-slate-700">{label}</p>
//       {payload.map((entry) => (
//         <div key={entry.dataKey as string} className="flex items-center gap-2 text-slate-600 mb-1">
//           <span
//             className="inline-block h-2.5 w-2.5 rounded-full"
//             style={{ backgroundColor: entry.color }}
//           />
//           <span className="text-slate-500">{entry.name}:</span>
//           <span className="font-semibold text-slate-800">{entry.value}%</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ─── Legend ───────────────────────────────────────────────────────────────────

// function ChartLegend() {
//   return (
//     <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
//       {LEGEND_ITEMS.map(({ key, label, color, line }) => (
//         <span key={key} className="flex items-center gap-1.5">
//           {line ? (
//             <span
//               className="inline-block h-0.5 w-5 rounded-full"
//               style={{ backgroundColor: color }}
//             />
//           ) : (
//             <span
//               className="inline-block h-2.5 w-2.5 rounded-sm"
//               style={{ backgroundColor: color }}
//             />
//           )}
//           {label}
//         </span>
//       ))}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────

// export function CentreStats() {
//   const [view, setView] = useState<ViewKey>("centre");
//   const [orderBy, setOrderBy] = useState<OrderByKey>("default");

//   //logic for adding smart toggling functionality along with orderby.
//   const dynamicOrderOptions = useMemo(() => {
//     const baseOptions = [
//       { label: "Default", value: "default" as OrderByKey },
//       { label: "Total", value: "TotalVal" as OrderByKey },
//       { label: "Appeared", value: "AppearedVal" as OrderByKey },
//       { label: "Percentage", value: "Percentage" as OrderByKey },
//     ];
  
//     if (view === "city") {
//       baseOptions.push({ label: "City", value: "city" });
//     } else if (view === "centre") {
//       baseOptions.push({ label: "Centre", value: "centre" });
//     } else {
//       baseOptions.push({ label: "Enrollment Time", value: "enrollment" });
//     }
  
//     return baseOptions;
//   }, [view]);

//   const chartData: ChartRow[] = useMemo(() => {
//     let data = rawData.map((d) => ({
//       label: view === "city" ? d.city : d.centre,
//       TotalVal: d.TotalVal,
//       AppearedVal: d.AppearedVal,
//       Percentage: d.Percentage,
//       trend: d.trend,
//       centre: d.centre,
//       city: d.city,
//       enrollment: "Morning", // dummy for now, replace with real field later if needed
//     }));
  
//     if (orderBy === "TotalVal" || orderBy === "AppearedVal" || orderBy === "Percentage") {
//       data.sort((a, b) => b[orderBy] - a[orderBy]);
//     } else if (orderBy === "centre" || orderBy === "city" || orderBy === "enrollment") {
//       data.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
//     }
  
//     return data;
//   }, [view, orderBy]);

//   return (
//     <Card className="w-full shadow-md rounded-2xl border border-slate-200 bg-white">
//       <CardHeader className="pb-1">
//         {/* Title row */}
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
//           {/* Left: Title + Legend */}
//           <div className="flex flex-col">
//             <CardTitle className="text-base font-bold text-slate-800 tracking-tight px-3">
//               Centre Stats
//             </CardTitle>
//             <div className="pt-1 px-3">
//               <ChartLegend />
//             </div>
//           </div>
        
//           {/* Right: ToggleGroup + Order by */}
//           <div className="flex items-center gap-4">
//             {/* ToggleGroup */}
//             <ToggleGroup
//               type="single"
//               value={view}
//               onValueChange={(val) => val && setView(val as ViewKey)}
//               className="border border-slate-200 rounded-lg p-0.5 bg-slate-50 h-fit"
//             >
//               {VIEWS.map(({ key, label }) => (
//                 <ToggleGroupItem
//                   key={key}
//                   value={key}
//                   className="text-xs px-3 py-1.5 rounded-md
//                     data-[state=on]:bg-blue-600
//                     data-[state=on]:text-white
//                     data-[state=on]:shadow-sm
//                     text-slate-500 hover:text-slate-800
//                     transition-all duration-150"
//                 >
//                   {label}
//                 </ToggleGroupItem>
//               ))}
//             </ToggleGroup>
        
//             {/* Order by */}
//             <div className="flex items-center gap-1.5 shrink-0">
//               <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
//                 Order by
//               </span>
//               <Select value={orderBy} onValueChange={(value) => setOrderBy(value as OrderByKey)}>
//                 <SelectTrigger className="h-7 text-xs w-[90px] sm:w-[110px]">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {dynamicOrderOptions.map((option) => (
//                     <SelectItem key={option.value} value={option.value} className="text-xs">
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>

//         <Separator className="mt-3" />

//       </CardHeader>

//       <CardContent className="px-2 pb-4 sm:px-4">
//         <ResponsiveContainer width="100%" height={300}>
//           <ComposedChart
//             data={chartData}
//             margin={{ top: 8, right: 12, left: -16, bottom: 48 }}
//             barGap={2}
//             barCategoryGap="32%"
//           >
//             <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="4 4" />

//             <XAxis
//               dataKey="label"
//               tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
//               tickLine={false}
//               axisLine={{ stroke: "#e2e8f0" }}
//               interval={0}
//               angle={-40}
//               textAnchor="end"
//               height={56}
//             />

//             <YAxis
//               tick={{ fontSize: 10, fill: "#94a3b8" }}
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(v: number) => `${v}%`}
//               domain={[0, 100]}
//               width={40}
//             />

//             <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(241,245,249,0.6)" }} />

//             {/* Grouped Bars */}
//             <Bar
//               dataKey="TotalVal"
//               name="Total"
//               fill="#22c55e"
//               radius={[3, 3, 0, 0]}
//               maxBarSize={14}
//             />
//             <Bar
//               dataKey="AppearedVal"
//               name="Appeared"
//               fill="#eab308"
//               radius={[3, 3, 0, 0]}
//               maxBarSize={14}
//             />
//             <Bar
//               dataKey="Percentage"
//               name="Percentage"
//               fill="#f97316"
//               radius={[3, 3, 0, 0]}
//               maxBarSize={14}
//             />

//             {/* Trend line */}
//             <Line
//               type="monotone"
//               dataKey="trend"
//               name="Trend Line"
//               stroke="#3b82f6"
//               strokeWidth={2.5}
//               dot={false}
//               activeDot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }



"use client";

import React, { useState, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CentreData {
  centre: string;
  city: string;
  enrollmentTime: string; // 24-hour format: HH:mm
  TotalVal: number;
  AppearedVal: number;
  Percentage: number;
  trend: number;
}

type ViewKey = "centre" | "city" | "enrollmentTime";
type OrderByKey = "default" | "TotalVal" | "AppearedVal" | "Percentage" | "centre" | "city" | "enrollmentTime";

interface ChartRow {
  label: string;
  TotalVal: number;
  AppearedVal: number;
  Percentage: number;
  trend: number;
  centre: string;
  city: string;
  enrollmentTime: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const rawData: CentreData[] = [
  { centre: "NMIMS Mumbai", city: "Mumbai", enrollmentTime: "08:30", TotalVal: 72, AppearedVal: 58, Percentage: 81, trend: 80 },
  { centre: "MAIT Delhi", city: "Delhi", enrollmentTime: "09:15", TotalVal: 85, AppearedVal: 70, Percentage: 82, trend: 83 },
  { centre: "COEP Pune", city: "Pune", enrollmentTime: "10:00", TotalVal: 60, AppearedVal: 48, Percentage: 80, trend: 79 },
  { centre: "Anna University", city: "Chennai", enrollmentTime: "08:45", TotalVal: 90, AppearedVal: 75, Percentage: 83, trend: 84 },
  { centre: "Jadavpur University", city: "Kolkata", enrollmentTime : "11:30", TotalVal: 55, AppearedVal: 42, Percentage: 76, trend: 75 },
  { centre: "Osmania University", city: "Hyderabad", enrollmentTime: "09:50", TotalVal: 78, AppearedVal: 63, Percentage: 81, trend: 82 },
  { centre: "IISc Bangalore", city: "Bangalore", enrollmentTime: "07:45", TotalVal: 95, AppearedVal: 80, Percentage: 84, trend: 85 },
  { centre: "Nirma University", city: "Ahmedabad", enrollmentTime: "10:20", TotalVal: 65, AppearedVal: 52, Percentage: 80, trend: 81 },
  { centre: "MNIT Jaipur", city: "Jaipur", enrollmentTime: "08:10", TotalVal: 70, AppearedVal: 57, Percentage: 81, trend: 80 },
  { centre: "IET Lucknow", city: "Lucknow", enrollmentTime: "09:05", TotalVal: 82, AppearedVal: 68, Percentage: 83, trend: 82 },
  { centre: "SVNIT Surat", city: "Surat", enrollmentTime: "10:40", TotalVal: 58, AppearedVal: 45, Percentage: 78, trend: 77 },
  { centre: "VNIT Nagpur", city: "Nagpur", enrollmentTime: "08:55", TotalVal: 88, AppearedVal: 73, Percentage: 83, trend: 84 },
  { centre: "IIT Indore", city: "Indore", enrollmentTime: "11:00", TotalVal: 63, AppearedVal: 50, Percentage: 79, trend: 78 },
  { centre: "MANIT Bhopal", city: "Bhopal", enrollmentTime: "09:30", TotalVal: 76, AppearedVal: 62, Percentage: 82, trend: 81 },
  { centre: "NIT Patna", city: "Patna", enrollmentTime: "12:15", TotalVal: 50, AppearedVal: 38, Percentage: 76, trend: 75 },
  { centre: "MSU Vadodara", city: "Vadodara", enrollmentTime: "08:20", TotalVal: 84, AppearedVal: 69, Percentage: 82, trend: 83 },
  { centre: "PSG Tech", city: "Coimbatore", enrollmentTime: "10:10", TotalVal: 68, AppearedVal: 55, Percentage: 81, trend: 80 },
  { centre: "Dayalbagh University", city: "Agra", enrollmentTime: "07:30", TotalVal: 92, AppearedVal: 77, Percentage: 84, trend: 85 },
  { centre: "CUSAT Kochi", city: "Kochi", enrollmentTime: "11:45", TotalVal: 61, AppearedVal: 49, Percentage: 80, trend: 79 },
  { centre: "Panjab University", city: "Chandigarh", enrollmentTime: "09:40", TotalVal: 79, AppearedVal: 64, Percentage: 81, trend: 82 },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const VIEWS: { key: ViewKey; label: string }[] = [
  { key: "centre", label: "Centre" },
  { key: "city", label: "City" },
  { key: "enrollmentTime", label: "Enrollment Time" },
];

const LEGEND_ITEMS = [
  { key: "TotalVal", label: "Total", color: "#22c55e", line: false },
  { key: "AppearedVal", label: "Appeared", color: "#eab308", line: false },
  { key: "Percentage", label: "Percentage", color: "#3b82f6", line: true },
  // { key: "trend", label: "Trend Line", color: "#3b82f6", line: true },
] as const;

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-2 py-3 shadow-xl text-sm">
      <p className="mb-2 font-semibold text-slate-700">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey as string} className="flex items-center gap-2 text-slate-600 mb-1">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-500">{entry.name}:</span>
          <span className="font-semibold text-slate-800">
            {entry.dataKey === "Percentage" ? `${entry.value}%` : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

function ChartLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
      {LEGEND_ITEMS.map(({ key, label, color, line }) => (
        <span key={key} className="flex items-center gap-1.5">
          {line ? (
            <span
              className="inline-block h-0.5 w-5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ) : (
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: color }}
            />
          )}
          {label}
        </span>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CentreStats() {
  const [view, setView] = useState<ViewKey>("centre");
  const [orderBy, setOrderBy] = useState<OrderByKey>("default");

  const dynamicOrderOptions = useMemo(() => {
    const baseOptions = [
      { label: "Select", value: "default" as OrderByKey },
      { label: "Total", value: "TotalVal" as OrderByKey },
      { label: "Appeared", value: "AppearedVal" as OrderByKey },
      { label: "Percentage", value: "Percentage" as OrderByKey },
    ];

    if (view === "city") {
      baseOptions.push({ label: "City", value: "city" });
    } else if (view === "centre") {
      baseOptions.push({ label: "Centre", value: "centre" });
    } else {
      baseOptions.push({ label: "Enrollment Time", value: "enrollmentTime" });
    }

    return baseOptions;
  }, [view]);

  const chartData: ChartRow[] = useMemo(() => {
    let data: ChartRow[] = rawData.map((d) => ({
      label:
        view === "city"
          ? d.city
          : view === "enrollmentTime"
          ? d.enrollmentTime
          : d.centre,
      TotalVal: d.TotalVal,
      AppearedVal: d.AppearedVal,
      Percentage: d.Percentage,
      trend: d.trend,
      centre: d.centre,
      city: d.city,
      enrollmentTime: d.enrollmentTime,
    }));

    if (orderBy === "TotalVal" || orderBy === "AppearedVal" || orderBy === "Percentage") {
      data.sort((a, b) => b[orderBy] - a[orderBy]);
    } else if (orderBy === "centre" || orderBy === "city") {
      data.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
    } else if (orderBy === "enrollmentTime") {
      data.sort((a, b) => a.enrollmentTime.localeCompare(b.enrollmentTime)); // works correctly for HH:mm
    }

    return data;
  }, [view, orderBy]);

  return (
    <Card className="w-full shadow-md rounded-2xl border border-slate-200 bg-white">
      <CardHeader className="pb-1">
        {/* Title row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
          {/* Left: Title + Legend */}
          <div className="flex flex-col">
            <CardTitle className="text-base font-bold text-slate-800 tracking-tight px-3">
              Centre Stats
            </CardTitle>
            <div className="pt-1 px-3">
              <ChartLegend />
            </div>
          </div>

          {/* Right: ToggleGroup + Order by */}
          <div className="flex items-center gap-4">
            {/* ToggleGroup */}
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(val) => {
                if (!val) return;
                const nextView = val as ViewKey;
                setView(nextView);

                // Reset invalid orderBy when view changes
                if (
                  (nextView === "centre" && orderBy === "city") ||
                  (nextView === "city" && orderBy === "centre") ||
                  (nextView !== "enrollmentTime" && orderBy === "enrollmentTime")
                ) {
                  setOrderBy("default");
                }
              }}
              className="border border-slate-200 rounded-lg p-0.5 bg-slate-50 h-fit"
            >
              {VIEWS.map(({ key, label }) => (
                <ToggleGroupItem
                  key={key}
                  value={key}
                  className="text-xs px-3 py-1.5 rounded-md
                    data-[state=on]:bg-blue-600
                    data-[state=on]:text-white
                    data-[state=on]:shadow-sm
                    text-slate-500 hover:text-slate-800
                    transition-all duration-150"
                >
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            {/* Order by */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
                Order by
              </span>
              <Select value={orderBy} onValueChange={(value) => setOrderBy(value as OrderByKey)}>
                <SelectTrigger className="h-7 text-xs w-[120px] sm:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dynamicOrderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator className="mt-3" />
      </CardHeader>

      <CardContent className="px-2 pb-4 sm:px-4">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={chartData}
            margin={{ top: 8, right: 12, left: -16, bottom: 48 }}
            barGap={2}
            barCategoryGap="32%"
          >
            <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="4 4" />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 500 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval={0}
              angle={-40}
              textAnchor="end"
              height={56}
            />

            <YAxis
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `${v}%`}
              domain={[0, 100]}
              width={40}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(241,245,249,0.6)" }} />

            {/* Grouped Bars */}
            <Bar
              dataKey="TotalVal"
              name="Total"
              fill="#22c55e"
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="AppearedVal"
              name="Appeared"
              fill="#eab308"
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            />
            <Line
              type="monotone"
              dataKey="Percentage"
              name="Percentage Line"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            />
            {/* <Bar
              dataKey="Percentage"
              name="Percentage"
              fill="#f97316"
              radius={[3, 3, 0, 0]}
              maxBarSize={14}
            /> */}

            {/* Trend line */}
            {/* <Line
              type="monotone"
              dataKey="trend"
              name="Trend Line"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}