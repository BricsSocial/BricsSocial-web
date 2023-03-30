import React from 'react';

import { Box, Card, Chip, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router';

import { RouterPathParam } from 'src/constants';
import { useRequest } from 'src/hooks';
import { VacanciesService } from 'src/services';

export const VacancyProfilePage: React.FC = () => {
  const params = useParams();
  const vacancyId = Number(params[RouterPathParam.vacancyId]);

  const { data: vacancy } = useRequest(VacanciesService.getVacancy, false, vacancyId);
  const skillTags = vacancy?.skillTags?.split(',');

  return (
    <Grid container direction="column" wrap="nowrap" gap={4}>
      <Box>
        <Typography variant="h4" component="span" mr={1}>
          {vacancy?.name}
        </Typography>
        <Typography
          variant="h4"
          component="span"
          sx={theme => ({ color: theme.palette.grey['400'] })}
        >
          #{vacancy?.id}
        </Typography>
      </Box>
      <Grid container direction="row" wrap="nowrap" gap={1}>
        {skillTags && skillTags?.map(tag => <Chip label={tag} />)}
      </Grid>

      <Grid container direction="row" wrap="nowrap" gap={1} justifyContent="stretch">
        <Card sx={{ p: 4, flex: '1 1 100%' }}>
          <Typography variant="h6" mb={1}>
            Requirements
          </Typography>
          <Typography>{vacancy?.requirements}</Typography>
        </Card>
        <Card sx={{ p: 4, flex: '1 1 100%' }}>
          <Typography variant="h6" mb={1}>
            Offerings
          </Typography>
          <Typography>{vacancy?.offerings}</Typography>
        </Card>
      </Grid>
    </Grid>
  );
};
