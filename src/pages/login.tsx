import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { AuthState } from '../models/AuthState';

import { initAuth, checkIdFamilia } from '../store/actions';

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

    const loading = useSelector((state: AuthState) => state.auth.idFamilia);
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const erro = useSelector((state: AuthState) => state.auth.error);

    const onInitAuth = () => dispatch(initAuth(idFamiliaLocal));
    const onCheckIdFamilia = useCallback(() => dispatch(checkIdFamilia()), []);

    useEffect(() => {
        onCheckIdFamilia();
    }, [onCheckIdFamilia]);

    useEffect(() => {
        if (idFamilia) {
            navigate('/');
        }
    }, [idFamilia]);

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
    let errorShow = erro.length > 0 && alertStyle;

    if (!loading && !idFamilia) {
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
                />
                <Button variant="contained" color="secondary" type="submit">
                    Entrar
                </Button>
                {errorShow ? <Alerta severity="error" text={erro} /> : null}
            </form>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
