import { useState } from "react";
import { format, addWeeks, subWeeks, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getWeekDays, isWorkingDay, formatDateShort } from "../lib/calendar";

interface CalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const weekDays = getWeekDays(currentWeek);
  const today = startOfDay(new Date());

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-medium">
          {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
        </span>
        <button
          onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 py-1">
            {day}
          </div>
        ))}
        {weekDays.map((date) => {
          const isPast = isBefore(date, today);
          const isWorking = isWorkingDay(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isCurrentDay = isToday(date);
          const isDisabled = isPast || !isWorking;

          return (
            <button
              key={date.toISOString()}
              onClick={() => !isDisabled && onDateSelect(date)}
              disabled={isDisabled}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center text-sm
                ${isSelected ? "bg-indigo-600 text-white" : ""}
                ${isCurrentDay && !isSelected ? "ring-2 ring-indigo-600" : ""}
                ${isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-50"}
                ${!isSelected && !isDisabled ? "text-gray-900" : ""}
              `}
            >
              <span className="font-medium">{format(date, "d")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
