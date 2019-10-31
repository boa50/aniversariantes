import React, { Component } from 'react';
import DateUtils from '../utils/DateUtils';

class ListaAniversariantes extends Component {
    imprimeListaVazia = () => <h5> Sem aniversariantes no mês </h5>

    imprimeListaPreenchida = aniversariantes => {
        const linhas = aniversariantes.map((linha, index) => {
            return (
                <tr key={index}>
                    <td>{linha.pessoa}</td>
                    <td>{DateUtils.getDiaFromString(linha.dia)}</td>
                </tr>
            );
        });

        return (
            <table className="centered hightlight">
                <tr>
                    <th>Pessoa</th>
                    <th>Dia</th>
                </tr>
                {linhas}
            </table>
        );
    }
    
    render() {
        this._aniversariantes = this.props.aniversariantes;

        if (this._aniversariantes.length === 0) {
            return this.imprimeListaVazia();
        } else {
            return this.imprimeListaPreenchida(this._aniversariantes);
        }
    }
}

export default ListaAniversariantes;