import React from 'react';

import { Avatar, Box, Button, Card, Grid, Skeleton, SxProps, Typography } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';

import { DEFAULT_AVATAR } from 'src/assets';
import { EditCompanyModal, EditCompanyModalArgs } from 'src/components';
import { COUNTRY_NAME_TO_CODE_MAPPING, ModalId } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { CountriesService } from 'src/services';
import { AgentService } from 'src/services/agentsService';
import { CompaniesService } from 'src/services/companiesService';

export const AgentAccountPage: React.FC = () => {
  const { openModal } = useModal();
  const { data: agent, isLoading: loadingAgent } = useRequest(AgentService.getCurrentAgent);
  const {
    data: company,
    isLoading: loadingCompany,
    makeRequest: refetchCompany,
  } = useRequest(CompaniesService.getCompany, false, agent?.companyId);

  const { data: countries } = useRequest(CountriesService.getContries);

  const companyCountryName = countries?.find(country => country.id === company?.countryId)?.name;

  return (
    <Grid container gap={2} direction="row" wrap="nowrap" justifyContent="stretch">
      {loadingAgent ? (
        <Skeleton width={200} height={40} />
      ) : (
        <Card sx={{ flex: '1 1 100%', p: 4 }}>
          <Box mb={1}>
            <Typography variant="h5" component="span" mr={1}>
              Agent info
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={theme => ({ color: theme.palette.grey['400'] })}
            >
              #{agent?.id}
            </Typography>
          </Box>
          <Grid container direction="row" wrap="nowrap" gap={2}>
            <Avatar src={agent?.photo || DEFAULT_AVATAR} sx={{ width: 100, height: 100 }} />
            <Grid item>
              <Box>
                <Typography component="span" fontWeight={500} mr={1}>
                  Name:
                </Typography>
                <Typography component="span">
                  {agent?.firstName} {agent?.lastName}
                </Typography>
              </Box>
              <Box>
                <Typography component="span" fontWeight={500} mr={1}>
                  Email:
                </Typography>
                <Typography component="span">{agent?.email}</Typography>
              </Box>
              <Box>
                <Typography component="span" fontWeight={500} mr={1}>
                  Position:
                </Typography>
                <Typography component="span">{agent?.position}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {loadingCompany ? (
        <Skeleton width={200} height={40} />
      ) : (
        <Card sx={{ flex: '1 1 100%', p: 4 }}>
          <Grid container direction="row" wrap="nowrap" justifyContent="space-between">
            <Box mb={1}>
              <Typography variant="h5" component="span" mr={1}>
                Company info
              </Typography>
              <Typography
                variant="h5"
                component="span"
                sx={theme => ({ color: theme.palette.grey['400'] })}
              >
                #{company?.id}
              </Typography>
            </Box>
            <Button
              onClick={() => openModal<EditCompanyModalArgs>(ModalId.EditCompanyModal, { company })}
            >
              Edit
            </Button>
          </Grid>
          <Grid container direction="row" wrap="nowrap" gap={2}>
            <Avatar src={company?.logo || DEFAULT_AVATAR} sx={{ width: 100, height: 100 }} />
            <Grid item>
              <Box>
                <Typography component="span" fontWeight={500} mr={1}>
                  Name:
                </Typography>
                <Typography component="span">{company?.name}</Typography>
              </Box>
              <Box>
                <Typography component="span" fontWeight={500} mr={1}>
                  Description:
                </Typography>
                <Typography component="span">{company?.description}</Typography>
              </Box>
              <Box>
                <Typography component="span" fontWeight={500} mr={1}>
                  Country:
                </Typography>
                <Typography component="span">
                  {companyCountryName}{' '}
                  {companyCountryName && (
                    <ReactCountryFlag
                      svg
                      aria-label={companyCountryName}
                      title={companyCountryName}
                      countryCode={COUNTRY_NAME_TO_CODE_MAPPING[companyCountryName]}
                    />
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      <EditCompanyModal afterSubmit={() => refetchCompany(company?.id)} />
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
