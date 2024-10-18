import { useDeleteHabitMutation } from "@/Redux/features/Habit Tracker/HabitTrackerApi";
import { toast } from "react-hot-toast";

export const useDeleteHabit = (email: string) => {
  const [deleteHabit] = useDeleteHabitMutation();

  const handleDeleteHabit = async (habitId: string) => {
    const toastId = toast.loading("Deleting Habit...");
    try {
      await deleteHabit({ habitId, email }).unwrap();
      toast.success("Habit Deleted Successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete habit.")
    } finally {
      toast.dismiss(toastId);
    }
  };
  return handleDeleteHabit;
};
