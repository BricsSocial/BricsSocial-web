import React from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { VariantType, useSnackbar } from 'notistack';

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const spawnNotification = React.useCallback(
    (text: string, variant: VariantType = 'info', autoHideDuration = 2500) => {
      enqueueSnackbar(text, {
        autoHideDuration,
        variant,
        anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
        action: snackbarId => (
          <IconButton sx={{ color: '#fff' }} onClick={() => closeSnackbar(snackbarId)}>
            <CloseIcon />
          </IconButton>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar],
  );

  return { spawnNotification };
};
