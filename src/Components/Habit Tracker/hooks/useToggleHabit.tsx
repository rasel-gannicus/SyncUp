import { useToggleHabitMutation } from "@/Redux/features/Habit Tracker/HabitTrackerApi";
import { format, startOfMonth, addDays, eachDayOfInterval } from "date-fns";


export const useToggleHabit = (selectedDate:any, setHabits : any, email : string) => {
    const [toggleHabit] = useToggleHabitMutation();

    const handleToggleHabit = async (habitId: string) => {
      const date = format(selectedDate, "yyyy-MM-dd"); // Use the selected date
      try {
        // Optimistically update the local state
        setHabits((prevHabits : any) =>
          prevHabits.map((habit: any) =>
            habit._id === habitId
              ? {
                  ...habit,
                  days: {
                    ...habit.days,
                    [date]: {
                      completed: !(habit.days[date]?.completed || false),
                    },
                  },
                }
              : habit
          )
        );
  
        // Sync with backend
        const { data, error } = await toggleHabit({ email, habitId, date });
  
        if (error) {
        } else {
        }
      } catch (error) {
        console.error("Error toggling habit:", error);
      }
    };
    return  handleToggleHabit;
}