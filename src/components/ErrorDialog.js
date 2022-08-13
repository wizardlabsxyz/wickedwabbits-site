import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';

export default function ErrorDialog({ openDialog, setOpenDialog, message }) {

    return (
        <Dialog className='dialog'
            open={openDialog}
            onClick={(e) => {
                e.stopPropagation();
                setOpenDialog(false);  
            }}>
            <DialogTitle className='alert-dialog-title'>
                {"Something Went Wrong"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='alert-dialog-description'>
                    {message}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

ErrorDialog.prototypes = {
    openDialog: PropTypes.bool.isRequired,
    setOpenDialog: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}