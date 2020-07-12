import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/ui/input';
import PrimaryButton from '../components/ui/primaryButton';

import { AuthState } from '../models/AuthState';
import { PessoaCadastroState } from '../models/PessoaCadastroState';

import { initCadastro } from '../store/actions';

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

const PessoaCadastro: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [alertStyle, setAlertStyle] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const pessoaCadastrada = useSelector(
        (state: PessoaCadastroState) => state.pessoaCadastro.pessoa,
    );
    const erro = useSelector(
        (state: PessoaCadastroState) => state.pessoaCadastro.error,
    );

    const onInitCadastro = (
        idFamilia: string,
        nome: string,
        nascimento: Date,
    ) => dispatch(initCadastro(idFamilia, nome, nascimento));

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlertStyle(false);
    };

    const errorShow = erro.length > 0 && alertStyle;
    const successShow = pessoaCadastrada.length > 0 && alertStyle;
    const mensagemSucesso =
        pessoaCadastrada + ' cadastrado(a) nos aniversariantes da família ;)';

    const formik = useFormik({
        initialValues: {
            nome: '',
            nascimento: '',
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('O nome deve ser preenchido'),
            nascimento: Yup.string().required(
                'A data de nascimento deve ser preenchida',
            ),
        }),
        onSubmit: values => {
            setAlertStyle(true);

            const dtNascimento = new Date(values.nascimento + 'T03:00:00Z');
            onInitCadastro(idFamilia, values.nome, dtNascimento);
        },
    });

    const conteudo = (
        <form
            className={classes.form}
            autoComplete="off"
            noValidate
            onSubmit={formik.handleSubmit}
        >
            <Input
                id="nome"
                label="Nome"
                autoFocus={true}
                changeHandler={inputChangeHandler}
                formik={formik}
            />

            <Input
                id="nascimento"
                label="Data de nascimento"
                type="date"
                changeHandler={inputChangeHandler}
                formik={formik}
            />

            <PrimaryButton id="cadastrar" label="Cadastrar" />

            {errorShow ? <Alerta severity="error" text={erro} /> : null}
            {successShow ? (
                <Alerta severity="success" text={mensagemSucesso} />
            ) : null}
        </form>
    );

    return (
        <Layout
            title="Cadastro de Aniversariantes"
            headerTexto="Cadastro de Aniversariantes"
        >
            {conteudo}
        </Layout>
    );
};

export default PessoaCadastro;
