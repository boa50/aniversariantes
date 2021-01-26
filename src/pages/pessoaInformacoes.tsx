import React from 'react';

import { useFormik } from 'formik';

import Input from '../components/ui/input';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import Layout from '../components/layout';
import Form from '../components/form';

const PessoaInformacoes: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            nome: 'jumento branco',
            nascimento: new Date(new Date().getFullYear() + '-01-01T03:00:00Z'),
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
