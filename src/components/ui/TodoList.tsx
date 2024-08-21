import { useState } from 'react';
import { List, Button, Typography, Box } from '@mui/material';
import Todo from './Todo';
import Modal from './Modal/Modal';
import { useTodoContext } from '../../contexts/useTodoContext.ts';

export default function TodoList(): JSX.Element {
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
    <>
      <List>
        {filteredTodos.map((todo) => (todo && todo.id ? <Todo key={todo.id} todo={todo} /> : null))}
      </List>
      {todos.length > 0 && (
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="h6"
            sx={{ textShadow: '1px 1px 2px #000', fontSize: { xs: '20px', sm: '30px' } }}
          >
            Items left: <span style={{ color: '#1876D1' }}>{remainingTodos}</span>
          </Typography>
          <Box display={'flex'} gap={1}>
            <Button variant="outlined" onClick={() => setFilter('all')}>
              All
            </Button>
            <Button variant="outlined" onClick={() => setFilter('active')}>
              Active
            </Button>
            <Button variant="outlined" onClick={() => setFilter('completed')}>
              Completed
            </Button>
          </Box>

          <Button variant="outlined" color="error" onClick={() => setModalClearAll(true)}>
            Clear completed
          </Button>
        </Box>
      )}

      <Modal active={modalClearAll} setActive={setModalClearAll}>
        <Typography variant="h2" sx={{ textShadow: '1px 1px 2px #000', color: '#1876D1' }}>
          Are you sure you want to delete <b style={{ color: 'white' }}>ALL</b> completed todos?
        </Typography>
        <Box marginTop={2} display="flex" gap={10} justifyContent="center">
          <Button size="large" variant="contained" onClick={deleteCompletedTodos}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={() => setModalClearAll(false)}>
            No
          </Button>
        </Box>
      </Modal>
    </>
  );
}
