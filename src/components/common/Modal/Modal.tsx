import React from 'react';

import { Box, Dialog, DialogProps, DialogTitle } from '@mui/material';

export const Modal: React.FC<DialogProps> = ({ children, title, ...props }) => {
  return (
    <Dialog fullWidth {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <Box sx={{ px: 3, pb: 3 }}>{children}</Box>
    </Dialog>
  );
};
