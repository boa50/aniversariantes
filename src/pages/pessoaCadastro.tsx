import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/ui/input';
import PrimaryButton from '../components/ui/primaryButton';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { AuthState } from '../models/AuthState';
import { PessoaCadastroState } from '../models/PessoaCadastroState';

import { initCadastro } from '../store/actions';

import Layout from '../components/layout';
import Alerta from '../components/ui/alerta';

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
    const [buttonDisabled, setbuttonDisabled] = useState(false);

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
            nascimento: new Date(new Date().getFullYear() + '-01-01T03:00:00Z'),
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('O nome deve ser preenchido'),
            nascimento: Yup.date()
                .required('A data de nascimento deve ser preenchida')
                .typeError('A data informada é inválida'),
        }),
        onSubmit: values => {
            setAlertStyle(true);
            setbuttonDisabled(true);
            onInitCadastro(idFamilia, values.nome, values.nascimento);
        },
    });

    useEffect(() => {
        setbuttonDisabled(false);
    }, [formik.values.nome, formik.values.nascimento]);

    useEffect(() => {
        if (erro.length > 0) {
            setbuttonDisabled(false);
        }
    }, [erro]);

    const conteudo = (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

                <PrimaryButton
                    id="cadastrar"
                    label="Cadastrar"
                    disabled={buttonDisabled}
                />

                <Alerta
                    severity="error"
                    text={erro}
                    open={errorShow}
                    setOpen={setAlertStyle}
                />
                <Alerta
                    severity="success"
                    text={mensagemSucesso}
                    open={successShow}
                    setOpen={setAlertStyle}
                />
            </form>
        </MuiPickersUtilsProvider>
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
