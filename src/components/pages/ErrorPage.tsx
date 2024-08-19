import Lottie from 'lottie-react';
import { Button, Container } from '@mui/material';
import error from '../../lottie/404.json';
import { NavLink } from 'react-router-dom';

export default function ErrorPage(): JSX.Element {
  return (
    <Container>
      <NavLink to='/'>
        <Button variant='outlined'>back to main page</Button>
      </NavLink>
      <Lottie style={{marginTop: 50}} animationData={error} />
    </Container>
  );
}
