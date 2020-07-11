import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

import { AuthState } from '../models/AuthState';

import { initAuth } from '../store/actions';

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
    input: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
    },
    inputLabel: {
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        fontSize: '1.5rem',
    },
}));

const Login: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [idFamiliaLocal, setIdFamiliaLocal] = useState('');
    const [alertStyle, setAlertStyle] = useState(false);

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const erro = useSelector((state: AuthState) => state.auth.error);

    const [focus, setFocus] = useState({ idFamilia: false });

    const onInitAuth = () => dispatch(initAuth(idFamiliaLocal));

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdFamiliaLocal(event.target.value);
        setAlertStyle(false);
    };

    const focusChangeHandler = (
        event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const nome = event.target.name;
        const type = event.type;

        if (type === 'focus') {
            setFocus({ ...focus, [nome]: true });
        } else {
            setFocus({ ...focus, [nome]: false });
        }
    };

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setAlertStyle(true);
        onInitAuth();
    };

    let conteudo = <div />;
    const errorShow = erro.length > 0 && alertStyle;

    if (!idFamilia) {
        conteudo = (
            <form
                className={classes.form}
                autoComplete="off"
                onSubmit={onSubmitHandler}
            >
                <InputLabel
                    focused={focus.idFamilia}
                    color="secondary"
                    htmlFor="id-familia"
                    shrink
                    className={classes.inputLabel}
                >
                    Código da Família
                </InputLabel>
                <TextField
                    className={classes.input}
                    error={errorShow}
                    required
                    autoFocus={true}
                    name="idFamilia"
                    id="id-familia"
                    variant="outlined"
                    color="secondary"
                    value={idFamiliaLocal}
                    onFocus={focusChangeHandler}
                    onBlur={focusChangeHandler}
                    onChange={inputChangeHandler}
                    data-testid="codigo-familia-input"
                />
                <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    data-testid="button-login"
                >
                    Entrar
                </Button>
                {errorShow ? <Alerta severity="error" text={erro} /> : null}
            </form>
        );
    }

    return <Layout title="Login">{conteudo}</Layout>;
};

export default Login;
