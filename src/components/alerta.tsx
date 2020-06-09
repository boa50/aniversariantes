import React, { useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

type Props = {
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    text: string;
};

const Alerta: React.FC<Props> = ({ severity, text }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <MuiAlert
                elevation={6}
                variant="filled"
                severity={severity}
                onClose={handleClose}
                data-testid="alerta"
            >
                {text}
            </MuiAlert>
        </Snackbar>
    );
};

export default Alerta;