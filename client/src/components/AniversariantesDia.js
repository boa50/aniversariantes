import React from 'react';
import AniversariantesService from '../services/Aniversariantes';

const AniversariantesDia = () => {

    const aniversariantes = AniversariantesService.ListaAniversariantesDia();
    const quantidadeAniversariantes = aniversariantes.length;

    const texto = aniversariantes.map((linha, index) => {
        if (index < quantidadeAniversariantes - 1) {
            return (linha.pessoa + ', ');
        } else {
            return (linha.pessoa);
        }

    });

    if (quantidadeAniversariantes > 0) {
        return (
            <div className="row">
                <div className="col s12 m8 l5">
                    <div className="card-panel red lighten-1">
                        <span className="white-text icon-text">
                            <i className="material-icons icon-padding">notifications_active</i>
                            <span><strong style={{ fontWeight: "bold" }}>Hoje a festa é para: </strong> {texto}</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    } else {
        return '';
    }

}

export default AniversariantesDia;