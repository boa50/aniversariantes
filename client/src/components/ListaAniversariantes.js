import React from 'react';
import { List } from 'immutable';

const ListaAniversariantes = (props) => {
    const _aniversariantes = props.aniversariantes;

    const imprimeListaVazia = () => <h5> Sem aniversariantes no mês </h5>

    const imprimeListaPreenchida = aniversariantes => {
        const aniversariantesOrdenados = ordenarPorDia(aniversariantes);
        
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
                <tbody>
                    <tr>
                        <th>Aniversariante</th>
                        <th>Dia</th>
                    </tr>
                    {linhas}
                </tbody>
            </table>
        );
    }

    const ordenarPorDia = aniversariantes => {
        const listaAniversariantesOrdenada = new List(aniversariantes);

        return listaAniversariantesOrdenada._tail.array.sort((a, b) => {
            return a.dia < b.dia ? -1 : 1;
        });
    }  

    if (_aniversariantes.length === 0) {
        return imprimeListaVazia();
    } else {
        return imprimeListaPreenchida(_aniversariantes);
    }
}

export default ListaAniversariantes;