import React, { useState } from 'react';

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

    const btnEditarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        setSalvarShow(true);
    };

    const btnVoltarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {};

    const btnSalvarOnClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        setSalvarShow(false);
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
            <Form formik={formik}>
                <Input
                    id="nome"
                    label="Nome"
                    formik={formik}
                    readOnly={!salvarShow}
                />

                <Input
                    id="nascimento"
                    label="Data de nascimento"
                    type="date"
                    formik={formik}
                    readOnly={!salvarShow}
                />

                <Box
                    className={classes.buttons}
                    style={{ display: salvarShow ? 'none' : 'flex' }}
                >
                    <Button
                        id="voltar-cancelar"
                        label="Voltar"
                        type="secondary"
                        btnType="button"
                        width={btnWidth}
                        onClick={btnVoltarOnClick}
                    />
                    <Button
                        id="editar-salvar"
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
                    />
                    <Button
                        id="salvar"
                        label="Salvar"
                        type="primary"
                        icon="save"
                        btnType="submit"
                        width={btnWidth}
                        onClick={btnSalvarOnClick}
                    />
                </Box>
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
