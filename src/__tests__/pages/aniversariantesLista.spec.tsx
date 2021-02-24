import React from 'react';
import { render } from '@testing-library/react';

import { isDisplayed } from '../testUtils';

import AniversariantesLista from '../../pages/aniversariantesLista';

type LayoutProps = {
    children: React.ReactNode;
};
jest.mock('../../components/layout', () => {
    return ({ children }: LayoutProps) => (
        <div data-testid="Layout">{children}</div>
    );
});

jest.mock('../../components/listaAniversariantes', () => {
    return () => <div data-testid="ListaAniversariantesMock"></div>;
});

const renderiza = () => {
    return render(<AniversariantesLista />);
};

describe('AniversariantesLista page', () => {
    test('verifica a renderização inicial', () => {
        const { getByTestId } = renderiza();

        expect(
            isDisplayed(getByTestId, 'ListaAniversariantesMock'),
        ).toBeTruthy();
    });
});
