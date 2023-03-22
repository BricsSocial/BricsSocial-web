import React from 'react';

import {
  AssignmentInd as ResumesIcon,
  Ballot as VacanciesIcon,
  ContactMail as ApplicationIcon,
  AccountCircle as AccountIcon,
  MenuOpen as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Drawer,
  drawerClasses,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Toolbar,
} from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router';

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
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  return (
    <Box sx={mainContainerStyles}>
      <Drawer
        anchor="left"
        variant="permanent"
        open={isMenuOpen}
        sx={{
          [`.${drawerClasses.paper}`]: {
            transition: 'all 0.3s',
            position: 'relative',
            width: `${isMenuOpen ? '300' : '60'}px`,
          },
        }}
        keepMounted
      >
        <img style={{ margin: '20px 0' }} alt="BRICS logo" src={BRICS_LOGO} />
        <List>
          {menuItems.map(item => (
            <ListItem key={item.title} sx={{ p: 0 }}>
              <ListItemButton
                selected={Boolean(matchPath({ path: item.link, end: false }, location.pathname))}
                onClick={() => navigate(item.link)}
                sx={{
                  py: 2,
                  ...(!isMenuOpen ? { display: 'flex', justifyContent: 'center' } : null),
                }}
              >
                <ListItemIcon
                  sx={!isMenuOpen ? { display: 'flex', justifyContent: 'center' } : null}
                >
                  {item.icon}
                </ListItemIcon>
                {isMenuOpen && <ListItemText>{item.title}</ListItemText>}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box sx={appContainerStyles(true)}>
        <AppBar position="relative" sx={{ width: '100%', background: '#FFF' }}>
          <Toolbar>
            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <IconButton onClick={() => setIsMenuOpen(isOpen => !isOpen)}>
                <MenuIcon />
              </IconButton>

              <IconButton sx={{ alignSelf: 'flex-end' }}>
                <AccountIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box sx={appContentWrapper}>{children}</Box>
      </Box>
    </Box>
  );
};

const mainContainerStyles: SxProps = {
  display: 'flex',
  width: '100%',
  height: '100vh',
};

const appContainerStyles = (isDrawedOpened: boolean): SxProps => ({
  width: '100%',
});

const appContentWrapper: SxProps = {
  px: 6,
  py: 4,
};
