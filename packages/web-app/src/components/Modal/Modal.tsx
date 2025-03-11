import React from 'react';
import { Modal as MuiModal } from '@mui/material';
import { SxProps, Theme } from '@mui/system';
import { Box } from '../Box';

export interface ModalProps {
  /** Controls whether the modal is open */
  open: boolean;
  /** Callback fired when the modal is requested to be closed */
  onClose: () => void;
  /** Optional width of the modal content */
  width?: string | number;
  /** Optional sx overrides for the modal content */
  sx?: SxProps<Theme>;
  /** Modal content */
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  width = 'auto',
  sx,
  children,
}) => {
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        width={width}
        direction="column"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 2,
          ...sx,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};
