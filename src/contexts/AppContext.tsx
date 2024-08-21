import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppContextType, TodoType } from '../types/todoTypes';


export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [modalClearAll, setModalClearAll] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number | string, newName: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, name: newName } : todo)));
  };

  const checkTodo = (id: number | string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.isCompleted;
    if (filter === 'completed') return todo.isCompleted;
    return true;
  });

  const remainingTodos = todos.filter((todo) => !todo.isCompleted).length;

  const deleteCompletedTodos = () => {
    todos.forEach((todo) => {
      if (todo.isCompleted) {
        deleteTodo(todo.id);
      }
    });
    setModalClearAll(false);
  };

  return (
    <AppContext.Provider
      value={{
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        checkTodo,
        modalClearAll,
        setModalClearAll,
        filter,
        setFilter,
        filteredTodos,
        remainingTodos,
        deleteCompletedTodos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


