import React from 'react';
import { render } from '@testing-library/react';

import TrocaMes from '../../components/trocaMes';

describe('TrocaMes component', () => {
    test('verifica se a renderização foi feita de maneira correta', () => {
        const props = {
            listener: {},
            mes: 10,
        };
        const { getByTestId } = render(<TrocaMes props={props} />);
        const pagination = getByTestId('pagination-material-component');

        expect(pagination).toBeDefined();
    });
});
