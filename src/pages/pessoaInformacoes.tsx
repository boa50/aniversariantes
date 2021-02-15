import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { navigate } from 'gatsby';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';

import { AuthState } from '../models/AuthState';
import { PessoaAtualizaState } from '../models/PessoaAtualizaState';

import { initAtualiza } from '../store/actions';

import Layout from '../components/layout';
import Form from '../components/form';
import Alerta from '../components/ui/alerta';

const useStyles = makeStyles(theme => ({
    buttons: {
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        display: 'flex',
        justifyContent: 'space-around',
    },
}));

const PessoaInformacoes: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const btnWidth = '40%';

    const [salvarShow, setSalvarShow] = useState(false);
    const [submitResetDisabled, setSubmitResetDisabled] = useState(false);
    const [alertStyle, setAlertStyle] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [errorShow, setErrorShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const loading = useSelector(
        (state: PessoaAtualizaState) => state.pessoaAtualiza.loading,
    );
    const pessoaAtualizada = useSelector(
        (state: PessoaAtualizaState) => state.pessoaAtualiza.pessoa,
    );
    const erro = useSelector(
        (state: PessoaAtualizaState) => state.pessoaAtualiza.error,
    );

    const onInitAtualiza = (
        idFamilia: string,
        idPessoa: string,
        nome: string,
        nascimento: Date,
    ) => dispatch(initAtualiza(idFamilia, idPessoa, nome, nascimento));

    // Aplicada uma solução temporária para o Typescript
    // https://github.com/reach/router/issues/414#issuecomment-683827688
    const location = useLocation<{ nome: string; nascimento: Date }>();
    let nome: string = '';
    let nascimento: Date = new Date();

    const isSSR = typeof window === 'undefined';
    if (location.state == null) {
        if (!isSSR) {
            navigate('/');
        }
    } else {
        nome = location.state.nome;
        nascimento = location.state.nascimento;
    }

    useEffect(() => {
        setErrorShow(alertStyle && erro.length > 0);
        setSuccessShow(alertStyle && pessoaAtualizada.length > 0);
    }, [alertStyle, erro, pessoaAtualizada]);

    useEffect(() => {
        if (successShow) {
            setSalvarShow(false);
            setMensagemSucesso(
                `Os dados de ${pessoaAtualizada} foram atualizados.`,
            );
        }
    }, [successShow]);

    useEffect(() => {
        setSubmitResetDisabled(loading);
    }, [loading]);

    const btnEditarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        setSalvarShow(true);
    };

    const btnVoltarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        if (!isSSR) {
            navigate(-1);
        }
    };

    const btnCancelarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        setSalvarShow(false);
    };

    let formik = useFormik({
        initialValues: {
            nome: nome,
            nascimento: nascimento,
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('O nome deve ser preenchido'),
            nascimento: Yup.date()
                .required('A data de nascimento deve ser preenchida')
                .typeError('A data informada é inválida'),
        }),
        onSubmit: values => {
            setAlertStyle(true);
            onInitAtualiza(
                idFamilia,
                'idPessoa',
                values.nome,
                values.nascimento,
            );
        },
    });

    const conteudo = (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Form formik={formik} progressShow={loading}>
                <Input
                    id="nome"
                    label="Nome"
                    formik={formik}
                    readOnly={!salvarShow || loading}
                />

                <Input
                    id="nascimento"
                    label="Data de nascimento"
                    type="date"
                    formik={formik}
                    readOnly={!salvarShow || loading}
                />

                <Box
                    className={classes.buttons}
                    style={{ display: salvarShow ? 'none' : 'flex' }}
                >
                    <Button
                        id="voltar"
                        label="Voltar"
                        type="secondary"
                        btnType="button"
                        width={btnWidth}
                        onClick={btnVoltarOnClick}
                    />
                    <Button
                        id="editar"
                        label="Editar"
                        type="primary"
                        icon="edit"
                        btnType="button"
                        width={btnWidth}
                        onClick={btnEditarOnClick}
                    />
                </Box>
                <Box
                    className={classes.buttons}
                    style={{ display: salvarShow ? 'flex' : 'none' }}
                >
                    <Button
                        id="cancelar"
                        label="Cancelar"
                        type="secondary"
                        btnType="reset"
                        width={btnWidth}
                        onClick={btnCancelarOnClick}
                        disabled={submitResetDisabled}
                    />
                    <Button
                        id="salvar"
                        label="Salvar"
                        type="primary"
                        icon="save"
                        btnType="submit"
                        width={btnWidth}
                        disabled={submitResetDisabled}
                    />
                </Box>

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
        <Layout title="Informações Pessoais" headerTexto="Informações Pessoais">
            {conteudo}
        </Layout>
    );
};

export default PessoaInformacoes;
