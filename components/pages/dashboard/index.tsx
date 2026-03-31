import { CentreStats } from '@/components/pages/dashboard/chart-area-interactive'

import { ChartRadialStacked } from "./chart-radial-stacked"
import { DataTable } from './data-table'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    
      <div className="px-3 lg:px-4">
        <ChartRadialStacked />

        <CentreStats />

        {/* <ChartAreaInteractive /> */}
      </div>
    </div>
  )
}