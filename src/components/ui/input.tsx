import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
    },
    input: {
        marginBottom: theme.spacing(3),
        width: '100%',
    },
    inputLabel: {
        fontSize: '1.5rem',
        width: '100%',
    },
}));

type Props = {
    id: string;
    label?: string;
    type?: string;
    autoFocus?: boolean;
    error?: boolean;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    formik: any;
};

const Input: React.FC<Props> = ({
    id,
    label,
    type = 'text',
    autoFocus = false,
    error,
    changeHandler,
    formik,
}) => {
    const classes = useStyles();
    const [focus, setFocus] = useState(false);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);

        if (undefined !== changeHandler) {
            changeHandler(event);
        }
    };

    const focusChangeHandler = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const type = event.type;

        if (type === 'focus') {
            setFocus(true);
        } else {
            formik.handleBlur(event);
            setFocus(false);
        }
    };

    const errorShow =
        (formik.touched[id] && formik.errors[id] !== undefined) || error;

    return (
        <Box className={classes.root}>
            <InputLabel
                id={id + '-label'}
                focused={focus}
                color="secondary"
                error={errorShow}
                htmlFor={id}
                shrink
                className={classes.inputLabel}
            >
                {label}
            </InputLabel>
            <TextField
                className={classes.input}
                autoFocus={autoFocus && !error}
                error={errorShow}
                helperText={formik.touched[id] && formik.errors[id]}
                InputLabelProps={{
                    shrink: true,
                }}
                id={id}
                name={id}
                type={type}
                variant="outlined"
                color="secondary"
                value={formik.values[id]}
                onFocus={focusChangeHandler}
                onBlur={focusChangeHandler}
                onChange={inputChangeHandler}
                data-testid={id + '-input'}
                inputProps={{ 'aria-labelledby': id + '-label' }}
            />
        </Box>
    );
};

export default Input;
