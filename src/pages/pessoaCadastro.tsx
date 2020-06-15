import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { AuthState } from '../models/AuthState';

import { initCadastro } from '../store/actions';

import Layout from '../components/layout';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '85vh',
    },
    input: {
        marginBottom: theme.spacing(3),
        width: '50%',
    },
    button: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

const PessoasCadastro: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [nome, setNome] = useState('');
    const [nascimento, setNascimento] = useState();

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);

    const onInitCadastro = (
        idFamilia: string,
        nome: string,
        nascimento: Date,
    ) => dispatch(initCadastro(idFamilia, nome, nascimento));

    const nomeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNome(event.target.value);
    };

    const nascimentoChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setNascimento(event.target.value);
    };

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        // setAlertStyle(true);
        onInitCadastro(idFamilia, nome, nascimento);
    };

    const conteudo = (
        <form
            className={classes.form}
            autoComplete="off"
            onSubmit={onSubmitHandler}
        >
            <TextField
                required
                className={classes.input}
                autoFocus={true}
                id="pessoa-nome"
                label="Nome"
                variant="outlined"
                color="secondary"
                value={nome}
                onChange={nomeChangeHandler}
            />
            <TextField
                required
                className={classes.input}
                InputLabelProps={{ shrink: true }}
                type="date"
                id="pessoa-data-nascimento"
                label="Data de nascimento"
                variant="outlined"
                color="secondary"
                value={nascimento}
                onChange={nascimentoChangeHandler}
            />
            <Box>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    type="submit"
                >
                    Cadastrar
                </Button>
            </Box>
        </form>
    );

    return <Layout title="Cadastro de Pessoas">{conteudo}</Layout>;
};

export default PessoasCadastro;
