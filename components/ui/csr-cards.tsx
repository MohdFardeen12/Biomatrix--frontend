import { IconMoodHappy, IconMoodSad, IconStar, IconUsers } from "@tabler/icons-react"

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function CSRCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Overall Satisfaction</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            92.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              <IconMoodHappy className="size-3.5" />
              +5.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Excellent customer feedback <IconMoodHappy className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Based on 2,456 responses
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Net Promoter Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            +72
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
              <IconStar className="size-3.5" />
              +8
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Above industry average <IconStar className="size-4 text-amber-500" />
          </div>
          <div className="text-muted-foreground">
            Industry benchmark: +45
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Response Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            68.3%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
              <IconUsers className="size-3.5" />
              +2.1%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Good engagement rate <IconUsers className="size-4 text-blue-600" />
          </div>
          <div className="text-muted-foreground">
            3,592 surveys sent
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Issues Resolved</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            156
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
              <IconMoodSad className="size-3.5" />
              12 pending
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            92.9% resolution rate <IconMoodHappy className="size-4 text-green-600" />
          </div>
          <div className="text-muted-foreground">
            Avg. resolution time: 2.4 days
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
