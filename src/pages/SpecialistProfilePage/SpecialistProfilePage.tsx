import React from 'react';

import { Avatar, Box, Card, Chip, Grid, Link, SxProps, Typography } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { useParams } from 'react-router';

import { DEFAULT_AVATAR } from 'src/assets';
import { COUNTRY_NAME_TO_CODE_MAPPING, RouterPathParam } from 'src/constants';
import { useRequest } from 'src/hooks';
import { CountriesService, SpecialistsService } from 'src/services';

export const SpecialistProfilePage: React.FC = () => {
  const params = useParams();
  const specialistId = Number(params[RouterPathParam.specialistId]);

  const { data: countries } = useRequest(CountriesService.getContries);

  const { data: specialist } = useRequest(SpecialistsService.getSpecialist, null, {
    id: specialistId,
  });

  const specialistCountryName = countries?.find(
    country => country.id === specialist?.countryId,
  )?.name;

  return (
    <Grid container direction="column" wrap="nowrap" gap={4}>
      <Grid container direction="row" spacing={4} alignItems="stretch">
        <Grid item xs={6}>
          <Card sx={cardStyles}>
            <Grid container direction="row" gap={4} alignItems="center">
              <Box position="relative">
                <Avatar
                  src={specialist?.photo || DEFAULT_AVATAR}
                  sx={{ width: 100, height: 100 }}
                />
                <Box sx={contryBoxStyles}>
                  {specialistCountryName && (
                    <ReactCountryFlag
                      svg
                      aria-label={specialistCountryName}
                      title={specialistCountryName}
                      countryCode={COUNTRY_NAME_TO_CODE_MAPPING[specialistCountryName]}
                    />
                  )}
                </Box>
              </Box>
              <Box>
                <Typography variant="h6">
                  {specialist?.firstName} {specialist?.lastName}{' '}
                </Typography>
                <Link href={`mailto:${specialist?.email}`}>{specialist?.email}</Link>
              </Box>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={cardStyles}>
            <Typography variant="h6" mb={1}>
              Skills
            </Typography>
            <Grid container gap={1}>
              {specialist?.skillTags?.split(',').map(tag => (
                <Chip key={tag} label={tag} />
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container direction="row" wrap="wrap" spacing={4} alignItems="stretch">
        <Grid item xs={6}>
          <Card sx={cardStyles}>
            <Typography variant="h6" mb={1}>
              About
            </Typography>
            <Typography>{specialist?.about}</Typography>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={cardStyles}>
            <Typography variant="h6" mb={1}>
              Bio
            </Typography>
            <Typography>{specialist?.bio}</Typography>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

const contryBoxStyles: SxProps = {
  position: 'absolute',
  height: 32,
  width: 32,
  top: -6,
  left: -6,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#000',
  borderRadius: '50%',
};

const cardStyles: SxProps = {
  p: 4,
  height: '100%',
  boxSizing: 'border-box',
};
