import React, { useState, useEffect, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Aniversariante } from '../models/Aniversariante';

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

const App: React.FC = () => {
    const classes = useStyles();
    const [aniversariantes, setAniversariantes] = useState<Aniversariante[]>(
        [],
    );
    const [mes, setMes] = useState(DateUtils.getMesAtual());

    const atualizaInformacoes = useCallback((mes: number) => {
        setMes(mes);
        autlizaListaAniversariantes(mes);
    }, []);

    const trocaMesHandler = (
        event: React.ChangeEvent<unknown>,
        mesNovo: number,
    ) => {
        atualizaInformacoes(mesNovo);
    };

    const autlizaListaAniversariantes = (mes: number) => {
        AniversariantesService.getListaAniversariantesMes(mes).then(
            aniversariantes => {
                setAniversariantes(aniversariantes);
            },
        );
    };

    useEffect(() => {
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
