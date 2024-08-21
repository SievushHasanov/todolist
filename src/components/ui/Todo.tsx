import { Check, Delete, Edit } from '@mui/icons-material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  TextField,
} from '@mui/material';
import { TodoType } from '../../types/todoTypes';
import Modal from './Modal/Modal';
import { useState } from 'react';
import { useTodoContext } from '../../contexts/useTodoContext.ts';

type TodoProps = {
  todo: TodoType;
};

export default function Todo({ todo }: TodoProps): JSX.Element {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(todo.name);
  const { checkTodo, deleteTodo, updateTodo } = useTodoContext();

  const markComplete = () => checkTodo(todo.id);
  const markDeleting = () => deleteTodo(todo.id);

  const handleEdit = () => {
    updateTodo(todo.id, newName);
    setEditModal(false);
  };

  const sliceName = (todoName: string): string => {
    return todoName.length > 12 ? todoName.slice(0, 12) + '...' : todoName;
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ background: 'lightgray', maxWidth: '700px', margin: '10px auto' }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {todo.isCompleted ? (
              <IconButton onClick={markComplete}>
                <Check style={{ color: 'green' }} />
              </IconButton>
            ) : (
              <IconButton onClick={markComplete}>
                <RadioButtonUncheckedIcon style={{ color: '#f5f1f1' }} />
              </IconButton>
            )}
            <Tooltip title={todo.name}>
              <span
                style={{
                  margin: '0 25px',
                  cursor: 'default',
                  fontFamily: 'monospace',
                  textShadow: '1px 1px 2px #000',
                  textDecoration: todo.isCompleted ? 'line-through' : 'none',
                  color: todo.isCompleted ? '#dfdfdfd9' : 'white',
                }}
              >
                {todo.name.length > 12 ? sliceName(todo.name) : todo.name}
              </span>
            </Tooltip>
            <Box>
              <IconButton onClick={() => setEditModal(true)}>
                <Edit style={{ color: '#1876D1' }} />
              </IconButton>
              <IconButton onClick={() => setDeleteModal(true)}>
                <Delete style={{ color: '#D32F2F' }} />
              </IconButton>
            </Box>
          </Typography>
        </CardContent>
      </Card>

      <Modal active={deleteModal} setActive={setDeleteModal}>
        <Typography variant="h2" sx={{ textShadow: '1px 1px 2px #000', color: '#1876D1' }}>
          Are you sure you want to delete todo? <br />
          <b style={{ textShadow: '1px 1px 2px #000', color: 'white' }}>{sliceName(todo.name)}</b>
        </Typography>
        <Box marginTop={2} display="flex" gap={10} justifyContent="center">
          <Button variant="contained" onClick={markDeleting}>
            Yes
          </Button>
          <Button variant="contained" color="error" onClick={() => setDeleteModal(false)}>
            No
          </Button>
        </Box>
      </Modal>

      <Modal active={editModal} setActive={setEditModal}>
        <Typography variant="h2" sx={{ textShadow: '1px 1px 2px #000', color: '#1876D1' }}>
          Edit Todo
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          value={newName}
          inputProps={{ maxLength: 100 }}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Box marginTop={2} display="flex" gap={10} justifyContent="center">
          <Button variant="contained" onClick={handleEdit}>
            Save
          </Button>
          <Button variant="contained" color="error" onClick={() => setEditModal(false)}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}