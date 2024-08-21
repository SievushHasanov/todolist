import { useContext } from "react";
import { TodoListContext } from "./TodoListContext";

export const useTodoListContext = () => {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error('useTodoListContext must be used within a TodoListProvider');
  }
  return context;
};
