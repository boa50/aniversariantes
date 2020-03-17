import React, { useState, useEffect, useCallback } from 'react';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

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
            <div className="container">
                <h2 className="center">
                    {DateUtils.getMonthNameFromNumber(mes)}
                </h2>
                <AniversariantesDia />
                <TrocaMes listener={trocaMesListener} mes={mes} />
                <ListaAniversariantes aniversariantes={aniversariantes} />
            </div>
        </Layout>
    );
};

export default App;
