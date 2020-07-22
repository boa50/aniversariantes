import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '../components/ui/input';
import PrimaryButton from '../components/ui/primaryButton';
import Progress from '../components/ui/progress';

import { AuthState } from '../models/AuthState';

import { initAuth } from '../store/actions';

import Layout from '../components/layout';
import Alerta from '../components/alerta';

const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%',
        },
        [theme.breakpoints.up('sm')]: {
            height: '85vh',
        },
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
}));

const Login: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [alertStyle, setAlertStyle] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const erro = useSelector((state: AuthState) => state.auth.error);
    const loading = useSelector((state: AuthState) => state.auth.loading);

    const onInitAuth = (values: any) => dispatch(initAuth(values.idFamilia));

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlertStyle(false);
    };

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

    const autoFocus = formik.values.idFamilia === '';

    let conteudo = <div />;
    if (!idFamilia) {
        conteudo = (
            <Grid
                className={classes.root}
                container
                direction="column"
                justify="center"
            >
                <Grid item>
                    <Progress show={loading} />
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={formik.handleSubmit}
                        className={classes.form}
                    >
                        <Input
                            id="idFamilia"
                            label="Código da Família"
                            autoFocus={autoFocus}
                            error={errorShow}
                            changeHandler={inputChangeHandler}
                            formik={formik}
                        />

                        <PrimaryButton id="login" label="Entrar" />
                        {errorShow ? (
                            <Alerta severity="error" text={erro} />
                        ) : null}
                    </form>
                </Grid>
            </Grid>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
