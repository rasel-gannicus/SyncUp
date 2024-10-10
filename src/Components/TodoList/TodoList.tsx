"use client";
import React, { useEffect, useState, } from "react";
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

  const handleAddTodo = async () => {
    if (!user) {
      toast.error("You need to login first to add todos.");
      return;
    }

    const newTodo = {
      text: inputValue,
      completed: false,
      createdAt: Date.now(), // Temporary ID
      email: user.providerData[0].email || user?.email,
    };

    const toastId = toast.loading("Adding todo...");

    // Optimistically add the todo
    setTodos((prevTodos : any) => [...prevTodos, newTodo]);
    setInputValue("");

    try {
      const response : any = await addTodo({ todo: newTodo });

      if ("error" in response) {
        toast.error(response.error.data.message || "Failed to add todo.");
      } else {
        toast.success("Todo added successfully.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while adding the todo.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleToggleTodo = async (createdAt: string, isCompleted: boolean) => {
    if (!user) {
      toast.error("You need to login first to toggle todos.");
      return;
    }

    const todoIndex = todos.findIndex((todo: any) => todo.createdAt === createdAt);
    if (todoIndex === -1) return;

    const updatedTodo = { ...todos[todoIndex], completed: !isCompleted };

    const toastId = toast.loading("Updating todo...");

    // Optimistically update the todo completion status
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    setTodos(updatedTodos);

    try {
      const response : any = await editTodo({
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

    const todoIndex = todos.findIndex((todo: any) => todo.createdAt === createdAt);
    if (todoIndex === -1) return;

    const todoToDelete = todos[todoIndex];
    const toastId = toast.loading("Deleting todo...");

    // Optimistically remove the todo
    setTodos((prevTodos : any) => prevTodos.filter((todo : any) => todo.createdAt !== createdAt));

    try {
      const response : any = await deleteTodo({ createdAt, email: user.providerData[0].email || user?.email });

      if ("error" in response) {
        toast.error(response.error.data.message || "Failed to delete todo.");
        // Revert optimistic delete
        setTodos((prevTodos : any) => [...prevTodos, todoToDelete]);
      } else {
        toast.success("Todo deleted successfully.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred while deleting the todo.");
      // Revert optimistic delete
      setTodos((prevTodos : any) => [...prevTodos, todoToDelete]);
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

    const todoIndex = todos.findIndex((todo: any) => todo.createdAt === createdAt);
    if (todoIndex === -1) return;

    const updatedTodo = { ...todos[todoIndex], text: newText };

    const toastId = toast.loading("Editing todo...");

    // Optimistically update the todo text
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    setTodos(updatedTodos);
    setEditingId(null);

    try {
      const response : any = await editTodo({
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

  const filteredTodos = todos
    ?.filter((todo: any) => !todo?.isDeleted)
    ?.filter((todo: any) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .sort((a: any, b: any) => a.completed - b.completed);

  if (userLoading) {
    return <LoadingSpinnerCustom desc="Loading Todo List . . ." /> || <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto  mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
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
          className="bg-blue-500 hover:bg-blue-600"
        >
          <PlusCircle size={20} />
        </Button>
      </div>
      <div className="space-x-2 mb-4">
        <Button
          onClick={() => setFilter("all")}
          className={`${
            filter === "all" ? "bg-blue-500" : "bg-gray-200 text-gray-800"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("active")}
          className={`${
            filter === "active" ? "bg-blue-500" : "bg-gray-200 text-gray-800"
          }`}
        >
          Active
        </Button>
        <Button
          onClick={() => setFilter("completed")}
          className={`${
            filter === "completed" ? "bg-blue-500" : "bg-gray-200 text-gray-800"
          }`}
        >
          Completed
        </Button>
      </div>
      <ul className="space-y-2">
        {filteredTodos?.map((todo: any) => (
          <li
            key={todo?.createdAt}
            className="flex items-center bg-gray-100 p-3 rounded"
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