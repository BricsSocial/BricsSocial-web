import React from 'react';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useRequest } from 'src/hooks';
import { VacanciesService, Vacancy } from 'src/services';

const columns: GridColDef<Vacancy>[] = [
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
  const { data, isLoading } = useRequest(VacanciesService.getVacancies);

  return (
    <Box>
      <Grid container mb={4} direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Vacancies</Typography>
        <Button variant="outlined">Add new vacancy</Button>
      </Grid>

      <DataGrid
        loading={isLoading}
        autoHeight
        rows={data?.items || []}
        columns={columns}
        checkboxSelection
      />
    </Box>
  );
};
