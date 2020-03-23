import React from 'react';
import { render } from '@testing-library/react';

import TrocaMes from '../../components/trocaMes';

const mockChangeHandler = (
    event: React.ChangeEvent<unknown>,
    mesNovo: number,
) => {};

describe('TrocaMes component', () => {
    test('verifica se a renderização foi feita de maneira correta', () => {
        const { getByTestId } = render(
            <TrocaMes mes={10} changeHandler={mockChangeHandler} />,
        );
        const pagination = getByTestId('pagination-material-component');

        expect(pagination).toBeDefined();
    });
});
