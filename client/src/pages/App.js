import React, { Fragment, useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import DateUtils from '../utils/DateUtils';
import AniversariantesService from '../services/Aniversariantes';
import Header from '../components/Header';
import ListaAniversariantes from '../components/ListaAniversariantes';
import TrocaMes from '../components/TrocaMes';
import AniversariantesDia from '../components/AniversariantesDia';

const App = () => {
    const [aniversariantes, setAniversariantes] = useState([]);
    const [mes, setMes] = useState(0);

    const atualizaInformacoes = mes => {
        setMes(mes);
        autlizaListaAniversariantes(mes);
    }

    const trocaMesListener = mesNovo => {
        atualizaInformacoes(mesNovo);
    }

    const autlizaListaAniversariantes = mes => {
        const aniversariantes = AniversariantesService.ListaAniversariantesMes(mes);
        setAniversariantes(aniversariantes);
    }

    useEffect(() => {
        const mes = DateUtils.getMesAtual();
        atualizaInformacoes(mes);
    }, [])

    return (
        <Fragment>
            <Header />
            <div className="container">
                <h2 className="center">{DateUtils.getMonthNameFromNumber(mes)}</h2>
                <AniversariantesDia />
                <TrocaMes
                    listener={trocaMesListener}
                    mes={mes} />
                <ListaAniversariantes aniversariantes={aniversariantes} />
            </div>
        </Fragment>
    );
}

export default App;