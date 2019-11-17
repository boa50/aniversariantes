import React from 'react';
import { useMediaQuery } from 'react-responsive';
import DateUtils from '../utils/DateUtils';
import Pagination from './Pagination';

const TrocaMes = (props) => {
    let _mesAtual = props.mes;

    const isBigScreen = useMediaQuery({
        query: '(min-device-width: 550px)'
    });

    const isMesInicial = () => _mesAtual === 1;

    const isMesFinal = () => _mesAtual === 12;

    const isMesAtual = mes => mes === _mesAtual;

    const trocaMes = mes => {
        props.listener(mes);
    }

    const trocaMesAnterior = () => {
        if (!isMesInicial()) {
            trocaMes(_mesAtual - 1);
        }
    }

    const trocaMesPosterior = () => {
        if (!isMesFinal()) {
            trocaMes(_mesAtual + 1);
        }
    }

    const botaoSeta = (desabilita, executa, icone) => {
        return (
            <li className={desabilita() ? "disabled" : "waves-effect"}
                onClick={executa}>
                <a href="#!">
                    <i class="material-icons">{icone}</i>
                </a>
            </li>
        );
    }

    const botaoMesAnterior = () => {
        return botaoSeta(
            isMesInicial, trocaMesAnterior, "chevron_left");
    }

    const botaoMesPosterior = () => {
        return botaoSeta(
            isMesFinal, trocaMesPosterior, "chevron_right");
    }

    const getMesClasse = mes => {
        const condicoesClicabilidade = [
            _mesAtual === 12 && mes === 9,
            _mesAtual === 11 && mes === 9,
            _mesAtual === 1 && mes === 4,
            _mesAtual === 2 && mes === 4,
            mes === _mesAtual + 1,
            mes === _mesAtual - 1
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        const testeClicabilidade = condicoesClicabilidade.reduce(reducer, false);

        if (isMesAtual(mes)) {
            return "active red lighten-1";
        } else if (isMesVisivel(mes) || isBigScreen) {
            return "waves-effect";
        } else if (testeClicabilidade) {
            return ""
        }

        return "mes-nao-apresentado";
    }

    const getMesApresentacao = mes => {
        if (isMesVisivel(mes) || isBigScreen) {
            return (
                <li className={getMesClasse(mes)}
                    onClick={() => trocaMes(mes)}>
                    <a href="#!">{mes}</a>
                </li>
            );
        }

        return (
            <li className={getMesClasse(mes)}>
                <a href="#!">...</a>
            </li>
        );
    }

    const isMesVisivel = mes => {
        const condicoesVisibilidade = [
            isMesAtual(mes),
            mes === 1 || mes === 12,
            _mesAtual === 12 && (mes === 11 || mes === 10),
            _mesAtual === 11 && mes === 10,
            _mesAtual === 10 && mes === 11,
            _mesAtual === 1 && (mes === 2 || mes === 3),
            _mesAtual === 2 && mes === 3,
            _mesAtual === 3 && mes === 2
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        return condicoesVisibilidade.reduce(reducer, false);
    }

    const botoesMeses = () => {
        const meses = DateUtils.getMesesNumeros();
        
        return meses.map(mes => getMesApresentacao(mes));
    }

    return (
        <div className="center">
            <ul className="pagination">
                {botaoMesAnterior()}
                {botoesMeses()}
                {botaoMesPosterior()}
            </ul>
        </div>
    );
    
}

export default TrocaMes;