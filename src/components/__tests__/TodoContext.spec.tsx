import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useAppContext } from '../../contexts/useAppContext';
import { AppProvider } from '../../contexts/AppContext';

const TestComponent = () => {
  const { todos, addTodo, deleteTodo, updateTodo, checkTodo } = useAppContext();
  return (
    <div>
      <button onClick={() => addTodo('Test Todo')}>Add Todo</button>
      <button onClick={() => checkTodo(todos[0]?.id)} disabled={todos.length === 0}>
        Check Todo
      </button>
      <button
        onClick={() => updateTodo(todos[0]?.id, 'Updated Todo')}
        disabled={todos.length === 0}
      >
        Edit Todo
      </button>
      <button onClick={() => deleteTodo(todos[0]?.id)} disabled={todos.length === 0}>
        Delete Todo
      </button>
      <div data-testid="todo-count">{todos.length}</div>
      <div data-testid="todo-name">{todos[0]?.name}</div>
    </div>
  );
};

describe('TodoContext', () => {
  afterEach(() => {
    cleanup();
    localStorage.clear(); 
  });

  test('should add a todo', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);

    expect(screen.getByTestId('todo-count')).toHaveTextContent('1');
    expect(screen.getByTestId('todo-name')).toHaveTextContent('Test Todo');
  });

  test('should delete a todo', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);

    expect(screen.getByTestId('todo-count')).toHaveTextContent('1');

    const deleteButton = screen.getByText('Delete Todo');
    fireEvent.click(deleteButton);

    expect(screen.getByTestId('todo-count')).toHaveTextContent('0');
  });

  test('should check a todo', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>,
    );

    const addButton = screen.getByText('Add Todo');
    fireEvent.click(addButton);

    const checkButton = screen.getByText('Check Todo');
    fireEvent.click(checkButton);

    expect(screen.getByTestId('todo-name')).toHaveTextContent('Test Todo');
  });
});
