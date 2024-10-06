import { useState } from 'react';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={handleInputChange}
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <ul className="mt-4">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {}} 
              />
              <span>{todo.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
