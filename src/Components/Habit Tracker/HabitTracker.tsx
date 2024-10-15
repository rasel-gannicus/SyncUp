"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaCircle, FaTrash } from "react-icons/fa";
import { format, startOfMonth, addDays, eachDayOfInterval } from "date-fns";
import { useAddHabitMutation, useDeleteHabitMutation, useToggleHabitMutation } from "@/Redux/features/Habit Tracker/HabitTrackerApi";
import { useAppSelector } from "@/Redux/hooks";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

interface HabitHistory {
  [date: string]: { [habitId: number]: boolean };
}

// [
//   { id: 1, name: "Drink Water", completed: false },
//   { id: 2, name: "Exercise", completed: false },
//   { id: 3, name: "Read 30 mins", completed: false },
// ];

const HabitTracker: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const { user: userData, userLoading } = userState;
  const email = userData?.email;

  const [habits, setHabits] = useState<Habit[]>(userData?.habits || []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habitHistory, setHabitHistory] = useState<HabitHistory>({});
  const [newHabit, setNewHabit] = useState("");

  const today = format(new Date(), "yyyy-MM-dd");

//   // Toggle habit completion status for the selected date
//   const toggleHabit = (id: number) => {
//     const dateKey = format(selectedDate, "yyyy-MM-dd");
//     const currentDayHistory = habitHistory[dateKey] || {};

//     setHabitHistory({
//       ...habitHistory,
//       [dateKey]: {
//         ...currentDayHistory,
//         [id]: !currentDayHistory[id], // Toggle the habit's completion status
//       },
//     });
//   };
  const [addHabit] = useAddHabitMutation();

const [toggleHabit] = useToggleHabitMutation();

const handleToggleHabit = async (habitId : string) => {
    const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const { data, error } = await toggleHabit({ email, habitId, date });
    
    if (error) {
      console.error("Error toggling habit:", error);
    } else {
      console.log("Habit toggled successfully:", data);
    }
  };
  


  const handleAddHabit = async () => {
    if (!newHabit.trim()) return;

    const newHabitObject = {
      id: habits.length + 1,
      name: newHabit,
      completed: false,
    };
    try {
      await addHabit({ habit: { ...newHabitObject, email } }).unwrap();
      // Handle success (e.g., show toast notification)
    } catch (error) {
      // Handle error (e.g., show error notification)
    }
  };

  const [deleteHabit] = useDeleteHabitMutation();

  const handleDeleteHabit = async (habitId : string) => {
    try {
      await deleteHabit({ habitId, email }).unwrap();
      // Handle success
    } catch (error) {
      // Handle error
    }
  };


  // Select a date from the calendar
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const habitsForSelectedDate = habits.map((habit) => ({
    ...habit,
    completed:
      habitHistory[format(selectedDate, "yyyy-MM-dd")]?.[habit._id] || false,
  }));

  useEffect(() => {
    if (userData?.habits) {
      setHabits(userData.habits);
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center dark:text-white">
      <div className="bg-white dark:bg-black p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 dark:text-gray-300">
          Habit Tracker
        </h2>
        <p className="text-center text-gray-500 dark:dark:text-gray-500 mb-8">
          {format(selectedDate, "EEEE, MMMM d")}
        </p>

        {/* Habit List */}
        <div className="space-y-4">
          {habitsForSelectedDate.map((habit : any ) => (
            <div
              key={habit._id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {habit.name}
              </span>
              <div className="flex space-x-4">
                <button onClick={() => handleToggleHabit(habit._id)}>
                  {habit.completed ? (
                    <FaCheckCircle className="text-green-500 w-6 h-6" />
                  ) : (
                    <FaCircle className="text-gray-300 w-6 h-6" />
                  )}
                </button>
                <button onClick={() => handleDeleteHabit(habit._id)}>
                  <FaTrash className="text-red-500 w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Habit */}
        <div className="mt-6 flex items-center">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Add a new habit..."
            className="w-full px-4 py-2 border dark:bg-gray-700 dark:text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
          <button
            onClick={handleAddHabit}
            className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-lg dark:bg-teal-600 hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </div>

        {/* Calendar */}
        <div className="mt-6">
          <Calendar
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
      </div>
    </div>
  );
};

// Calendar Component
const Calendar: React.FC<{
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
              ? "bg-indigo-600 text-white dark:bg-teal-600"
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

export default HabitTracker;
