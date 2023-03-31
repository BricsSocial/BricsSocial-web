import React from 'react';

import { Reply as ReplyIcon, Info as InfoIcon } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';

import { ViewReplyModal, ViewReplyModalArgs } from 'src/components';
import { ModalId } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { VacanciesService, VacancyReply } from 'src/services';

export const RepliesPage: React.FC = () => {
  const {
    data,
    isLoading,
    makeRequest: refetchReplies,
  } = useRequest(VacanciesService.getReplies, false);
  const { openModal } = useModal<ViewReplyModalArgs>();

  const columns: GridColDef<VacancyReply>[] = React.useMemo(
    () => [
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: ({ row }) => {
          const shouldReply = row.type === 1 && row.status === 0;
          return [
            <GridActionsCellItem
              icon={shouldReply ? <ReplyIcon /> : <InfoIcon />}
              onClick={() => openModal(ModalId.ViewReplyModal, { reply: row, shouldReply })}
              label={shouldReply ? 'Reply' : 'View Info'}
              showInMenu
            />,
          ];
        },
      },
      {
        field: 'name',
        headerName: 'Specialist Name',
        width: 200,
        valueGetter: ({ row }) => `${row.specialist?.firstName} ${row.specialist?.lastName}`,
      },
      {
        field: 'email',
        headerName: 'Specialist Email',
        width: 200,
        valueGetter: ({ row }) => row.specialist?.email,
      },
      {
        field: 'vacancy',
        headerName: 'Vacancy Name',
        width: 200,
        valueGetter: ({ row }) => row.vacancy?.name,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: ({ row }) => {
          switch (row.status) {
            case 0:
              return <Chip color="warning" label="Pending" />;
            case 1:
              return <Chip color="success" label="Approved" />;
            default:
              return <Chip color="error" label="Rejected" />;
          }
        },
      },
      {
        field: 'type',
        headerName: 'Type',
        width: 120,
        renderCell: ({ row }) => {
          switch (row.type) {
            case 0:
              return <Chip variant="outlined" label="Outgoing" />;
            default:
              return <Chip variant="outlined" color="info" label="Incoming" />;
          }
        },
      },
    ],
    [openModal],
  );

  return (
    <Box>
      <Typography mb={4} variant="h4">
        Replies
      </Typography>

      <DataGrid
        rowSelection={false}
        loading={isLoading}
        autoHeight
        columns={columns}
        rows={data?.items || []}
      />

      <ViewReplyModal onAfterClose={() => refetchReplies()} />
    </Box>
  );
};
