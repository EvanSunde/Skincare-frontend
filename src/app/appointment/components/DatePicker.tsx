import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/components/shadcn/lib/utils";
import { Button } from "@/components/shadcn/ui/button";
import { Calendar } from "@/components/shadcn/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";

interface DateSelectorProps {
  onDateChange: (newDate: Date) => void;
}

const DatePickerDemo: React.FC<DateSelectorProps> = ({
  onDateChange,
}) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[100%] sm:w-full justify-start text-left font-normal rounded-[6px]",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span className="text-sm sm:text-base">Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-white"
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate);
            onDateChange(newDate || new Date());
          }}
          initialFocus
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;