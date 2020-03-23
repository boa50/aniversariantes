import React from 'react';
import { render } from '@testing-library/react';

import Header from '../../components/header';

describe('Header component', () => {
    test('verifica se a renderização foi feita de maneira correta', () => {
        const { getByTestId } = render(<Header />);

        const texto = getByTestId('header-texto');
        const logo = getByTestId('header-logo');

        expect(logo).toBeDefined();
        expect(texto.textContent).toMatch(/Aniversariantes/);
    });
});
