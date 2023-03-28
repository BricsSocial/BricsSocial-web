import React from 'react';

import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';

import { CreateVacancyModal } from 'src/components';
import { ModalId } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { VacanciesService, Vacancy } from 'src/services';
import { Nullable } from 'src/types';

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
  const apiRef = useGridApiRef();
  const { openModal } = useModal(ModalId.CreateVacancyModal);
  const {
    data,
    isLoading,
    makeRequest: refetchVacancies,
  } = useRequest(VacanciesService.getVacancies);

  const { makeRequest: deleteVacancy, isLoading: deletingVacancy } = useRequest(
    VacanciesService.deleteVacancies,
    true,
  );

  const [selectedRows, setSelectedRows] =
    React.useState<Nullable<ReturnType<(typeof apiRef)['current']['getSelectedRows']>>>();

  const onSelectedRowsChange = () => setSelectedRows(apiRef.current?.getSelectedRows?.());

  return (
    <Box>
      <Grid
        container
        mb={4}
        direction="row"
        wrap="nowrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Vacancies</Typography>
        <Grid container width="auto" gap={2}>
          <Button
            variant="outlined"
            color="error"
            onClick={async () => {
              await deleteVacancy({ id: Array.from<any>(selectedRows?.values() || [])?.[0]?.id });
              await refetchVacancies();
            }}
            disabled={!selectedRows?.size}
          >
            Delete selected
          </Button>
          <Button variant="contained" onClick={() => openModal()}>
            Add new vacancy
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        loading={isLoading || deletingVacancy}
        autoHeight
        rows={data?.items || []}
        columns={columns}
        // checkboxSelection // FIXME: Uncomment when 'deleteMany' method is available on server
        onRowSelectionModelChange={onSelectedRowsChange}
        apiRef={apiRef}
      />

      <CreateVacancyModal afterSubmit={() => refetchVacancies()} />
    </Box>
  );
};
