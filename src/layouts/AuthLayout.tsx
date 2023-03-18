import React from 'react';

import { Grid, SxProps } from '@mui/material';

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={containerStyles}>
      {children}
    </Grid>
  );
};

const containerStyles: SxProps = {
  background: '#eee',
  minHeight: '100vh',
  minWidth: '100wv',
};
