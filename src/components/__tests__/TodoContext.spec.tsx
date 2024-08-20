import { render, screen, fireEvent } from '@testing-library/react';
import { useTodoContext } from '../../contexts/useTodoContext';
import { TodoProvider } from '../../contexts/TodoContext';

const TestComponent = () => {
  const { todos, addTodo, deleteTodo } = useTodoContext();
  return (
    <div>
      <button onClick={() => addTodo('Test Todo')}>Add Todo</button>
      <button onClick={() => deleteTodo(todos[0]?.id)} disabled={todos.length === 0}>
        Delete Todo
      </button>
      <div data-testid="todo-count">{todos.length}</div>
    </div>
  );
};

describe('TodoContext', () => {
  test('should add a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>,
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);

    expect(screen.getByTestId('todo-count')).toHaveTextContent('1');
  });

  //! тесты работают по отдельности

  test('should delete a todo', () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>,
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);

    expect(screen.getByTestId('todo-count')).toHaveTextContent('1');

    const deleteButton = screen.getByText('Delete Todo');
    fireEvent.click(deleteButton);

    expect(screen.getByTestId('todo-count')).toHaveTextContent('0');
  });
});
