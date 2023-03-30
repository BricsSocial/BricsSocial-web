import React from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Dialog, DialogProps, DialogTitle, Grid, IconButton } from '@mui/material';

export const Modal: React.FC<DialogProps> = ({ children, title, ...props }) => {
  return (
    <Dialog fullWidth {...props}>
      {title && (
        <Grid
          container
          direction="row"
          wrap="nowrap"
          justifyContent={'space-between'}
          alignItems="center"
        >
          <DialogTitle>{title}</DialogTitle>
          <IconButton onClick={() => props?.onClose?.({}, 'backdropClick')} sx={{ mr: 2 }}>
            <CloseIcon />
          </IconButton>
        </Grid>
      )}
      <Box sx={{ px: 3, pb: 3 }}>{children}</Box>
    </Dialog>
  );
};
