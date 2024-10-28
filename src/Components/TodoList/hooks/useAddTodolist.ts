import { useCallback } from "react";
import { validateUser } from "../functionalities";
import { toast } from "react-hot-toast";
import { useAddTodoMutation } from "@/Redux/features/Todo List/todoApi";
import { Dispatch, SetStateAction } from "react";

type Props = {
  user: any;
  inputValue: string;
  setTodos: Dispatch<SetStateAction<any[]>>;
  setInputValue: Dispatch<SetStateAction<string>>;
};

/**
 * Adds a new todo item to the list and saves it to the database.
 * Optimistically adds the new todo item to the list, then sends a request to the
 * server to add the new todo item. If the request succeeds, the new todo item is
 * kept in the list. If the request fails, the new todo item is removed from the
 * list.
 */

export const useAddTodolist = ({
  user,
  inputValue,
  setTodos,
  setInputValue,
}: Props) => {
    
  const [addTodo] = useAddTodoMutation();

  const handleAddTodo = useCallback(async () => {
    if (!validateUser(user)) return;
    if (!inputValue.trim()) return;

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

  return handleAddTodo;
};
