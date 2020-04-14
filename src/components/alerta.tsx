import React, { useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

type Props = {
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    text: string;
};

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Alerta: React.FC<Props> = ({ severity, text }) => {
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert severity={severity} onClose={handleClose}>
                {text}
            </Alert>
        </Snackbar>
    );
};

export default Alerta;
