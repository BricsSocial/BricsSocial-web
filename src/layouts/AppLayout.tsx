import React from 'react';

import {
  AssignmentInd as ResumesIcon,
  Ballot as VacanciesIcon,
  ContactMail as ApplicationIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  drawerClasses,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@mui/material';
import { useNavigate } from 'react-router';

import { BRICS_LOGO } from 'src/assets';
import { appRoutes } from 'src/constants';

type MenuItem = {
  link: string;
  title: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    link: appRoutes.resumes.index,
    title: 'Resumes',
    icon: <ResumesIcon />,
  },
  {
    link: appRoutes.vacancies.index,
    title: 'Vacancies',
    icon: <VacanciesIcon />,
  },
  {
    link: appRoutes.applications.index,
    title: 'Applications',
    icon: <ApplicationIcon />,
  },
];

export const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Drawer
        anchor="left"
        transitionDuration={300}
        variant="permanent"
        sx={{
          [`.${drawerClasses.paper}`]: {
            width: '300px',
          },
        }}
      >
        <img style={{ margin: '20px 0' }} alt="BRICS logo" src={BRICS_LOGO} />
        <List>
          {menuItems.map(item => (
            <ListItem>
              <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box>
        <AppBar />
        {children}
      </Box>
    </Box>
  );
};
