import React from 'react';

import { navigate } from 'gatsby';

import { useFormik } from 'formik';
import { useLocation } from '@reach/router';

import Input from '../components/ui/input';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Layout from '../components/layout';
import Form from '../components/form';

const PessoaInformacoes: React.FC = () => {
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
