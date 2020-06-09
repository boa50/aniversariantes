import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';

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

    const conteudo = (
        <form className={classes.form} autoComplete="off">
            <TextField
                required
                className={classes.input}
                autoFocus={true}
                id="pessoa-nome"
                label="Nome"
                variant="outlined"
                color="secondary"
            />
            <TextField
                required
                className={classes.input}
                placeholder="none"
                type="date"
                id="pessoa-data-nascimento"
                label="Data de nascimento"
                variant="outlined"
                color="secondary"
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
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Cancelar
                </Button>
            </Box>
        </form>
    );

    return <Layout title="Cadastro de Pessoas">{conteudo}</Layout>;
};

export default PessoasCadastro;
