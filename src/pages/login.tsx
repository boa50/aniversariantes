import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/ui/input';
import PrimaryButton from '../components/ui/primaryButton';

import { AuthState } from '../models/AuthState';

import { initAuth } from '../store/actions';

import Layout from '../components/layout';
import Form from '../components/form';
import Alerta from '../components/ui/alerta';

const Login: React.FC = () => {
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
            <Form formik={formik} progressShow={loading}>
                <Input
                    id="idFamilia"
                    label="Código da Família"
                    autoFocus={autoFocus}
                    error={errorShow}
                    changeHandler={inputChangeHandler}
                    formik={formik}
                />

                <PrimaryButton id="login" label="Entrar" />

                <Alerta
                    severity="error"
                    text={erro}
                    open={errorShow}
                    setOpen={setAlertStyle}
                />
            </Form>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
