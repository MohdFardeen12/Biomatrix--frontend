"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react"
import { NavUser } from "./nav-user"
import { BreadcrumbLinkDemo } from "./Breadcrumb"

export function SiteHeader() {
  const [autoRefresh, setAutoRefresh] = React.useState(false)
  const [filterValue, setFilterValue] = React.useState("")
  const [orderBy, setOrderBy] = React.useState("default")

  const data = {
    user: {
      name: " Pravesh Prahari",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
  }

  return (
    <header className="flex flex-col shrink-0 border-b transition-[width,height] ease-linear">

      {/* Top Row */}
      <div className="grid grid-cols-2 w-full items-center px-3 py-2 lg:px-6 border-b">

        {/* ── LEFT col: SidebarTrigger + Exam Label + Breadcrumb ── */}
        <div className="flex items-center gap-2 min-w-0">
          <SidebarTrigger className="-ml-1 shrink-0" />
          <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4 shrink-0" />

          {/* Exam Label */}
          <div className="flex flex-col leading-tight shrink-0">
            <span className="text-sm font-bold text-orange-500 tracking-wide">CBSE3</span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              CTET JULY 2024, 07 JUL'24
            </span>
          </div>

          {/* Breadcrumb — inline on sm+, hidden on mobile */}
          <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-8 hidden sm:block shrink-0" />
          <div className="hidden sm:flex min-w-0 overflow-hidden">
            <BreadcrumbLinkDemo />
          </div>
        </div>

        {/* ── RIGHT col: Auto Refresh + NavUser ── */}
        <div className="flex items-center justify-end gap-2">
          <Label htmlFor="auto-refresh" className="text-xs text-muted-foreground whitespace-nowrap">
            <span className="hidden sm:inline">Auto </span>Refresh
          </Label>
          <Switch
            id="auto-refresh"
            checked={autoRefresh}
            onCheckedChange={setAutoRefresh}
            className="scale-90"
          />
          <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5 shrink-0" />
          <div className="flex flex-right">
            <NavUser user={data.user} />
          </div>
        </div>
      </div>

      {/* Breadcrumb row — mobile only, sits below top row */}
      <div className="flex sm:hidden items-center px-3 py-1.5 border-b">
        <BreadcrumbLinkDemo />
      </div>

      {/* Bottom Row */}
      <div className="flex w-full flex-wrap items-center gap-2 px-3 pt-2 pb-2 lg:px-6">

        {/* Left group: Date Selector + Get Details + Order By */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Date Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-8 text-[10px] sm:text-xs font-normal gap-1 px-2 sm:px-3 max-w-[200px] sm:max-w-none"
              >
                <span className="truncate">
                  07-July-2024 06:45 AM – 12:15 PM &nbsp;|&nbsp; 08 Jul'24 S1
                </span>
                <ChevronDown className="h-3.5 w-3.5 opacity-60 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="text-xs">
                04-March-2025 07:34 AM – 10:15 PM | 05 March'25 S1
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs">
                07-June-2022 01:00 PM – 04:00 PM | 010 June'22 S2
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Get Details */}
          <Button
            size="sm"
            className="h-8 text-[10px] sm:text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 shrink-0"
          >
            Get Details
          </Button>


        </div>

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />

        {/* Right group: Filter Input + Filters Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex items-center flex-1 sm:flex-none">
            <Search className="absolute left-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="find city,center..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="h-7 pl-7 pr-3 text-xs w-full sm:w-[160px]"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1.5 px-2 sm:px-3 shrink-0"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-xs">By City</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">By Center</DropdownMenuItem>
              {/* <DropdownMenuItem className="text-xs">By Category</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}