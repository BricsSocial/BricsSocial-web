import React from 'react';

import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [];

export const Specialists: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4">Specialists</Typography>
    </Box>
  );
};
