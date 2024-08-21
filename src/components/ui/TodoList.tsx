import { List, Button, Typography, Box, Paper } from '@mui/material';
import Todo from './Todo';
import Modal from './Modal/Modal';
import { useTodoListContext } from '../../contexts/useTodoListContext';

export default function TodoList(): JSX.Element {
  const {
    modalClearAll,
    setModalClearAll,
    filter,
    setFilter,
    filteredTodos,
    remainingTodos,
    deleteCompletedTodos,
  } = useTodoListContext();

  return (
    <>
      {filteredTodos.length > 0 && (
        <Paper
          sx={{
            maxHeight: '500px',
            overflowY: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.415)',
            padding: '5px',
            boxShadow: 3,
            mb: 2,
          }}
        >
          <List>
            {filteredTodos.map((todo) =>
              todo && todo.id ? <Todo key={todo.id} todo={todo} /> : null,
            )}
          </List>
        </Paper>
      )}
      {filteredTodos.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: { xs: 'center', sm: 'left' },
            marginTop: '10px',
          }}
        >
          <Typography
            variant="h6"
            sx={{ textShadow: '1px 1px 2px #000', fontSize: { xs: '20px', sm: '30px' } }}
          >
            Items left: <span style={{ color: '#1876D1' }}>{remainingTodos}</span>
          </Typography>
          <Box display={'flex'} gap={1}>
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'contained' : 'outlined'}
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'contained' : 'outlined'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </Box>

          <Button variant="contained" color="error" onClick={() => setModalClearAll(true)}>
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
