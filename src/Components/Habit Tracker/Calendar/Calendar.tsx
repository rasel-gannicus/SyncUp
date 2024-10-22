
import { format, startOfMonth, addDays, eachDayOfInterval } from "date-fns";

// Calendar Component
export const Calendar: React.FC<{
    selectedDate: Date;
    onDateChange: (date: Date) => void;
  }> = ({ selectedDate, onDateChange }) => {
    const startOfMonthDate = startOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({
      start: startOfMonthDate,
      end: addDays(startOfMonthDate, 30),
    });
  
    return (
      <div className="grid grid-cols-7 gap-2 mt-6">
        {daysInMonth.map((day) => (
          <button
            key={day.toString()}
            className={`p-2 rounded-lg ${
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? "bg-teal-600 text-white dark:bg-teal-600"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            onClick={() => onDateChange(day)}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    );
  };