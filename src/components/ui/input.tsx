import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import ErrorIcon from '@material-ui/icons/Error';

import { PropertiesState } from '../../models/PropertiesState';

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
    readOnly?: boolean;
    formik: any;
};

const Input: React.FC<Props> = ({
    id,
    label,
    type = 'text',
    autoFocus = false,
    error,
    changeHandler,
    readOnly = false,
    formik,
}) => {
    const classes = useStyles();
    const [focus, setFocus] = useState(false);

    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );

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

    const DateComponent = isMobile ? DatePicker : KeyboardDatePicker;
    let inputField;

    const props = {
        id: id,
        name: id,
        value: formik.values[id],
        className: classes.input,
        helperText: formik.touched[id] && formik.errors[id],
        inputProps: { 'aria-labelledby': id + '-label' },
        onFocus: focusChangeHandler,
        onBlur: focusChangeHandler,
        'data-testid': id + '-input',
        disabled: readOnly,
    };

    if (type === 'date') {
        inputField = (
            <DateComponent
                format="dd/MM/yyyy"
                inputVariant="outlined"
                color="secondary"
                error={errorShow && !focus}
                onChange={(date: Date | null) =>
                    formik.setFieldValue(id, date, true)
                }
                {...props}
            />
        );
    } else if (type === 'text') {
        inputField = (
            <TextField
                variant="outlined"
                color="secondary"
                autoFocus={autoFocus && !error}
                error={errorShow}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={inputChangeHandler}
                InputProps={{
                    endAdornment: errorShow ? (
                        <InputAdornment position="end">
                            <ErrorIcon color="primary" />
                        </InputAdornment>
                    ) : null,
                }}
                {...props}
            />
        );
    }
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

            {inputField}
        </Box>
    );
};

export default Input;
