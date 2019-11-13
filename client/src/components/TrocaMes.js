import React, { Component, Fragment } from 'react';
import MediaQuery from 'react-responsive';
import DateUtils from '../utils/DateUtils';

class TrocaMes extends Component {
    trocaMes = mes => {
        this.props.listener(mes);
    }

    trocaMesAnterior = () => {
        if (!this.isMesInicial()) {
            this.trocaMes(this._mes - 1);
        }
    }

    trocaMesPosterior = () => {
        if (!this.isMesFinal()) {
            this.trocaMes(this._mes + 1);
        }
    }

    isMesInicial = () => this._mes === 1;

    isMesFinal = () => this._mes === 12;

    isMesAtual = mes => mes === this.getMesAtual();

    getMesAtual = () => this._mes;

    botaoSeta = (desabilita, executa, icone) => {
        return (
            <li className={desabilita() ? "disabled" : "waves-effect"}
                onClick={executa}>
                <a href="#!">
                    <i class="material-icons">{icone}</i>
                </a>
            </li>
        );
    }

    botaoMesAnterior = () => {
        return this.botaoSeta(
            this.isMesInicial, this.trocaMesAnterior, "chevron_left");
    }

    botaoMesPosterior = () => {
        return this.botaoSeta(
            this.isMesFinal, this.trocaMesPosterior, "chevron_right");
    }

    getMesClasse = mes => {
        const mesAtual = this.getMesAtual();
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

        if (this.isMesAtual(mes)) {
            return "active red lighten-1";
        } else if (this.isMesVisivel(mes)) {
            return "waves-effect";
        } else if (testeClicabilidade) {
            return ""
        }

        return "mes-nao-apresentado";
    }

    getMesClasseBigScreen = mes => {
        if (this.isMesAtual(mes)) {
            return "active red lighten-1";
        } else {
            return "waves-effect";
        }
    }

    getMesApresentacao = mes => {
        if (this.isMesVisivel(mes)) {
            return (
                <li className={this.getMesClasse(mes)}
                    onClick={() => this.trocaMes(mes)}>
                    <a href="#!">{mes}</a>
                </li>
            );
        }

        return (
            <li className={this.getMesClasse(mes)}>
                <a href="#!">...</a>
            </li>
        );
    }

    isMesVisivel = mes => {
        const mesAtual = this.getMesAtual();
        const condicoesVisibilidade = [
            this.isMesAtual(mes),
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

    botoesMeses = () => {
        const meses = DateUtils.getMesesNumeros();
        
        return (
            meses.map(mes => {
                return (
                    <Fragment>
                        <MediaQuery maxDeviceWidth={550}>
                            {this.getMesApresentacao(mes)}
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={550}>
                            <li className={this.getMesClasseBigScreen(mes)}
                                onClick={() => this.trocaMes(mes)}>
                                <a href="#!">{mes}</a>
                            </li>
                        </MediaQuery>
                    </Fragment>
                );
            })
        )
    }

    render() {
        this._mes = this.props.mes;

        return (
            <div className="center">
                <ul className="pagination">
                    {this.botaoMesAnterior()}
                    {this.botoesMeses()}
                    {this.botaoMesPosterior()}
                </ul>
            </div>
        );
    }
}

export default TrocaMes;