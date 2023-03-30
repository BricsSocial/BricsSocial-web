import React from 'react';

import { Info as InfoIcon } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { generatePath, useNavigate } from 'react-router';

import { CreateVacancyModal } from 'src/components';
import { appRoutes, ModalId, RouterPathParam } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { VacanciesService, Vacancy } from 'src/services';
import { Nullable } from 'src/types';

export const VacanciesPage: React.FC = () => {
  const apiRef = useGridApiRef();
  const navigate = useNavigate();

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

  const columns: GridColDef<Vacancy>[] = React.useMemo(
    () => [
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<InfoIcon />}
            onClick={() =>
              navigate(
                generatePath(appRoutes.vacancies.profile, {
                  [RouterPathParam.vacancyId]: row.id,
                }),
              )
            }
            label="View Profile"
            showInMenu
          />,
        ],
      },
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
    ],
    [],
  );

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
              // TODO: Open a 'Are you sure?' modal
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
