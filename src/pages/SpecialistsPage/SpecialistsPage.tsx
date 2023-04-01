import React from 'react';

import { AlternateEmail as RequestIcon, AccountBox as ProfileIcon } from '@mui/icons-material';
import { Box, Chip, Link, Skeleton, SxProps, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import ReactCountryFlag from 'react-country-flag';
import { generatePath, useNavigate } from 'react-router';

import { VacancyRequestModal, VacancyRequestModalArgs } from 'src/components';
import { appRoutes, COUNTRY_NAME_TO_CODE_MAPPING, ModalId, RouterPathParam } from 'src/constants';
import { useModal, useRequest } from 'src/hooks';
import { CountriesService, Specialist, SpecialistsService } from 'src/services';

export const SpecialistsPage: React.FC = () => {
  const navigate = useNavigate();

  const { openModal } = useModal<VacancyRequestModalArgs>();
  const { data, isLoading } = useRequest(SpecialistsService.getSpecialistsList);
  const { data: countries, isLoading: loadingCountries } = useRequest(CountriesService.getContries);

  const columns: GridColDef<Specialist>[] = React.useMemo(
    () => [
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: ({ row }) => [
          <GridActionsCellItem
            icon={<RequestIcon />}
            onClick={() => openModal(ModalId.VacancyRequestModal, { specialist: row })}
            label="Send vacancy request"
            showInMenu
          />,
          <GridActionsCellItem
            icon={<ProfileIcon />}
            onClick={() =>
              navigate(
                generatePath(appRoutes.specialists.profile, {
                  [RouterPathParam.specialistId]: row.id,
                }),
              )
            }
            label="View Profile"
            showInMenu
          />,
        ],
      },
      {
        field: 'fullName',
        headerName: 'Full Name',
        flex: 1,
        minWidth: 200,
        valueGetter: ({ row }) => `${row.firstName} ${row.lastName}`,
      },
      {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 200,
        renderCell: ({ row }) => <Link href={`mailto:${row?.email}`}>{row?.email}</Link>,
      },
      {
        field: 'contry',
        headerName: 'Country',
        flex: 1,
        minWidth: 200,
        renderCell: ({ row }) => {
          if (loadingCountries) {
            return <Skeleton height={40} width={100} />;
          }

          if (!row.countryId) {
            return null;
          }

          const countryName = countries?.find(contry => contry.id === row.countryId)?.name;

          return (
            !!countryName && (
              <React.Fragment>
                {countryName}
                <ReactCountryFlag
                  style={{ marginLeft: 4 }}
                  svg
                  aria-label={countryName}
                  title={countryName}
                  countryCode={COUNTRY_NAME_TO_CODE_MAPPING[countryName]}
                />
              </React.Fragment>
            )
          );
        },
        valueGetter: ({ row }) =>
          row.countryId ? countries?.find(c => c.id === row.countryId)?.name : null,
      },
      {
        field: 'skillTags',
        headerName: 'Skill Tags',
        minWidth: 300,
        renderCell: ({ row }) => {
          return row.skillTags
            ?.split(',')
            .map(tag => <Chip key={tag} label={tag} sx={{ mr: 1 }} />);
        },
      },
      {
        field: 'about',
        headerName: 'About',
        flex: 1,
        minWidth: 200,
        renderCell: ({ row }) => {
          return (
            <Tooltip title={row.about}>
              <Typography sx={tableCellStyles} variant="body2">
                {row.about}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        field: 'bio',
        headerName: 'Bio',
        flex: 1,
        minWidth: 200,
        renderCell: ({ row }) => {
          return (
            <Tooltip title={row.bio}>
              <Typography sx={tableCellStyles} variant="body2">
                {row.bio}
              </Typography>
            </Tooltip>
          );
        },
      },
    ],
    [navigate, openModal, loadingCountries, countries],
  );

  return (
    <Box>
      <Typography mb={4} variant="h4">
        Specialists
      </Typography>

      <DataGrid
        rowSelection={false}
        loading={isLoading}
        autoHeight
        rows={data?.items || []}
        columns={columns}
      />

      <VacancyRequestModal />
    </Box>
  );
};

const tableCellStyles: SxProps = {
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
