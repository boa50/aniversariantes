import React, { Component } from 'react';
import { List } from 'immutable';

class ListaAniversariantes extends Component {
    imprimeListaVazia = () => <h5> Sem aniversariantes no mês </h5>

    imprimeListaPreenchida = aniversariantes => {
        const aniversariantesOrdenados = this.ordenarPorDia(aniversariantes);
        
        const linhas = aniversariantesOrdenados.map((linha, index) => {
            return (
                <tr key={index}>
                    <td>{linha.pessoa}</td>
                    <td>{linha.dia}</td>
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

    ordenarPorDia = aniversariantes => {
        const listaAniversariantesOrdenada = new List(aniversariantes);

        return listaAniversariantesOrdenada._tail.array.sort((a, b) => {
            return a.dia < b.dia ? -1 : 1;
        });
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