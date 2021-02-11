import React, { useState, useEffect } from 'react';

import { navigate } from 'gatsby';

import { useFormik } from 'formik';
import { useLocation } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';

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
    const btnWidth = '40%';

    const [salvarShow, setSalvarShow] = useState(false);
    const [submitResetDisabled, setSubmitResetDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertStyle, setAlertStyle] = useState(false);
    const [erro, setErro] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');
    const [errorShow, setErrorShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);

    // Aplicada uma solução temporária para o Typescript
    // https://github.com/reach/router/issues/414#issuecomment-683827688
    const location = useLocation<{ nome: ''; nascimento: '' }>();
    let nome = '';
    let nascimento = '';

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
        setSuccessShow(alertStyle && mensagemSucesso.length > 0);
    }, [alertStyle, erro, mensagemSucesso]);

    useEffect(() => {
        if (successShow) {
            setSalvarShow(false);
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

    const btnSalvarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        setLoading(true);

        //TODO só para simular uma espera
        setTimeout(() => {
            setAlertStyle(true);

            setLoading(false);
        }, 2000);
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
        onSubmit: values => {},
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
                        onClick={btnSalvarOnClick}
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
