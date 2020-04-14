import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AniversariantesState } from '../models/AniversariantesState';

import { setIdFamilia } from '../store/actions/aniversariantes';

import Layout from '../components/layout';
import Alerta from '../components/alerta';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '85vh',
    },
    input: {
        marginBottom: theme.spacing(3),
    },
}));

const Login: React.FC = () => {
    const idsFamilia = ['ooQKFaqwblGMPNq0AUML', 'zRMPmD0qcvFufmu2Cmfz'];
    const classes = useStyles();
    const dispatch = useDispatch();

    const [erro, setErro] = useState(false);

    const idFamilia = useSelector(
        (state: AniversariantesState) => state.idFamilia,
    );
    const onSetIdFamilia = (idFamilia: string) =>
        dispatch(setIdFamilia(idFamilia));

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSetIdFamilia(event.target.value);
        setErro(false);
    };

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (idsFamilia.indexOf(idFamilia) < 0) {
            setErro(true);
        } else {
            navigate('/');
        }
    };

    return (
        <Layout title="Login">
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={onSubmitHandler}
            >
                <TextField
                    className={classes.input}
                    error={erro}
                    required
                    id="id-familia"
                    label="Código da Família"
                    variant="outlined"
                    color="secondary"
                    value={idFamilia}
                    onChange={inputChangeHandler}
                />
                <Button variant="contained" color="secondary" type="submit">
                    Entrar
                </Button>
                {erro ? (
                    <Alerta severity="error" text="Código Inexistente!" />
                ) : null}
            </form>
        </Layout>
    );
};

export default Login;
