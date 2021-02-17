import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Input from '../components/ui/input';
import Button from '../components/ui/button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import { AuthState } from '../models/AuthState';
import { PessoaCadastroState } from '../models/PessoaCadastroState';

import { initCadastro } from '../store/actions';

import Layout from '../components/layout';
import Form from '../components/form';
import Alerta from '../components/ui/alerta';

const PessoaCadastro: React.FC = () => {
    const dispatch = useDispatch();

    const [alertStyle, setAlertStyle] = useState(false);
    const [buttonDisabled, setbuttonDisabled] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const loading = useSelector(
        (state: PessoaCadastroState) => state.pessoaCadastro.loading,
    );
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
            <Form formik={formik} progressShow={loading}>
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

                <Button
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
            </Form>
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
