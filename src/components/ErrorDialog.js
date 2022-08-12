import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';

export default function ErrorDialog({ openDialog, setOpenDialog }) {

    return (
        <Dialog className='dialog'
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <IconButton
                aria-label="close"
                onClick={() => setOpenDialog(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogTitle id="alert-dialog-title">
                {"Failed to Check Whitelist"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Something Went Wrong...
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

ErrorDialog.prototypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired
}