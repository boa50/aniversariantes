import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { AniversariantesState } from '../models/AniversariantesState';
import DateUtils from '../utils/dateUtils';

import ListaAniversariantes from '../components/listaAniversariantes';
import TrocaMes from '../components/trocaMes';
import AniversariantesDia from '../components/aniversariantesDia';
import Layout from '../components/layout';
import { useNotifications } from '../hooks/useNotifications';

const useStyles = makeStyles(theme => ({
    mesTexto: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
}));

const App: React.FC = () => {
    const classes = useStyles();

    const mes = useSelector(
        (state: AniversariantesState) => state.aniversariantes.mes,
    );

    useNotifications();

    const conteudo = (
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
            <ListaAniversariantes mensal={true} />
        </Box>
    );

    return (
        <Layout title="Aniversariantes" scope="logged">
            {conteudo}
        </Layout>
    );
};

export default App;
