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
    stateManage: {
        value: string;
        setValue: React.Dispatch<React.SetStateAction<string>>;
    };
};

const Input: React.FC<Props> = ({
    id,
    label,
    type = 'text',
    autoFocus = false,
    error,
    changeHandler,
    stateManage,
}) => {
    const classes = useStyles();
    const [focus, setFocus] = useState(false);
    const [textInvalid, setTextInvalid] = useState('');
    const [errorInvalid, setErrorInvalid] = useState(false);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valor = event.target.value;
        stateManage.setValue(valor);
        setErrorInvalid(false);

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
            setFocus(false);
        }
    };

    const invalidChangeHandler = () => {
        setTextInvalid('Preencha o campo, jumento');
        setErrorInvalid(true);
    };

    return (
        <Box className={classes.root}>
            <InputLabel
                id={id + '-label'}
                focused={focus}
                color="secondary"
                error={error || errorInvalid}
                htmlFor={id}
                shrink
                className={classes.inputLabel}
            >
                {label}
            </InputLabel>
            <TextField
                required
                className={classes.input}
                autoFocus={autoFocus && !error}
                error={error || errorInvalid}
                // helperText={errorInvalid ? textInvalid : ''}
                onInvalid={invalidChangeHandler}
                InputLabelProps={{
                    shrink: true,
                }}
                id={id}
                name={id}
                type={type}
                variant="outlined"
                color="secondary"
                value={stateManage.value}
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
