"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { SelectSingleEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar, type CalendarProps } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  buttonClassName?: string
  buttonVariant?: "outline" | "default" | "secondary" | "ghost" | "link" | "destructive"
  placeholder?: string
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "initialFocus">
}

export function DatePicker({
  date,
  setDate,
  buttonClassName,
  buttonVariant = "outline",
  placeholder = "Pick a date",
  calendarProps,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            buttonClassName,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate as SelectSingleEventHandler}
          initialFocus
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}
