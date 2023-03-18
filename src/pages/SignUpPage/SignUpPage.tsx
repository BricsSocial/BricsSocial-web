import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Link, SxProps, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';

import { appRoutes } from 'src/constants';

type SignUpFormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const schema = yup.object({
  email: yup.string().email('Not a valid email').required('Field is required'),
  password: yup.string().required('Field is required'),
  repeatPassword: yup.string().equals([yup.ref('password')], "Passwords don't match"),
});

export const SignUpPage: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Grid container direction="column" gap={2} sx={formContainerStyles}>
        <Typography variant="h5" textAlign="center" fontWeight={500}>
          Welcome!
        </Typography>
        <Typography variant="body1" textAlign="center">
          Please, sign up to proceed
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
        <TextField
          label="Repeat password"
          type="password"
          {...register('repeatPassword')}
          error={!!errors.repeatPassword?.message}
          helperText={errors.repeatPassword?.message}
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
        <Typography variant="body1" textAlign="center">
          Already have an account?{' '}
          <Link component={RouterLink} to={appRoutes.auth.signin}>
            Sign in
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
