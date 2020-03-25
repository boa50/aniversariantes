import React, { useState, useEffect, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Aniversariante } from '../models/Aniversariante';

import DateUtils from '../utils/dateUtils';
import AniversariantesUtils from '../utils/aniversariantesUtils';

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
    const [aniversariantesMes, setAniversariantesMes] = useState<
        Aniversariante[]
    >([]);
    const [mes, setMes] = useState(DateUtils.getMesAtual());

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
        AniversariantesService.getAniversariantes().then(
            aniversariantesResponse => {
                setAniversariantes(aniversariantesResponse);
            },
        );
    }, []);

    useEffect(() => {
        autlizaListaAniversariantes(mes);
    }, [mes, aniversariantes]);

    return (
        <Layout title="Aniversariantes">
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
        </Layout>
    );
};

export default App;
