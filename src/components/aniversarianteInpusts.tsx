import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/ui/input';
import Autocomplete from '../components/ui/autocomplete';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    inputs: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
    },
}));

type Props = {
    formik: any;
    readOnly?: boolean;
    autoFocus?: boolean;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AniversarianteInputs: React.FC<Props> = ({
    formik,
    readOnly = false,
    autoFocus = false,
    changeHandler,
}) => {
    const classes = useStyles();
    return (
        <Box className={classes.inputs}>
            <Input
                id="nome"
                label="Nome"
                formik={formik}
                readOnly={readOnly}
                autoFocus={autoFocus}
                changeHandler={changeHandler}
            />

            <Input
                id="nascimento"
                label="Data de nascimento"
                type="date"
                formik={formik}
                readOnly={readOnly}
                changeHandler={changeHandler}
            />

            <Autocomplete
                id="aniversariante-pai"
                label="Nome do pai"
                formik={formik}
                readOnly={readOnly}
                changeHandler={changeHandler}
            />

            <Autocomplete
                id="aniversariante-mae"
                label="Nome da mãe"
                formik={formik}
                readOnly={readOnly}
                changeHandler={changeHandler}
            />
        </Box>
    );
};

export default AniversarianteInputs;
