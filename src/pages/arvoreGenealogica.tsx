import React, { useEffect } from 'react';

import Layout from '../components/layout';

import ReactFamilyTree from 'react-family-tree';

const familia = [
    {
        id: '1',
        spouses: [
            {
                id: '2',
                type: 'married',
            },
            // {
            //     id: '10',
            //     type: 'divorced',
            // },
        ],
        siblings: [],
        parents: [],
        children: [
            {
                id: '3',
            },
            {
                id: '4',
            },
            {
                id: '5',
            },
        ],
    },
    {
        id: '10',
        spouses: [
            {
                id: '1',
                type: 'divorced',
            },
        ],
        siblings: [],
        parents: [],
        children: [
            {
                id: '5',
            },
        ],
    },
    {
        id: '2',
        spouses: [
            {
                id: '1',
                type: 'married',
            },
        ],
        siblings: [],
        parents: [],
        children: [
            {
                id: '3',
            },
            {
                id: '4',
            },
        ],
    },
    {
        id: '3',
        spouses: [],
        siblings: [
            {
                id: '4',
            },
        ],
        parents: [{ id: '1' }, { id: '2' }],
        children: [],
    },
    {
        id: '4',
        spouses: [],
        siblings: [
            {
                id: '3',
            },
        ],
        parents: [{ id: '1' }, { id: '2' }],
        children: [],
    },
    {
        id: '5',
        spouses: [],
        siblings: [],
        parents: [{ id: '1' }, { id: '10' }],
        children: [],
    },
];

const ArvoreGenealogica: React.FC = () => {
    const WIDTH = 200;
    const HEIGHT = 150;

    return (
        <Layout
            title="Árvore Genealógica"
            headerTexto="Árvore Genealógica"
            scope="logged"
        >
            <ReactFamilyTree
                nodes={familia as any}
                rootId={'1'}
                width={WIDTH}
                height={HEIGHT}
                renderNode={node => (
                    <div
                        key={node.id}
                        style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: WIDTH,
                            height: HEIGHT,
                            transform: `translate(${node.left *
                                (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                        }}
                    >
                        <div
                            style={{
                                padding: '10px',
                                margin: '10px',
                                backgroundColor: '#bbdefb',
                                border: '2px solid rgba(0, 0, 0, .1)',
                                borderRadius: '5px',
                            }}
                        >
                            {`${node.id} - Algum nome grande`}
                        </div>
                    </div>
                )}
            />
        </Layout>
    );
};

export default ArvoreGenealogica;
