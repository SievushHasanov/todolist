import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import send from '../../lottie/send.json';
import { useState } from 'react';
import { useTodoContext } from '../../contexts/useTodoContext.ts';

export default function TodoForm(): JSX.Element {
  const [text, setText] = useState<string>('');
  const { addTodo } = useTodoContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== '') {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography
        variant="h1"
        sx={{
          textTransform: 'uppercase',
          textShadow: '1px 1px 2px #000',
          marginBottom: 5,
          fontSize: { xs: '44px', sm: '62px' },
        }}
      >
        to<span style={{ color: '#1876D1' }}>do</span>s
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField
            label="What's need to be done"
            variant="filled"
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength: 100 }}
            InputProps={{
              sx: { paddingRight: '65px' },
            }}
          />
          <Button
            type="submit"
            variant="outlined"
            disabled={text === ''}
            sx={{
              position: 'absolute',
              right: 0,
              fontSize: { xs: '14px', sm: '16px' },
            }}
          >
            <Lottie style={{ width: 40, height: 43 }} animationData={send} />
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
