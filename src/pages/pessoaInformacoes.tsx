import React from 'react';

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
                <Input id="nome" label="Nome" formik={formik} readOnly={true} />

                <Input
                    id="nascimento"
                    label="Data de nascimento"
                    type="date"
                    formik={formik}
                    readOnly={true}
                />

                <Box className={classes.buttons}>
                    <Button
                        id="voltar-cancelar"
                        label="Voltar/Cancelar"
                        type="secondary"
                        btnType="reset"
                    />
                    <Button
                        id="editar-salvar"
                        label="Editar/Salvar"
                        type="primary"
                        icon="edit"
                        btnType="submit"
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
