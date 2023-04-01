import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ModalId } from 'src/constants';
import { useModal, useNotifications, useRequest } from 'src/hooks';
import { VacanciesService, Vacancy } from 'src/services';

import { Modal, TagSelectField } from '../common';

type EditVacancyFormData = Pick<Vacancy, 'name' | 'offerings' | 'requirements' | 'status'> & {
  skillTags: string[];
};

export type EditVacancyModalArgs = {
  vacancy: Vacancy;
};

type EditVacancyModalProps = {
  afterSubmit: () => void;
};

const schema = yup.object({
  name: yup.string().required(),
  offerings: yup.string().required(),
  requirements: yup.string().required(),
  status: yup.number().required(),
});

export const EditVacancyModal: React.FC<EditVacancyModalProps> = ({ afterSubmit }) => {
  const { spawnNotification } = useNotifications();

  const { isOpen, closeModal, args } = useModal<EditVacancyModalArgs>(ModalId.EditVacancyModal);
  const vacancy = args?.vacancy;

  const { register, reset, handleSubmit, control } = useForm<EditVacancyFormData>({
    defaultValues: {
      ...vacancy,
      skillTags: vacancy?.skillTags?.split(','),
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(
    () =>
      reset({
        ...vacancy,
        skillTags: vacancy?.skillTags?.split(','),
      }),
    [reset, vacancy],
  );

  const { makeRequest: updateVacancy, isLoading: updatingVacancy } = useRequest(
    VacanciesService.updateVacancy,
    { lazy: true },
  );

  if (!vacancy?.id) {
    return null;
  }

  const onSubmit = async (data: EditVacancyFormData) => {
    if (!vacancy.id) {
      return;
    }

    try {
      await updateVacancy(
        { id: vacancy.id },
        { id: vacancy.id, ...data, skillTags: data.skillTags?.join(',') },
      );
      spawnNotification('Vacancy successfully updated', 'success');
      closeModal();
      afterSubmit?.();
    } catch (error) {
      console.error(error);
      spawnNotification('An error occurred while updating vacancy', 'error');
    }
  };

  return (
    <Modal open={isOpen} onClose={() => closeModal()} title="Edit vacancy">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" wrap="nowrap" gap={2}>
          <Typography component="label" htmlFor="name">
            Name
          </Typography>
          <TextField {...register('name')} fullWidth />
          <Typography component="label" htmlFor="requirements">
            Requirements
          </Typography>
          <TextField {...register('requirements')} fullWidth multiline rows={3} />
          <Typography component="label" htmlFor="offerings">
            Offerings
          </Typography>
          <TextField {...register('offerings')} fullWidth multiline rows={3} />
          <Typography component="label" htmlFor="status">
            Status
          </Typography>
          <Select {...register('status')} title="Status" fullWidth defaultValue={vacancy.status}>
            <MenuItem value={1}>Open</MenuItem>
            <MenuItem value={0}>Closed</MenuItem>
          </Select>
          <Typography component="label" htmlFor="status">
            Skill tags
          </Typography>
          <TagSelectField
            {...register('skillTags')}
            fullWidth
            control={control}
            defaultValue={vacancy.skillTags}
          />
          <Grid container mt={2} justifyContent="center" gap={4}>
            <Button variant="contained" type="submit" color="success" disabled={updatingVacancy}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};
