import React, { useState, useEffect, useCallback } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import Box from '@material-ui/core/Box';

import DateUtils from '../utils/dateUtils';
import AniversariantesService from '../services/aniversariantes';
import ListaAniversariantes from '../components/listaAniversariantes';
import TrocaMes from '../components/trocaMes';
import AniversariantesDia from '../components/aniversariantesDia';
import Layout from '../components/layout';

const App = () => {
    const [aniversariantes, setAniversariantes] = useState([]);
    const [mes, setMes] = useState(0);

    const atualizaInformacoes = useCallback(mes => {
        setMes(mes);
        autlizaListaAniversariantes(mes);
    }, []);

    const trocaMesListener = mesNovo => {
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
            <Box textAlign="center" fontSize="h2.fontSize">
                {DateUtils.getMonthNameFromNumber(mes)}
            </Box>
            <AniversariantesDia />
            <TrocaMes listener={trocaMesListener} mes={mes} />
            <ListaAniversariantes aniversariantes={aniversariantes} />
        </Layout>
    );
};

export default App;
