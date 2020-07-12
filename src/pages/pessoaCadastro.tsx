import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState('');

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

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertStyle(true);

        const dtNascimento = new Date(nascimento + 'T03:00:00Z');
        onInitCadastro(idFamilia, nome, dtNascimento);
    };

    const errorShow = erro.length > 0 && alertStyle;
    const successShow = pessoaCadastrada.length > 0 && alertStyle;
    const mensagemSucesso =
        pessoaCadastrada + ' cadastrado(a) nos aniversariantes da família ;)';

    const conteudo = (
        <form
            className={classes.form}
            autoComplete="off"
            onSubmit={onSubmitHandler}
            noValidate
        >
            <Input
                id="pessoa-nome"
                label="Nome"
                autoFocus={true}
                changeHandler={inputChangeHandler}
                stateManage={{ value: nome, setValue: setNome }}
            />

            <Input
                id="pessoa-data-nascimento"
                label="Data de nascimento"
                type="date"
                changeHandler={inputChangeHandler}
                stateManage={{ value: nascimento, setValue: setNascimento }}
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
