import React, { createContext, useState } from 'react';
import { useTodoContext } from './useTodoContext';
import { TodoListContextType } from '../types/todoTypes';

export const TodoListContext = createContext<TodoListContextType | undefined>(undefined);

export const TodoListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalClearAll, setModalClearAll] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { todos, deleteTodo } = useTodoContext();

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
    <TodoListContext.Provider
      value={{
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
    </TodoListContext.Provider>
  );
};
