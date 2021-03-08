import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import AutocompleteField from '@material-ui/lab/Autocomplete';

import { Aniversariante } from '../../models/Aniversariante';
import { AniversariantesState } from '../../models/AniversariantesState';

import DateUtils from '../../utils/dateUtils';
import AniversariantesUtils from '../../utils/aniversariantesUtils';

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
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    formik: any;
};

const Autocomplete: React.FC<Props> = ({
    id,
    label,
    changeHandler,
    readOnly = false,
    formik,
}) => {
    const classes = useStyles();
    const [focus, setFocus] = useState(false);

    const aniversariantes: Aniversariante[] = [];
    AniversariantesUtils.ordenaPorNomeNascimento(
        useSelector(
            (state: AniversariantesState) =>
                state.aniversariantes.aniversariantes,
        ),
    ).map(aniversariante => {
        aniversariantes.push(aniversariante);
    });

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

    const textFieldProps = {
        name: id,
        value: formik.values[id],
        className: classes.input,
        helperText: formik.touched[id] && formik.errors[id],
        onFocus: focusChangeHandler,
        onBlur: focusChangeHandler,
        variant: 'outlined' as 'outlined',
        color: 'secondary' as 'secondary' | 'primary',
        InputLabelProps: {
            shrink: true,
        },
        onChange: inputChangeHandler,
    };

    const inputLabelProps = {
        id: id + '-label',
        focused: focus,
        color: 'secondary' as 'secondary' | 'primary',
        htmlFor: id,
        shrink: true,
        className: classes.inputLabel,
    };

    return (
        <AutocompleteField
            id={id}
            options={aniversariantes}
            getOptionLabel={aniversariante =>
                `${aniversariante.pessoa} - ${DateUtils.getDataCompleta(
                    aniversariante.nascimento,
                )}`
            }
            className={classes.root}
            disabled={readOnly}
            renderInput={params => (
                <Box>
                    <InputLabel {...inputLabelProps}>{label}</InputLabel>
                    <TextField {...params} {...textFieldProps} />
                </Box>
            )}
            data-testid={id + '-autocomplete'}
        />
    );
};

export default Autocomplete;
