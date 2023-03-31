import React from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { ModalId } from 'src/constants';
import { useModal, useNotifications, useRequest } from 'src/hooks';
import { Components } from 'src/schema';
import { CompaniesService, Company } from 'src/services/companiesService';

import { Modal } from '../common';

export type EditCompanyModalArgs = {
  company: Company;
};

type EditCompanyModalProps = {
  afterSubmit?: () => void;
};

type UpdateCompanyFormData = Pick<Components.Schemas.UpdateCompanyCommand, 'name' | 'description'>;

export const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ afterSubmit }) => {
  const { isOpen, closeModal, args } = useModal<EditCompanyModalArgs>(ModalId.EditCompanyModal);
  const company = args?.company;

  const { spawnNotification } = useNotifications();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateCompanyFormData>({
    defaultValues: args?.company || {},
  });

  React.useEffect(() => reset(company), [reset, company]);

  const { makeRequest: updateCompany, isLoading: updatingCompany } = useRequest(
    CompaniesService.updateCompany,
    true,
  );

  if (!company) {
    return null;
  }

  const onSubmit = async (data: UpdateCompanyFormData) => {
    if (!company.id) {
      return;
    }
    await updateCompany({ id: company?.id }, { id: company.id, ...data });
    afterSubmit?.();
    spawnNotification('Successfully updated company', 'success');
    closeModal();
  };

  return (
    <Modal open={isOpen} onClose={() => closeModal} title="Edit company">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column" wrap="nowrap" gap={2}>
          <TextField
            {...register('name')}
            fullWidth
            title="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('description')}
            fullWidth
            title="Description"
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
            rows={3}
          />
          <Grid container mt={2} justifyContent="center" gap={4}>
            <Button variant="contained" type="submit" color="success" disabled={updatingCompany}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Modal>
  );
};
