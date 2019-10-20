import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Header from '../../common/components/Header';
import ListaAniversariantes from '../components/ListaAniversariantes';
import DateUtils from '../../common/utils/DateUtils';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            aniversariantes: [
                {
                    pessoa: 'Troxa',
                    dia: '11/11/2011'
                },
                {
                    pessoa: 'Troxa2',
                    dia: '11/11/2012'
                },
                {
                    pessoa: 'Troxa3',
                    dia: '11/11/2013'
                },
            ],
            mes: 1
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container">
                    <h2>Aniversariantes de {DateUtils.getMonthNameFromNumber(this.state.mes)}</h2>
                    <ListaAniversariantes aniversariantes={this.state.aniversariantes} />
                </div>
            </Fragment>
        );
    }
}

export default App;