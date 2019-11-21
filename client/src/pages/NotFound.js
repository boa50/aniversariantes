import React, { Fragment } from 'react';
import Header from '../components/Header';

const NotFound = () => {
    return (
        <Fragment>
            <Header />
            <div className="container">
                <h1>Página Não Encontrada</h1>
            </div>
        </Fragment>
    )
}

export default NotFound;