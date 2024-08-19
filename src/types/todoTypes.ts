export type TodoType = {
  id: number | string;
  name: string;
  isCompleted: boolean;
};

export type TodoListProps = {
  todos: TodoType[];
  addTodo: (text: string) => void;
  checkTodo: (id: number | string) => void;
  deleteTodo: (id: number | string) => void;
  updateTodo: (id: number | string, newName: string) => void;
};
