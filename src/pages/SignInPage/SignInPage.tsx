import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Link, SxProps, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { appRoutes } from 'src/constants';

type SignInFormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email('Not a valid email').required('Field is required'),
  password: yup.string().required('Field is required'),
});

export const SignInPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Grid container direction="column" gap={2} sx={formContainerStyles}>
        <Typography variant="h5" textAlign="center" fontWeight={500}>
          Great to see you again!
        </Typography>
        <Typography variant="body1" textAlign="center">
          Please, sign in to proceed
        </Typography>
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit">
          Sign in
        </Button>
        <Typography variant="body1" textAlign="center">
          Don't have an account yet?{' '}
          <Link component={RouterLink} to={appRoutes.auth.signup}>
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </form>
  );
};

const formContainerStyles: SxProps = {
  width: 400,
  background: '#fff',
  borderRadius: 1,
  boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.05)',
  padding: 4,
};
