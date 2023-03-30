import React from 'react';

import { Launch as LinkIcon } from '@mui/icons-material';
import { Button, Card, Grid, IconButton, Link, Typography } from '@mui/material';
import { generatePath } from 'react-router';

import { appRoutes, ModalId, RouterPathParam } from 'src/constants';
import { useModal, useNotifications, useRequest } from 'src/hooks';
import { Components } from 'src/schema';
import { VacanciesService, VacancyReply } from 'src/services';

import { Modal } from '../common';

export type ViewReplyModalArgs = {
  reply: VacancyReply;
  shouldReply?: boolean;
};

type ViewReplyModalProps = {
  onAfterClose: () => void;
};

export const ViewReplyModal: React.FC<ViewReplyModalProps> = ({ onAfterClose }) => {
  const { spawnNotification } = useNotifications();
  const { isOpen, closeModal, args } = useModal<ViewReplyModalArgs>(ModalId.ViewReply);
  const { makeRequest: updateReply, isLoading } = useRequest(VacanciesService.updateReply, true);
  const reply = args?.reply;
  const shouldReply = args?.shouldReply;

  const handleUpdateReply = React.useCallback(
    async (newStatus: Components.Schemas.ReplyStatus) => {
      if (reply?.id) {
        try {
          await updateReply({ id: reply?.id }, { id: reply?.id, status: newStatus });
          closeModal();
          onAfterClose?.();
          spawnNotification('Reply successfully updated', 'success');
        } catch (error) {
          console.error(error);
          spawnNotification('An error occurred while updating reply', 'success');
        }
      }
    },
    [reply?.id, updateReply, closeModal, onAfterClose, spawnNotification],
  );

  if (!reply) return null;

  return (
    <Modal open={isOpen} onClose={() => closeModal()} title="Reply Info">
      <Card sx={{ p: 2, mb: 2 }}>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Specialist</Typography>
          <Link
            href={generatePath(appRoutes.specialists.profile, {
              [RouterPathParam.specialistId]: reply?.specialist?.id,
            })}
            target="_blank"
          >
            <IconButton color="primary">
              <LinkIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid container direction="row" wrap="nowrap" gap={2}>
          <Typography fontWeight={500}>Full Name:</Typography>
          <Typography>
            {reply?.specialist?.firstName} {reply?.specialist?.lastName}
          </Typography>
        </Grid>
        <Grid container direction="row" wrap="nowrap" gap={2}>
          <Typography fontWeight={500}>Email:</Typography>
          <Typography>
            <Link href={`emailto:${reply?.specialist?.email}`}>{reply?.specialist?.email}</Link>
          </Typography>
        </Grid>
      </Card>

      <Card sx={{ p: 2, mb: 2 }}>
        <Grid
          container
          direction="row"
          wrap="nowrap"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Vacancy</Typography>
          <Link
            href={generatePath(appRoutes.vacancies.profile, {
              [RouterPathParam.vacancyId]: reply?.vacancy?.id,
            })}
            target="_blank"
          >
            <IconButton color="primary">
              <LinkIcon />
            </IconButton>
          </Link>
        </Grid>
        <Grid container direction="row" wrap="nowrap" gap={2}>
          <Typography fontWeight={500}>Name:</Typography>
          <Typography>{reply.vacancy?.name}</Typography>
        </Grid>
      </Card>

      {shouldReply && (
        <Grid container justifyContent="center" gap={2}>
          <Button
            variant="outlined"
            color="error"
            disabled={isLoading}
            onClick={() => handleUpdateReply(2)}
          >
            Decline
          </Button>
          <Button
            variant="outlined"
            color="success"
            disabled={isLoading}
            onClick={() => handleUpdateReply(1)}
          >
            Approve
          </Button>
        </Grid>
      )}
    </Modal>
  );
};
