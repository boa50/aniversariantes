import React from 'react';

import ListaAniversariantes from '../components/listaAniversariantes';
import Layout from '../components/layout';

const AniversariantesLista: React.FC = () => {
    return (
        <Layout
            title="Lista de Aniversariantes"
            headerTexto="Lista de Aniversariantes"
            scope="logged"
        >
            <ListaAniversariantes />
        </Layout>
    );
};

export default AniversariantesLista;
