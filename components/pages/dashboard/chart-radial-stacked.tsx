"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", desktop: 1165, mobile: 780 }]

//Different data for the 3 charts, can be replaced with same data if needed
const chartDataExam = [{ month: "january", desktop: 354201, mobile: 251442 }]
const chartDataSync = [{ month: "january", desktop: 5557, mobile: 7894 }]


const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)", 
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile

  //calculation of 3 diff data.
  const totalVisitorsExam = chartDataExam[0].desktop + chartDataExam[0].mobile
  const totalVisitorsSync = chartDataSync[0].desktop + chartDataSync[0].mobile

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 pb-2">
    <Card className="flex flex-col h-60">
  <CardHeader className="items-center pb-0">
    <CardTitle className="text-center">Enrollment Status</CardTitle>
  </CardHeader>

  <CardContent className="flex flex-1 min-h-0 items-center justify-center pb-0">
    <ChartContainer
      config={chartConfig}
      className="w-full max-w-[160px] h-[120px]"
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={40}
        outerRadius={80}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 10}
                      className="fill-foreground text-sm font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    {/* <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 8}
                      className="fill-muted-foreground text-xs"
                    >
                      Visitors
                    </tspan> */}
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={2}
          fill="var(--color-desktop)"
        />
        <RadialBar
          dataKey="mobile"
          stackId="a"
          cornerRadius={2}
          fill="var(--color-mobile)"
        />
      </RadialBarChart>
    </ChartContainer>
  </CardContent>

  <CardFooter className="flex flex-col items-center text-sm">
    <div className="font-medium">1,945 / 3,397 Centres</div>
  </CardFooter>
</Card>
     <Card className="flex flex-col h-60">
  <CardHeader className="items-center pb-1">
    <CardTitle className="text-center text-sm">Exam Attendance</CardTitle>
  </CardHeader>

  <CardContent className="flex flex-1 min-h-0 items-center justify-center pb-0">
    <ChartContainer
      config={chartConfig}
      className="w-full max-w-[170px] h-[120px]"
    >
      <RadialBarChart
        data={chartDataExam}
        endAngle={180}
        innerRadius={40}
        outerRadius={80}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 8}
                      className="fill-foreground text-sm font-bold"
                    >
                      {totalVisitorsExam.toLocaleString()}
                    </tspan>
                    {/* <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 10}
                      className="fill-muted-foreground text-xs"
                    >
                      Visitors
                    </tspan> */}
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={3}
          fill="var(--color-desktop)"
        />
        <RadialBar
          dataKey="mobile"
          stackId="a"
          cornerRadius={3}
          fill="var(--color-mobile)"
        />
      </RadialBarChart>
    </ChartContainer>
  </CardContent>

  <CardFooter className="flex flex-col items-center text-sm pt-2">
    <div className="font-medium">
      6,05,643 / 8,99,823 Candidates
    </div>
  </CardFooter>
</Card>


<Card className="flex flex-col h-60">
  <CardHeader className="items-center pb-1">
    <CardTitle className="text-center text-sm">Sync Status</CardTitle>
  </CardHeader>

  <CardContent className="flex flex-1 min-h-0 items-center justify-center pb-0">
    <ChartContainer
      config={chartConfig}
      className="w-full max-w-[170px] h-[120px]"
    >
      <RadialBarChart
        data={chartDataSync}
        endAngle={180}
        innerRadius={40}
        outerRadius={80}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 8}
                      className="fill-foreground text-sm font-bold"
                    >
                      {totalVisitorsSync.toLocaleString()}
                    </tspan>
                    {/* <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 10}
                      className="fill-muted-foreground text-xs"
                    >
                      Visitors
                    </tspan> */}
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>

        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={3}
          fill="var(--color-desktop)"
        />
        <RadialBar
          dataKey="mobile"
          stackId="a"
          cornerRadius={3}
          fill="var(--color-mobile)"
        />
      </RadialBarChart>
    </ChartContainer>
  </CardContent>

  <CardFooter className="flex flex-col items-center text-sm pt-2">
    <div className="font-medium">
      13,451 / 16,583 Synced
    </div>
  </CardFooter>
</Card>

    </div>


  )
}
