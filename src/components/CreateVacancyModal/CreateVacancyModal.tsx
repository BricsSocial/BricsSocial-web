import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ModalId } from 'src/constants';
import { useModal, useNotifications, useRequest } from 'src/hooks';
import { VacanciesService } from 'src/services';

import { Modal, TagSelectField } from '../common';

type CreateVacancyFormData = {
  name: string;
  offerings: string;
  requirements: string;
  skillTags: string[];
};

const schema = yup.object({
  name: yup.string().required('Field is required'),
  requirements: yup.string().required('Field is required'),
  offerings: yup.string().required('Field is required'),
  skillTags: yup.array().of(yup.string().required()).min(1, 'Specify at least one skill tag'),
});

type CreateVacancyModalProps = {
  afterSubmit: () => void;
};

export const CreateVacancyModal: React.FC<CreateVacancyModalProps> = ({ afterSubmit }) => {
  const { spawnNotification } = useNotifications();
  const { isOpen, closeModal } = useModal(ModalId.CreateVacancyModal);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateVacancyFormData>({
    resolver: yupResolver(schema),
  });
  const { makeRequest: createVacancy, isLoading: creatingVacancy } = useRequest(
    VacanciesService.createVacancy,
    true,
  );

  const onSubmit = async (data: CreateVacancyFormData) => {
    try {
      await createVacancy({
        ...data,
        skillTags: data.skillTags.join(','),
      });
      spawnNotification('Vacancy successfully created', 'success');
      afterSubmit();
      closeModal();
    } catch (error: any) {
      spawnNotification(error.message, 'error');
    }
  };

  return (
    <Modal title="Create Vacancy" open={isOpen} onClose={() => closeModal()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" gap={2}>
          <TextField
            {...register('name')}
            label="Name"
            name="name"
            error={!!errors.name?.message}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('requirements')}
            label="Requirements"
            name="requirements"
            error={!!errors.requirements?.message}
            helperText={errors.requirements?.message}
            multiline
            rows={3}
          />
          <TextField
            {...register('offerings')}
            label="Offerings"
            name="offerings"
            error={!!errors.offerings?.message}
            helperText={errors.offerings?.message}
            multiline
            rows={3}
          />
          <TagSelectField
            {...register('skillTags')}
            error={!!errors.skillTags?.message}
            helperText={errors.skillTags?.message}
            control={control}
            fullWidth
            label="Skills"
          />
        </Grid>
        <Grid container mt={2} justifyContent="center" gap={4}>
          <Button variant="contained" type="submit" color="success" disabled={creatingVacancy}>
            Submit
          </Button>
        </Grid>
      </form>
    </Modal>
  );
};
