import React, { type PropsWithChildren } from 'react';
import { Button, Dialog, styled, Zoom, type DialogProps } from '@mui/material';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>
) {
    return <Zoom ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export type CustomModalProps = DialogProps & {
    title?: string;
};

const CustomModal = ({
    children,
    title,
    ...props
}: PropsWithChildren<CustomModalProps>) => {
    return (
        <>
            {/* <Dialog {...props}>{children}</Dialog> */}

            <BootstrapDialog
                onClose={props.onClose}
                aria-labelledby="customized-dialog-title"
                slotProps={{
                    paper: {
                        sx: {
                            width: {
                                xs: '90%',
                                sm: '600px',
                                md: '800px',
                                lg: '1000px',
                            },
                            maxWidth: '100%',
                        },
                    },
                }}
                slots={{
                    transition: Transition,
                }}
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 1 }}>{title}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                        padding: '4px',
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>{children}</DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={props.handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </>
    );
};

export default CustomModal;
