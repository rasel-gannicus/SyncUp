"use client" ;
import TodoList from "@/Components/TodoList/TodoList";
import { useAuthState } from "@/utils/Route Protection/useAuthState";

const page = () => {
  const { user, loading } = useAuthState();
  return (
    <div>
      <TodoList user={user}  />
    </div>
  );
};

export default page;
