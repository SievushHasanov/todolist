import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import TodoForm from '../ui/TodoForm';
import TodoList from '../ui/TodoList';
import Loader from '../HOCs/Loader';

export default function MainPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Container sx={{ padding: { xs: 2, sm: 3, md: 4 }, maxWidth: '100%' }}>
        <TodoForm />
        <TodoList />
      </Container>
    </Loader>
  );
}
