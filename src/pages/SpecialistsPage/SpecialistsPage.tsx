import React from 'react';

import { AlternateEmail as RequestIcon } from '@mui/icons-material';
import { Box, SxProps, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';

import { ModalId } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { Specialist, SpecialistsService } from 'src/services';

export const Specialists: React.FC = () => {
  const { openModal } = useModal();
  const { data, isLoading } = useRequest(SpecialistsService.getSpecialists);

  const columns: GridColDef<Specialist>[] = [
    {
      field: 'actions',
      type: 'actions',
      width: 50,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<RequestIcon />}
          onClick={() => openModal(ModalId.VacancyRequestModal)}
          label="Send vacancy request"
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
    </Box>
  );
};

const tableCellStyles: SxProps = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
