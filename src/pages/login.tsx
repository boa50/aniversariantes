import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

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

    const [alertStyle, setAlertStyle] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const erro = useSelector((state: AuthState) => state.auth.error);

    const onInitAuth = (values: any) => dispatch(initAuth(values.idFamilia));

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlertStyle(false);
    };

    let conteudo = <div />;
    const errorShow = erro.length > 0 && alertStyle;

    const formik = useFormik({
        initialValues: {
            idFamilia: '',
        },
        validationSchema: Yup.object({
            idFamilia: Yup.string().required(
                'O código da família deve ser preenchido',
            ),
        }),
        onSubmit: values => {
            setAlertStyle(true);
            onInitAuth(values);
        },
    });

    if (!idFamilia) {
        conteudo = (
            <form
                className={classes.form}
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
            >
                <Input
                    id="idFamilia"
                    label="Código da Família"
                    autoFocus={true}
                    error={errorShow}
                    changeHandler={inputChangeHandler}
                    formik={formik}
                />

                <PrimaryButton id="login" label="Entrar" />

                {errorShow ? <Alerta severity="error" text={erro} /> : null}
            </form>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
