import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { AuthState } from '../models/AuthState';
import { AniversariantesState } from '../models/AniversariantesState';
import AniversariantesUtils from '../utils/aniversariantesUtils';
import RenderUtils from '../utils/renderUtils';

const ShareButton = React.lazy(() => {
    return import('../components/shareButton');
});

const ShareAniversariantesButton: React.FC = () => {
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const loading = useSelector(
        (state: AniversariantesState) => state.aniversariantes.loading,
    );
    const exibeBotao = !loading && idFamilia.length > 0;

    const aniversariantes = useSelector(
        (state: AniversariantesState) =>
            state.aniversariantes.aniversariantesMes,
    );
    const mes = useSelector(
        (state: AniversariantesState) => state.aniversariantes.mes,
    );

    const shareParams = {
        text: AniversariantesUtils.getAniversariantesShare(
            aniversariantes,
            mes,
        ),
    };

    return exibeBotao && !RenderUtils.isSSR(window) ? (
        <Suspense fallback={<div />}>
            <ShareButton
                config={{
                    params: shareParams,
                }}
            />
        </Suspense>
    ) : null;
};

export default ShareAniversariantesButton;
