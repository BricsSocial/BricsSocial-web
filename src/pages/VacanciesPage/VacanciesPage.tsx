import React from 'react';

import { Info as InfoIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { generatePath, useNavigate } from 'react-router';

import { CreateVacancyModal, EditVacancyModal, EditVacancyModalArgs } from 'src/components';
import { appRoutes, ModalId, RouterPathParam } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { VacanciesService, Vacancy } from 'src/services';
import { AgentService } from 'src/services/agentsService';
import { Nullable } from 'src/types';

export const VacanciesPage: React.FC = () => {
  const apiRef = useGridApiRef();
  const navigate = useNavigate();
  const { data: agent } = useRequest(AgentService.getCurrentAgent);

  const { openModal } = useModal();
  const {
    data,
    isLoading,
    makeRequest: refetchVacancies,
  } = useRequest(
    VacanciesService.getVacancies,
    { lazy: false, skip: !agent?.companyId },
    { CompanyId: agent?.companyId },
  );

  const { makeRequest: deleteVacancy, isLoading: deletingVacancy } = useRequest(
    VacanciesService.deleteVacancies,
    { lazy: true },
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
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() =>
              openModal<EditVacancyModalArgs>(ModalId.EditVacancyModal, { vacancy: row })
            }
            label="Edit"
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
      {
        field: 'skillTags',
        headerName: 'Skill Tags',
        minWidth: 500,
        flex: 1,
        renderCell: ({ row }) => {
          return row.skillTags
            ?.split(',')
            .map(tag => <Chip key={tag} label={tag} sx={{ mr: 1 }} />);
        },
      },
    ],
    [navigate, openModal],
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
              await refetchVacancies({ CompanyId: agent?.companyId });
            }}
            disabled={!selectedRows?.size}
          >
            Delete selected
          </Button>
          <Button variant="contained" onClick={() => openModal(ModalId.CreateVacancyModal)}>
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
      <EditVacancyModal afterSubmit={() => refetchVacancies()} />
    </Box>
  );
};
