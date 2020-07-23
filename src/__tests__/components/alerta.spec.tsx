import React from 'react';
import { render } from '@testing-library/react';

import Alerta from '../../components/ui/alerta';

describe('Alerta component', () => {
    test('verifica a renderização de maneira correta', () => {
        const severidade = 'success';
        const texto = 'testeTexto';
        const { getByTestId } = render(
            <Alerta severity={severidade} text={texto} />,
        );

        const alerta = getByTestId('alerta');

        expect(alerta).toBeDefined();
        expect(alerta.textContent).toBe(texto);
        expect(alerta.className).toContain('MuiAlert-filledSuccess');
        expect(alerta.className).not.toContain('MuiAlert-filledError');
    });

    test('verifica fechamento correto', () => {
        const severidade = 'success';
        const texto = 'testeTexto';
        const { container, getByTestId } = render(
            <Alerta severity={severidade} text={texto} />,
        );

        const alerta = getByTestId('alerta');

        const btnFechar: any = container.getElementsByClassName(
            'MuiAlert-action',
        )[0].firstChild;

        btnFechar.click();

        expect(alerta).not.toBeVisible();
    });
});
