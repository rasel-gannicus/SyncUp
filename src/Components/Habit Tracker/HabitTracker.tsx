"use client";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaCircle, FaTrash } from "react-icons/fa";
import { format} from "date-fns";
import { useAppSelector } from "@/Redux/hooks";
import {
  HabitTrackerLoading,
} from "@/utils/Loading Spinner/Loading Skeleton/Skeleton";
import { useAddHabit } from "./hooks/useAddHabit";
import { useDeleteHabit } from "./hooks/useDeleteHabit";
import { useToggleHabit } from "./hooks/useToggleHabit";
import { Calendar } from "./Calendar/Calendar";
import { useAuthState } from "@/utils/Route Protection/useAuthState";

export interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

interface HabitHistory {
  [date: string]: { [habitId: number | string]: boolean };
}

const HabitTracker: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const { user: userData, userLoading } = userState;
  const email = userData?.email;

  const { user, loading } = useAuthState(); //-- get user authentication info from firebase

  const [habits, setHabits] = useState<Habit[]>(userData?.habits || []);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newHabit, setNewHabit] = useState("");

  // const today = format(new Date(), "yyyy-MM-dd");

  // --- adding a new habit 
  const handleAddHabit = useAddHabit(habits, email, setNewHabit); 

  // --- toggling a habit
  const handleToggleHabit = useToggleHabit(selectedDate, setHabits, email)

  // --- deleting a habit
  const handleDeleteHabit = useDeleteHabit(email) ;

  // Select a date from the calendar
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const habitsForSelectedDate = habits.map((habit: any) => ({
    ...habit,
    completed:
      habit.days[format(selectedDate, "yyyy-MM-dd")]?.completed || false,
  }));

  useEffect(() => {
    if (userData?.habits) {
      setHabits(userData.habits);
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center dark:text-white">
      <div className="bg-white my-10 dark:bg-black p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 dark:text-gray-300">
          Habit Tracker
        </h2>
        <p className="text-center text-gray-500 dark:dark:text-gray-500 mb-8">
          {format(selectedDate, "EEEE, MMMM d")}
        </p>

        {/* Habit List */}
        <div className="space-y-4">
          {userLoading && <HabitTrackerLoading />}
          { user && habitsForSelectedDate.map((habit: any) => (
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
            onClick={() => handleAddHabit(newHabit)}
            className="ml-2 px-4 py-2 bg-teal-600 text-white rounded-lg dark:bg-teal-600 hover:bg-indigo-700 transition"
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


export default HabitTracker;
