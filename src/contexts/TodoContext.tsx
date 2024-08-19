import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoType } from '../types/todoTypes';

export type TodoContextType = {
  todos: TodoType[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number | string) => void;
  updateTodo: (id: number | string, newName: string) => void;
  checkTodo: (id: number | string) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = {
      id: uuidv4(),
      name: text,
      isCompleted: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (id: number | string) => {
    setTodos((prev) => prev.filter((todo) => todo && todo.id !== id));
  };

  const updateTodo = (id: number | string, newName: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo)));
  };

  const checkTodo = (id: number | string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo && todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo, checkTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
