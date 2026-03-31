"use client"

import { Bar, ComposedChart, CartesianGrid, XAxis, YAxis, Line } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "Customer Satisfaction Trends"

const chartData = [
  { name: "Jan", satisfied: 145, neutral: 45, dissatisfied: 25, avgScore: 85 },
  { name: "Feb", satisfied: 160, neutral: 50, dissatisfied: 20, avgScore: 88 },
  { name: "Mar", satisfied: 135, neutral: 55, dissatisfied: 30, avgScore: 82 },
  { name: "Apr", satisfied: 150, neutral: 40, dissatisfied: 22, avgScore: 86 },
  { name: "May", satisfied: 175, neutral: 48, dissatisfied: 18, avgScore: 90 },
  { name: "Jun", satisfied: 155, neutral: 42, dissatisfied: 24, avgScore: 87 },
  { name: "Jul", satisfied: 168, neutral: 38, dissatisfied: 16, avgScore: 91 },
  { name: "Aug", satisfied: 180, neutral: 44, dissatisfied: 14, avgScore: 93 },
  { name: "Sep", satisfied: 165, neutral: 46, dissatisfied: 20, avgScore: 89 },
  { name: "Oct", satisfied: 172, neutral: 40, dissatisfied: 18, avgScore: 90 },
  { name: "Nov", satisfied: 185, neutral: 35, dissatisfied: 12, avgScore: 94 },
  { name: "Dec", satisfied: 190, neutral: 38, dissatisfied: 10, avgScore: 95 },
]

const chartConfig = {
  satisfied: {
    label: "Satisfied",
    color: "hsl(142, 71%, 45%)",
  },
  neutral: {
    label: "Neutral",
    color: "hsl(45, 93%, 47%)",
  },
  dissatisfied: {
    label: "Dissatisfied",
    color: "hsl(0, 84%, 60%)",
  },
  avgScore: {
    label: "Avg Score",
    color: "hsl(217, 91%, 60%)",
  },
} satisfies ChartConfig

export function CSRChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Customer Satisfaction Trends</CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-4 bg-[hsl(217,91%,60%)]" />
            <span className="text-muted-foreground">Avg Score</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[hsl(142,71%,45%)]" />
            <span className="text-muted-foreground">Satisfied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[hsl(45,93%,47%)]" />
            <span className="text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-sm bg-[hsl(0,84%,60%)]" />
            <span className="text-muted-foreground">Dissatisfied</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ComposedChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              domain={[0, 200]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="satisfied" fill="var(--color-satisfied)" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="neutral" fill="var(--color-neutral)" radius={[4, 4, 0, 0]} barSize={14} />
            <Bar dataKey="dissatisfied" fill="var(--color-dissatisfied)" radius={[4, 4, 0, 0]} barSize={14} />
            <Line
              type="monotone"
              dataKey="avgScore"
              stroke="var(--color-avgScore)"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
