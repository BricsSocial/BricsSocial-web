import React from 'react';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { components } from 'src/schema';
import { getVacancies } from 'src/services/vacancyService';

const columns: GridColDef[] = [
  {
    field: 'name',
    width: 200,
    headerName: 'Name',
  },
  {
    field: 'status',
    width: 100,
    headerName: 'Status',
    renderCell: params => {
      return (
        <Chip
          variant="outlined"
          {...(params.row.status === 1
            ? {
                label: 'Open',
                color: 'success',
              }
            : {
                label: 'Closed',
                color: 'error',
              })}
        />
      );
    },
  },
];

export const VacanciesPage: React.FC = () => {
  const [vacancies, setVacancies] = React.useState<components['schemas']['VacancyDto'][]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getVacancies().then(data => {
      setVacancies(data);
      setLoading(false);
    });
  }, []);

  return (
    <Box>
      <Grid container mb={4} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Vacancies</Typography>
        <Button variant="outlined">Add new vacancy</Button>
      </Grid>

      <DataGrid
        rowSelection={false}
        loading={loading}
        autoHeight
        rows={vacancies}
        columns={columns}
      />
    </Box>
  );
};
