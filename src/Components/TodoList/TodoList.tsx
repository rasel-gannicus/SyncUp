"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PlusCircle, Trash2, Edit, CheckCircle, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "@/Redux/features/Todo List/todoApi";
import { LoadingSpinnerCustom } from "@/utils/Loading Spinner/LoadingSpinner";
import { useAppSelector } from "@/Redux/hooks";
import { toast } from "react-hot-toast";
import { validateUser } from "./functionalities";
import { HabitTrackerLoading } from "@/utils/Loading Spinner/Loading Skeleton/Skeleton";

const TodoList = ({ user }: { user: any }) => {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const userState = useAppSelector((state) => state.user);
  let userData = userState.user;
  let userLoading = userState.userLoading;
  const [todos, setTodos] = useState(userData?.todos || []); // Local state to store todos

  useEffect(() => {
    setTodos(userData?.todos || []); // Sync with userData when it changes
  }, [userData]);

  /**
   * Adds a new todo item to the list and saves it to the database.
   * Optimistically adds the new todo item to the list, then sends a request to the
   * server to add the new todo item. If the request succeeds, the new todo item is
   * kept in the list. If the request fails, the new todo item is removed from the
   * list.
   */
  const handleAddTodo = useCallback(async () => {
    if (!validateUser(user)) return;

    const newTodo = {
      text: inputValue,
      completed: false,
      createdAt: Date.now(),
      email: user.providerData[0].email || user?.email,
    };

    const toastId = toast.loading("Adding todo...");

    // Optimistically add the new todo item to the list
    setTodos((prevTodos: any) => [...prevTodos, newTodo]);
    setInputValue("");

    try {
      const response: any = await addTodo({ todo: newTodo });
      if ("error" in response) {
        // If the request fails, remove the new todo item from the list
        setTodos((prevTodos: any) =>
          prevTodos.filter((todo: any) => todo.createdAt !== newTodo.createdAt)
        );
        toast.error(response.error.data.message || "Failed to add todo.");
      } else {
        toast.success("Todo added successfully.");
      }
    } catch (error) {
      // If the request fails, remove the new todo item from the list
      setTodos((prevTodos: any) =>
        prevTodos.filter((todo: any) => todo.createdAt !== newTodo.createdAt)
      );
      toast.error("An unexpected error occurred while adding the todo.");
    } finally {
      toast.dismiss(toastId);
    }
  }, [inputValue, user, addTodo]);

  const handleToggleTodo = async (createdAt: string, isCompleted: boolean) => {
    if (!user) {
      toast.error("You need to login first to toggle todos.");
      return;
    }

    const todoIndex = todos.findIndex(
      (todo: any) => todo.createdAt === createdAt
    );
    if (todoIndex === -1) return;

    const updatedTodo = { ...todos[todoIndex], completed: !isCompleted };

    const toastId = toast.loading("Updating todo...");

    // Optimistically update the todo completion status
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    setTodos(updatedTodos);

    try {
      const response: any = await editTodo({
        todo: {
          createdAt,
          completed: !isCompleted,
          email: user.providerData[0].email || user?.email,
        },
      });

      if ("error" in response) {
        toast.error(response.error.data.message || "Failed to update todo.");
      } else {
        toast.success("Todo updated successfully.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while updating the todo.");
      // Revert optimistic update
      const revertedTodos = [...todos];
      revertedTodos[todoIndex].completed = isCompleted;
      setTodos(revertedTodos);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDeleteTodo = async (createdAt: string) => {
    if (!user) {
      toast.error("You need to login first to delete todos.");
      return;
    }

    const todoIndex = todos.findIndex(
      (todo: any) => todo.createdAt === createdAt
    );
    if (todoIndex === -1) return;

    const todoToDelete = todos[todoIndex];
    const toastId = toast.loading("Deleting todo...");

    // Optimistically remove the todo
    setTodos((prevTodos: any) =>
      prevTodos.filter((todo: any) => todo.createdAt !== createdAt)
    );

    try {
      const response: any = await deleteTodo({
        createdAt,
        email: user.providerData[0].email || user?.email,
      });

      if ("error" in response) {
        toast.error(response.error.data.message || "Failed to delete todo.");
        // Revert optimistic delete
        setTodos((prevTodos: any) => [...prevTodos, todoToDelete]);
      } else {
        toast.success("Todo deleted successfully.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while deleting the todo.");
      // Revert optimistic delete
      setTodos((prevTodos: any) => [...prevTodos, todoToDelete]);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleStartEditing = (createdAt: any) => {
    setEditingId(createdAt);
  };

  const handleFinishEditing = async (createdAt: string, newText: string) => {
    if (!user) {
      toast.error("You need to login first to edit todos.");
      return;
    }

    const todoIndex = todos.findIndex(
      (todo: any) => todo.createdAt === createdAt
    );
    if (todoIndex === -1) return;

    const updatedTodo = { ...todos[todoIndex], text: newText };

    const toastId = toast.loading("Editing todo...");

    // Optimistically update the todo text
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    setTodos(updatedTodos);
    setEditingId(null);

    try {
      const response: any = await editTodo({
        todo: {
          createdAt,
          text: newText,
          email: user.providerData[0].email || user?.email,
        },
      });

      if ("error" in response) {
        toast.error(response.error.data.message || "Failed to edit todo.");
        // Revert optimistic update
        const revertedTodos = [...todos];
        revertedTodos[todoIndex].text = todos[todoIndex].text; // Revert to old text
        setTodos(revertedTodos);
      } else {
        toast.success("Todo edited successfully.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while editing the todo.");
      // Revert optimistic update
      const revertedTodos = [...todos];
      revertedTodos[todoIndex].text = todos[todoIndex].text;
      setTodos(revertedTodos);
    } finally {
      toast.dismiss(toastId);
    }
  };

  /**
   * Returns a filtered and sorted list of todos based on the current filter.
   */
  const filteredTodos = useMemo(() => {
    // First, filter out any todos that have been deleted
    const nonDeletedTodos = todos?.filter((todo: any) => !todo?.isDeleted);

    // Then, filter the todos based on the current filter
    const filteredTodos = nonDeletedTodos?.filter((todo: any) => {
      switch (filter) {
        // Show only active todos
        case "active":
          return !todo.completed;

        // Show only completed todos
        case "completed":
          return todo.completed;

        // Show all todos
        default:
          return true;
      }
    });

    // Sort the todos by completed status
    const sortedTodos = filteredTodos?.sort(
      (a: any, b: any) => a.completed - b.completed
    );

    return sortedTodos;
  }, [todos, filter]);

  /**
   * Changes the current filter to the new filter.
   *
   * @param {string} newFilter The new filter to apply.
   */
  const handleChangeFilter = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  return (
    <div className="max-w-md mx-auto dark:bg-gray-800 dark:text-white  mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Todo List
      </h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow mr-2"
        />
        <Button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-green-500"
        >
          <PlusCircle size={20} />
        </Button>
      </div>
      <div className="space-x-2 mb-4">
        <Button
          onClick={() => handleChangeFilter("all")}
          className={`${
            filter === "all" ? "bg-blue-500 dark:bg-green-500" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => handleChangeFilter("active")}
          className={`${
            filter === "active" ? "bg-gree-500 hover:bg-blue-500 dark:bg-green-500" : "bg-gray-200 text-gray-800"
          }`}
        >
          Active
        </Button>
        <Button
          onClick={() => handleChangeFilter("completed")}
          className={`${
            filter === "completed" ? "bg-blue-500 hover:bg-blue-500 dark:bg-green-500" : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed
        </Button>
      </div>
      <ul className="space-y-2">
        {userLoading && <HabitTrackerLoading />}
        {filteredTodos?.map((todo: any) => (
          <li
            key={todo?.createdAt}
            className="flex items-center bg-gray-100 p-3 rounded dark:bg-gray-700 dark:text-white"
          >
            <Button
              onClick={() => handleToggleTodo(todo?.createdAt, todo?.completed)}
              className="mr-2 bg-transparent hover:bg-transparent p-0"
            >
              {todo?.completed ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : (
                <Circle size={20} className="text-gray-400" />
              )}
            </Button>
            {editingId === todo?.createdAt ? (
              <Input
                type="text"
                defaultValue={todo.text}
                onBlur={(e) =>
                  handleFinishEditing(todo?.createdAt, e.target.value)
                }
                className="flex-grow"
              />
            ) : (
              <span className="flex-grow">{todo.text}</span>
            )}
            <Button
              onClick={() => handleStartEditing(todo?.createdAt)}
              className="mr-2 bg-transparent text-teal-400 hover:bg-transparent p-0"
            >
              <Edit size={20} />
            </Button>
            <Button
              onClick={() => handleDeleteTodo(todo?.createdAt)}
              className="bg-transparent text-red-600 hover:bg-transparent p-0"
            >
              <Trash2 size={20} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
