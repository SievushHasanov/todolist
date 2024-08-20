export type TodoType = {
  id: number | string;
  name: string;
  isCompleted: boolean;
};

export type TodoContextType = {
  todos: TodoType[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number | string) => void;
  updateTodo: (id: number | string, newName: string) => void;
  checkTodo: (id: number | string) => void;
};
