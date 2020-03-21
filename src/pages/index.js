import React, { useState, useEffect, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import DateUtils from '../utils/dateUtils';
import AniversariantesService from '../services/aniversariantes';
import ListaAniversariantes from '../components/listaAniversariantes';
import TrocaMes from '../components/trocaMes';
import AniversariantesDia from '../components/aniversariantesDia';
import Layout from '../components/layout';

const useStyles = makeStyles(theme => ({
    mesTexto: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
}));

const App = () => {
    const classes = useStyles();
    const [aniversariantes, setAniversariantes] = useState([]);
    const [mes, setMes] = useState(0);

    const atualizaInformacoes = useCallback(mes => {
        setMes(mes);
        autlizaListaAniversariantes(mes);
    }, []);

    const trocaMesHandler = (event, mesNovo) => {
        atualizaInformacoes(mesNovo);
    };

    const autlizaListaAniversariantes = mes => {
        const aniversariantes = AniversariantesService.ListaAniversariantesMes(
            mes,
        );
        setAniversariantes(aniversariantes);
    };

    useEffect(() => {
        const mes = DateUtils.getMesAtual();
        atualizaInformacoes(mes);
    }, [atualizaInformacoes]);

    return (
        <Layout title="Aniversariantes">
            <Typography
                variant="h3"
                className={classes.mesTexto}
                data-testid="mes-nome"
            >
                {DateUtils.getMonthNameFromNumber(mes)}
            </Typography>
            <AniversariantesDia />
            <TrocaMes changeHandler={trocaMesHandler} mes={mes} />
            <ListaAniversariantes aniversariantes={aniversariantes} />
        </Layout>
    );
};

export default App;
