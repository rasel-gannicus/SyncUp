"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Edit, CheckCircle, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "@/Redux/features/Todo List/todoApi";
import { useGetUserQuery } from "@/Redux/features/user/userApi";
import { LoadingSpinnerCustom } from "@/utils/Loading Spinner/LoadingSpinner";

const TodoList = ({ user }: { user: any }) => {
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [addTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery(user?.email || user?.providerData[0]?.email);

  const handleAddTodo = async () => {
    if (!user) {
      // Handle error
      return;
    }

    const newTodo = {
      todo: {
        text: inputValue,
        completed: false,
        email: user.providerData[0].email || user?.email,
      },
    };

    addTodo(newTodo);
    setInputValue("");
  };

  const handleToggleTodo = (createdAt: string, isCompleted: boolean) => {
    const todo = userData?.todos?.find(
      (todo: any) => todo?.createdAt === createdAt
    );
    if (todo) {
      editTodo({
        todo: {
          createdAt,
          completed: !isCompleted,
          email: user.providerData[0].email || user?.email,
        },
      });
    }
  };

  const handleDeleteTodo = (createdAt: string) => {
    deleteTodo({ createdAt, email: user.providerData[0].email || user?.email });
  };

  const handleStartEditing = (createdAt: any) => {
    setEditingId(createdAt);
  };

  const handleFinishEditing = (createdAt: string, newText: string) => {
    editTodo({
      todo: {
        createdAt,
        text: newText,
        email: user.providerData[0].email || user?.email,
      },
    });
    setEditingId(null);
  };

  const filteredTodos = userData?.todos
    ?.filter((todo: any) => !todo?.isDeleted)
    ?.filter((todo: any) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .sort((a: any, b: any) => a.completed - b.completed);

  if (userLoading) {
    return  <LoadingSpinnerCustom desc="Loading Todo List . . ." /> || <div>Loading...</div>;
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