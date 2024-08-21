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

export interface TodoListContextType {
  modalClearAll: boolean;
  setModalClearAll: React.Dispatch<React.SetStateAction<boolean>>;
  filter: 'all' | 'active' | 'completed';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'active' | 'completed'>>;
  filteredTodos: TodoType[];
  remainingTodos: number;
  deleteCompletedTodos: () => void;
}
