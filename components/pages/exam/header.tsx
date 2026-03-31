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
import { NavUser } from "../../layout/client-layout/nav-user"

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
      <div className="flex w-full flex-row items-center gap-3 px-3 py-2 lg:px-6   border-grey border-b">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-4" />

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />
         <div className="items-right">
          <NavUser user={data.user} />
         </div>
      </div>


      <div className="flex w-full flex-wrap items-center gap-3 px-3 py-2 lg:px-6">
          {/* Exam Label */}
        <div className="flex flex-col leading-tight min-w-fit">
          <span className="text-sm font-bold text-orange-500 tracking-wide">
            CBSE3
          </span>
          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
            CTET JULY 2024, 07 JUL'24
          </span>
        </div>

        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-8 hidden sm:block" />

        {/* Date Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 text-[10px] sm:text-xs font-normal gap-1 px-2 sm:px-3 whitespace-nowrap"
            >
              07-July-2024 06:45 AM – 12:15 PM &nbsp;|&nbsp; 07 Jul'24 S1
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="text-xs">
              07-July-2024 06:45 AM – 12:15 PM | 07 Jul'24 S1
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              07-July-2024 02:00 PM – 05:00 PM | 07 Jul'24 S2
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Get Details */}
        <Button
          size="sm"
          className="h-8 text-[10px] sm:text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4"
        >
          Get Details
        </Button>

        {/* Auto Refresh */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <Label
            htmlFor="auto-refresh"
            className="text-xs text-muted-foreground whitespace-nowrap"
          >
            Auto Refresh
          </Label>
          <Switch
            id="auto-refresh"
            checked={autoRefresh}
            onCheckedChange={setAutoRefresh}
            className="scale-90"
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex w-full flex-wrap items-center gap-3 px-3 pb-2 lg:px-6">

        {/* Order By */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            Order by
          </span>
          <Select value={orderBy} onValueChange={setOrderBy}>
            <SelectTrigger className="h-7 text-xs w-[90px] sm:w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default" className="text-xs">
                Default
              </SelectItem>
              <SelectItem value="name" className="text-xs">
                Name
              </SelectItem>
              <SelectItem value="date" className="text-xs">
                Date
              </SelectItem>
              <SelectItem value="score" className="text-xs">
                Score
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Spacer */}
        <div className="flex-1 hidden sm:block" />

        {/* Filter Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Filter"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="h-7 pl-7 pr-3 text-xs w-[120px] sm:w-[160px]"
          />
        </div>

        {/* Filters Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5 px-2 sm:px-3"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-xs">
              By Status
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              By Score Range
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              By Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}