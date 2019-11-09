import React, { Component } from 'react';
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

    isMesInicial = () => {
        return this._mes === 1;
    }

    isMesFinal = () => {
        return this._mes === 12;
    }

    isMesAtual = mes => {
        return mes === this._mes;
    }

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

    botoesMeses = () => {
        const meses = DateUtils.getMesesNumeros();
        
        return (
            meses.map((value) => {
                return (
                    <li className={this.isMesAtual(value) ? "active" : "waves-effect"}
                        onClick={() => this.trocaMes(value)}>
                        <a href="#!">{value}</a>
                    </li>
                )
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