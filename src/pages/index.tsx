import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';

import { Aniversariante } from '../models/Aniversariante';
import { AniversariantesState } from '../models/AniversariantesState';

import DateUtils from '../utils/dateUtils';
import AniversariantesUtils from '../utils/aniversariantesUtils';

import ListaAniversariantes from '../components/listaAniversariantes';
import TrocaMes from '../components/trocaMes';
import AniversariantesDia from '../components/aniversariantesDia';
import Layout from '../components/layout';

import { initAniversariantes } from '../store/actions/aniversariantes';

const useStyles = makeStyles(theme => ({
    mesTexto: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    circularProgress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
    },
}));

const App: React.FC = () => {
    const classes = useStyles();
    const [aniversariantesMes, setAniversariantesMes] = useState<
        Aniversariante[]
    >([]);
    const [mes, setMes] = useState(DateUtils.getMesAtual());

    const dispatch = useDispatch();

    const aniversariantes = useSelector(
        (state: AniversariantesState) => state.aniversariantes,
    );
    const loading = useSelector((state: AniversariantesState) => state.loading);

    const onInitAniversariantes = useCallback(
        () => dispatch(initAniversariantes()),
        [],
    );

    const trocaMesHandler = (
        event: React.ChangeEvent<unknown>,
        mesNovo: number,
    ) => {
        setMes(mesNovo);
    };

    const autlizaListaAniversariantes = (mes: number) => {
        const pessoasMes = AniversariantesUtils.getAniversariantesMes(
            aniversariantes,
            mes,
        );

        setAniversariantesMes(pessoasMes);
    };

    useEffect(() => {
        onInitAniversariantes();
    }, [onInitAniversariantes]);

    useEffect(() => {
        autlizaListaAniversariantes(mes);
    }, [mes, aniversariantes]);

    let conteudo = (
        <Box className={classes.circularProgress}>
            <CircularProgress />
        </Box>
    );

    const shareParams = {
        text: AniversariantesUtils.getAniversariantesShare(
            aniversariantesMes,
            mes,
        ),
    };

    if (!loading) {
        conteudo = (
            <Box>
                <Typography
                    variant="h3"
                    className={classes.mesTexto}
                    data-testid="mes-nome"
                >
                    {DateUtils.getMonthNameFromNumber(mes)}
                </Typography>
                <AniversariantesDia aniversariantes={aniversariantes} />
                <TrocaMes changeHandler={trocaMesHandler} mes={mes} />
                <ListaAniversariantes aniversariantes={aniversariantesMes} />
            </Box>
        );
    }

    return (
        <Layout title="Aniversariantes" shareParams={shareParams}>
            {conteudo}
        </Layout>
    );
};

export default App;
