import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AuthState } from '../models/AuthState';

import { initAuth } from '../store/actions';

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
    const classes = useStyles();
    const dispatch = useDispatch();

    const [idFamiliaLocal, setIdFamiliaLocal] = useState('');
    const [alertStyle, setAlertStyle] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const erro = useSelector((state: AuthState) => state.auth.error);

    const onInitAuth = () => dispatch(initAuth(idFamiliaLocal));

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFamiliaLocal(event.target.value);
        setAlertStyle(false);
    };

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertStyle(true);
        onInitAuth();
    };

    let conteudo = <div />;
    const errorShow = erro.length > 0 && alertStyle;

    if (!idFamilia) {
        conteudo = (
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={onSubmitHandler}
            >
                <TextField
                    className={classes.input}
                    error={errorShow}
                    required
                    id="id-familia"
                    label="Código da Família"
                    variant="outlined"
                    color="secondary"
                    value={idFamiliaLocal}
                    onChange={inputChangeHandler}
                    data-testid="codigo-familia-input"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    data-testid="button-login"
                >
                    Entrar
                </Button>
                {errorShow ? <Alerta severity="error" text={erro} /> : null}
            </form>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
