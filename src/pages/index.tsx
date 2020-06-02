import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { AniversariantesState } from '../models/AniversariantesState';
import { AuthState } from '../models/AuthState';
import DateUtils from '../utils/dateUtils';

import { initAniversariantes } from '../store/actions';

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
    circularProgress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh',
    },
}));

const App: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const mes = useSelector(
        (state: AniversariantesState) => state.aniversariantes.mes,
    );
    const aniversariantesLoading = useSelector(
        (state: AniversariantesState) => state.aniversariantes.loading,
    );
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);

    const onInitAniversariantes = useCallback(
        (idFamilia: string) => dispatch(initAniversariantes(idFamilia)),
        [],
    );

    useEffect(() => {
        onInitAniversariantes(idFamilia);
    }, [idFamilia, onInitAniversariantes]);

    let conteudo = (
        <Box className={classes.circularProgress}>
            <CircularProgress data-testid="loading-aniversariantes" />
        </Box>
    );

    if (!aniversariantesLoading) {
        conteudo = (
            <Box>
                <Typography
                    variant="h3"
                    className={classes.mesTexto}
                    data-testid="mes-nome"
                >
                    {DateUtils.getMonthNameFromNumber(mes)}
                </Typography>
                <AniversariantesDia />
                <TrocaMes />
                <ListaAniversariantes />
            </Box>
        );
    }

    return <Layout title="Aniversariantes">{conteudo}</Layout>;
};

export default App;
