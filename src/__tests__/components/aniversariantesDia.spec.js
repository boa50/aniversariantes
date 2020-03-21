import React from 'react';
import { render } from '@testing-library/react';

import AniversariantesDia from '../../components/aniversariantesDia';

let mockAniversariantesDia = [];
jest.mock('../../services/aniversariantes', () => {
    return { ListaAniversariantesDia: () => mockAniversariantesDia };
});

describe('AniversariantesDia component', () => {
    test('verifica se a renderização foi feita de maneira correta para 1 aniversariante', () => {
        mockAniversariantesDia = [
            { pessoa: 'joãozinho', mes: '11', dia: '24' },
        ];
        const { getByTestId } = render(<AniversariantesDia />);
        const aniversariantesTexto = getByTestId('aniversariante-texto');
        const imagemAlerta = getByTestId('aniversariante-icone');

        expect(aniversariantesTexto.textContent).toMatch('joãozinho');
        expect(imagemAlerta).toBeDefined();
    });

    test('verifica se a renderização foi feita de maneira correta para 0 aniversariantes', () => {
        mockAniversariantesDia = [];
        const { getByTestId } = render(<AniversariantesDia />);
        let erro = '';
        try {
            getByTestId('aniversariante-texto');
        } catch (error) {
            erro = error;
        }

        expect(erro).toBeTruthy();
    });

    test('verifica se a renderização foi feita de maneira correta para vários aniversariante', () => {
        mockAniversariantesDia = [
            { pessoa: 'pedinho', mes: '11', dia: '24' },
            { pessoa: 'jumentinho', mes: '11', dia: '25' },
        ];
        const { getByTestId } = render(<AniversariantesDia />);
        const aniversariantesTexto = getByTestId('aniversariante-texto');
        const imagemAlerta = getByTestId('aniversariante-icone');

        expect(aniversariantesTexto.textContent).toMatch('pedinho');
        expect(aniversariantesTexto.textContent).toMatch(',');
        expect(aniversariantesTexto.textContent).toMatch('jumentinho');
        expect(imagemAlerta).toBeDefined();
    });
});
