import React, { Fragment } from 'react';
import MediaQuery from 'react-responsive';
import DateUtils from '../utils/DateUtils';

const Pagination = (props) => {
    let _mes = props.mes;

    const trocaMes = mes => {
        props.listener(mes);
    }

    const trocaMesAnterior = () => {
        if (!isMesInicial()) {
            trocaMes(_mes - 1);
        }
    }

    const trocaMesPosterior = () => {
        if (!isMesFinal()) {
            trocaMes(_mes + 1);
        }
    }

    const isMesInicial = () => _mes === 1;

    const isMesFinal = () => _mes === 12;

    const isMesAtual = mes => mes === getMesAtual();

    const getMesAtual = () => _mes;

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
        const mesAtual = getMesAtual();
        const condicoesClicabilidade = [
            mesAtual === 12 && mes === 9,
            mesAtual === 11 && mes === 9,
            mesAtual === 1 && mes === 4,
            mesAtual === 2 && mes === 4,
            mes === mesAtual + 1,
            mes === mesAtual - 1
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        const testeClicabilidade = condicoesClicabilidade.reduce(reducer, false);

        if (isMesAtual(mes)) {
            return "active red lighten-1";
        } else if (isMesVisivel(mes)) {
            return "waves-effect";
        } else if (testeClicabilidade) {
            return ""
        }

        return "mes-nao-apresentado";
    }

    const getMesClasseBigScreen = mes => {
        if (isMesAtual(mes)) {
            return "active red lighten-1";
        } else {
            return "waves-effect";
        }
    }

    const getMesApresentacao = mes => {
        if (isMesVisivel(mes)) {
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
        const mesAtual = getMesAtual();
        const condicoesVisibilidade = [
            isMesAtual(mes),
            mes === 1 || mes === 12,
            mesAtual === 12 && (mes === 11 || mes === 10),
            mesAtual === 11 && mes === 10,
            mesAtual === 10 && mes === 11,
            mesAtual === 1 && (mes === 2 || mes === 3),
            mesAtual === 2 && mes === 3,
            mesAtual === 3 && mes === 2
        ];

        const reducer = (accumulador, valorAtual) => accumulador || valorAtual;
        return condicoesVisibilidade.reduce(reducer, false);
    }

    const botoesMeses = () => {
        const meses = DateUtils.getMesesNumeros();
        
        return (
            meses.map(mes => {
                return (
                    <Fragment>
                        <MediaQuery maxDeviceWidth={550}>
                            {getMesApresentacao(mes)}
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={550}>
                            <li className={getMesClasseBigScreen(mes)}
                                onClick={() => trocaMes(mes)}>
                                <a href="#!">{mes}</a>
                            </li>
                        </MediaQuery>
                    </Fragment>
                );
            })
        )
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

export default Pagination;