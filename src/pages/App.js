import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import DateUtils from '../utils/DateUtils';
import AniversariantesService from '../services/Aniversariantes';
import Header from '../components/Header';
import ListaAniversariantes from '../components/ListaAniversariantes';
import TrocaMes from '../components/TrocaMes';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aniversariantes: [],
            mes: 0
        }
    }

    componentDidMount() {
        const mes = DateUtils.getMesAtual();
        this.atualizaInformacoes(mes);
    }

    trocaMesListener = mesNovo => {
        this.atualizaInformacoes(mesNovo);
    }

    atualizaInformacoes = mes => {
        this.setState({ mes });
        this.autlizaListaAniversariantes(mes);
    }

    autlizaListaAniversariantes = mes => {
        const aniversariantes = AniversariantesService.ListaAniversariantesMes(mes);
        this.setState({ aniversariantes });
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <h2 className="center">{DateUtils.getMonthNameFromNumber(this.state.mes)}</h2>
                    <TrocaMes 
                        listener={this.trocaMesListener} 
                        mes={this.state.mes} />
                    <ListaAniversariantes aniversariantes={this.state.aniversariantes} />
                </div>
            </Fragment>
        );
    }
}

export default App;