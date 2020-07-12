import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/ui/input';
import PrimaryButton from '../components/ui/primaryButton';

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
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%',
        },
        [theme.breakpoints.up('sm')]: {
            height: '85vh',
        },
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
                noValidate
            >
                <Input
                    id="id-familia"
                    label="Código da Família"
                    autoFocus={true}
                    error={errorShow}
                    changeHandler={inputChangeHandler}
                    stateManage={{
                        value: idFamiliaLocal,
                        setValue: setIdFamiliaLocal,
                    }}
                />

                <PrimaryButton id="login" label="Entrar" />

                {errorShow ? <Alerta severity="error" text={erro} /> : null}
            </form>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
