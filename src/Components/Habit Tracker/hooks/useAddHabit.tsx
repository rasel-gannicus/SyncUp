import { useAddHabitMutation } from "@/Redux/features/Habit Tracker/HabitTrackerApi";
import { Habit } from "../HabitTracker";
import { toast } from "react-hot-toast";

export const useAddHabit = (habits: Habit[], email: string) => {
  const [addHabit] = useAddHabitMutation();

  const handleAddHabit = async (newHabit: string) => {
    if (!newHabit.trim()) return;

    const toastId = toast.loading("Adding new habit...");

    const newHabitObject = {
      id: habits.length + 1,
      name: newHabit,
      completed: false,
    };

    try {
      await addHabit({ habit: { ...newHabitObject, email } }).unwrap();
      toast.success("Habit added successfully.");
    } catch (error: any) {
      toast.error(error.message || "Failed to add new habit.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return handleAddHabit;
};
