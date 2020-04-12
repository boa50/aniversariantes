import React, { useState } from 'react';
import { navigate } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
    },
}));

const Login: React.FC = () => {
    const classes = useStyles();

    const [idFamilia, setIdFamilia] = useState('');

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFamilia(event.target.value);
    };

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        alert(idFamilia);

        navigate('/');
    };

    return (
        <Layout title="Login">
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={onSubmitHandler}
            >
                <TextField
                    className={classes.input}
                    required
                    id="id-familia"
                    label="Código da Família"
                    variant="outlined"
                    color="secondary"
                    value={idFamilia}
                    onChange={inputChangeHandler}
                />
                <Button variant="contained" color="secondary" type="submit">
                    Entrar
                </Button>
            </form>
        </Layout>
    );
};

export default Login;
