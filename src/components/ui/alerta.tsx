import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

type Props = {
    severity: 'success' | 'info' | 'warning' | 'error' | undefined;
    text: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Alerta: React.FC<Props> = ({ severity, text, open, setOpen }) => {
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
