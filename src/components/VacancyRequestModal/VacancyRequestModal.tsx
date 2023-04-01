import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ModalId } from 'src/constants/modals';
import { useModal, useNotifications, useRequest } from 'src/hooks';
import { Specialist, SpecialistsService, VacanciesService } from 'src/services';
import { AgentService } from 'src/services/agentsService';

import { Modal } from '../common';

export type VacancyRequestModalArgs = {
  specialist: Specialist;
};

const schema = yup.object({
  vacancy: yup.number().required('Field is required'),
});

type VacancyRequestFormData = {
  vacancy: number;
};

export const VacancyRequestModal: React.FC = () => {
  const { isOpen, closeModal, args } = useModal<VacancyRequestModalArgs>(
    ModalId.VacancyRequestModal,
  );
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<VacancyRequestFormData>({
    resolver: yupResolver(schema),
  });
  const { data: agent } = useRequest(AgentService.getCurrentAgent);
  const { data, isLoading: loadingVacancies } = useRequest(
    VacanciesService.getVacancies,
    { skip: !isOpen || !agent?.companyId },
    {
      Status: 1,
      CompanyId: agent?.companyId,
    },
  );

  const { makeRequest: createVacancyRequest, isLoading: creatingRequest } = useRequest(
    SpecialistsService.createVacancyRequest,
    { lazy: true },
  );
  const { spawnNotification } = useNotifications();

  const vacancies = data?.items;

  const onSubmit = async (data: VacancyRequestFormData) => {
    if (!args?.specialist?.id) return;

    try {
      await createVacancyRequest({
        specialistId: args?.specialist?.id,
        vacancyId: data.vacancy,
      });
      spawnNotification('Vacancy request successfully created', 'success');
    } catch (error: any) {
      spawnNotification(error.message, 'error');
    }
  };

  return (
    <Modal title="Send vacancy request" fullWidth open={isOpen} onClose={() => closeModal()}>
      <Box mb={2}>
        <Typography>
          <b>Name:</b> {args?.specialist?.firstName} {args?.specialist?.lastName}
        </Typography>
        <Typography>
          <b>Email:</b> {args?.specialist?.email}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        {loadingVacancies ? (
          <Skeleton width={200} height={40} />
        ) : (
          <Autocomplete
            fullWidth
            options={vacancies || []}
            getOptionLabel={item => item.name || ''}
            onChange={(_, value) => value && setValue('vacancy', value.id!)}
            renderInput={params => (
              <TextField
                {...params}
                error={!!errors.vacancy?.message}
                helperText={errors.vacancy?.message}
                label="Vacancy"
                name="vacancy"
              />
            )}
          />
        )}
        <Grid container mt={2} justifyContent="center" gap={4}>
          <Button
            variant="contained"
            type="submit"
            color="success"
            disabled={loadingVacancies || creatingRequest}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Modal>
  );
};
