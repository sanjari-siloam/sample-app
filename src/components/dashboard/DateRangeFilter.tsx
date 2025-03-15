import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, RefreshCw, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DateRangeFilterProps {
  onDateChange?: (range: DateRange | undefined) => void;
  onPresetChange?: (preset: string) => void;
  className?: string;
}

const DateRangeFilter = ({
  onDateChange = () => {},
  onPresetChange = () => {},
  className = "",
}: DateRangeFilterProps) => {
  // Default date range (last 7 days)
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const [preset, setPreset] = useState<string>("last7Days");

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  const handlePresetChange = (value: string) => {
    setPreset(value);
    onPresetChange(value);

    const today = new Date();
    let newRange: DateRange | undefined;

    switch (value) {
      case "today":
        newRange = { from: today, to: today };
        break;
      case "yesterday":
        const yesterday = addDays(today, -1);
        newRange = { from: yesterday, to: yesterday };
        break;
      case "last7Days":
        newRange = { from: addDays(today, -7), to: today };
        break;
      case "last30Days":
        newRange = { from: addDays(today, -30), to: today };
        break;
      case "thisMonth":
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1,
        );
        newRange = { from: firstDayOfMonth, to: today };
        break;
      case "lastMonth":
        const firstDayLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1,
        );
        const lastDayLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0,
        );
        newRange = { from: firstDayLastMonth, to: lastDayLastMonth };
        break;
      case "custom":
        // Keep the current date range for custom
        newRange = date;
        break;
      default:
        newRange = { from: addDays(today, -7), to: today };
    }

    setDate(newRange);
    onDateChange(newRange);
  };

  const resetFilter = () => {
    const defaultRange = {
      from: addDays(new Date(), -7),
      to: new Date(),
    };
    setDate(defaultRange);
    setPreset("last7Days");
    onDateChange(defaultRange);
    onPresetChange("last7Days");
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-white rounded-lg shadow-sm",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <Select value={preset} onValueChange={handlePresetChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7Days">Last 7 days</SelectItem>
            <SelectItem value="last30Days">Last 30 days</SelectItem>
            <SelectItem value="thisMonth">This month</SelectItem>
            <SelectItem value="lastMonth">Last month</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
              disabled={preset !== "custom"}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "MMM dd, yyyy")} -{" "}
                    {format(date.to, "MMM dd, yyyy")}
                  </>
                ) : (
                  format(date.from, "MMM dd, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="icon"
          onClick={resetFilter}
          className="ml-auto h-9 w-9"
          title="Reset filters"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
