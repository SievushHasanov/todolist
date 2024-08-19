import { Box } from '@mui/material';
import Lottie from 'lottie-react';
import React from 'react';
import loader from '../../lottie/loader.json';

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({
  children,
  isLoading,
}: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Lottie animationData={loader} />
      </Box>
    );
  return children;
}
