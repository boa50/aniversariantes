import React, { Component } from 'react';

class ListaAniversariantes extends Component {
    render() {
        const { aniversariantes } = this.props;

        const linhas = aniversariantes.map((linha, index) => {
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
}

export default ListaAniversariantes;