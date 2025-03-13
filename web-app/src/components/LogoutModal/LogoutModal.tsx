// components/LogoutModal/index.tsx
import React from 'react';
import { Modal } from '../Modal';
import { Box } from '../Box';
import { Text } from '../Text';
import { Button } from '../Button';

interface LogoutModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
    open,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal open={open} onClose={onClose} width="460px">
            <Box
                direction="column"
                alignItems="center"
                justifyContent="space-between"
                elevation={0}
                sx={{
                    height: '195px',
                    padding: '16px',
                }}
            >
                {/* Dialog Title */}
                <Text variant="t2">
                    ¿Seguro que deseas cerrar sesión?
                </Text>

                {/* Buttons Row */}
                <Box width="100%" direction="row" alignItems="center" justifyContent='space-around' elevation={0} gap="16px">
                    <Button variant="outlined" onAction={onClose} fullWidth>
                        NO
                    </Button>
                    <Button variant="filled" onAction={onConfirm} fullWidth>
                        SI
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
