import React from 'react';

import { AlternateEmail as RequestIcon, AccountBox as ProfileIcon } from '@mui/icons-material';
import { Box, SxProps, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { generatePath, useNavigate } from 'react-router';

import { VacancyRequestModal, VacancyRequestModalArgs } from 'src/components';
import { appRoutes, ModalId, RouterPathParam } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { Specialist, SpecialistsService } from 'src/services';

export const SpecialistsPage: React.FC = () => {
  const navigate = useNavigate();

  const { openModal } = useModal<VacancyRequestModalArgs>();
  const { data, isLoading } = useRequest(SpecialistsService.getSpecialistsList);

  const columns: GridColDef<Specialist>[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<RequestIcon />}
          onClick={() => openModal(ModalId.VacancyRequestModal, { specialist: row })}
          label="Send vacancy request"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<ProfileIcon />}
          onClick={() =>
            navigate(
              generatePath(appRoutes.specialists.profile, {
                [RouterPathParam.specialistId]: row.id,
              }),
            )
          }
          label="View Profile"
          showInMenu
        />,
      ],
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 200,
      valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'about',
      headerName: 'About',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Tooltip title={row.about}>
            <Typography sx={tableCellStyles} variant="body2">
              {row.about}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'bio',
      headerName: 'Bio',
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Tooltip title={row.bio}>
            <Typography sx={tableCellStyles} variant="body2">
              {row.bio}
            </Typography>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Box>
      <Typography mb={4} variant="h4">
        Specialists
      </Typography>

      <DataGrid
        rowSelection={false}
        loading={isLoading}
        autoHeight
        rows={data?.items || []}
        columns={columns}
      />

      <VacancyRequestModal />
    </Box>
  );
};

const tableCellStyles: SxProps = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
