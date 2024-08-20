import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import TodoForm from '../ui/TodoForm';
import TodoList from '../ui/TodoList';
import Loader from '../HOCs/Loader';

export default function MainPage(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    //! проверка лоудера
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </Loader>
  );
}
