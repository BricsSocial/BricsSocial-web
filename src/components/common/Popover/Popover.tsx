import React from 'react';

import { Popover as MuiPopover, PopoverProps as MuiPopoverProps } from '@mui/material';
import { bindTrigger, bindPopover, usePopupState } from 'material-ui-popup-state/hooks';

export type PopoverProps = Omit<MuiPopoverProps, 'open'> & {
  target: React.ReactNode;
  content: (args: { onClose: () => void }) => React.ReactNode;
  forceOpen?: boolean;
  onAfterClose?: () => void;
};

export const Popover: React.FC<PopoverProps> = ({
  target,
  content,
  forceOpen,
  onAfterClose = () => null,
  ...popoverProps
}) => {
  const popupState = usePopupState({
    variant: 'popover',
  });

  const bindPopoverState = React.useMemo(() => bindPopover(popupState), [popupState]);
  const bindTriggerState = React.useMemo(() => bindTrigger(popupState), [popupState]);
  const open = forceOpen === undefined ? bindPopoverState.open : forceOpen;

  const handleClose = React.useCallback(() => {
    bindPopoverState.onClose();
    onAfterClose();
  }, [bindPopoverState, onAfterClose]);

  return (
    <React.Fragment>
      <div {...bindTriggerState} style={{ display: 'inline' }}>
        {target}
      </div>
      <MuiPopover {...bindPopoverState} {...popoverProps} open={open} onClose={handleClose}>
        {content({ onClose: handleClose })}
      </MuiPopover>
    </React.Fragment>
  );
};
