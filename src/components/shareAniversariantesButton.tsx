import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';

import { AuthState } from '../models/AuthState';
import { AniversariantesState } from '../models/AniversariantesState';
import AniversariantesUtils from '../utils/aniversariantesUtils';

const ShareButton = React.lazy(() => {
    return import('../components/shareButton');
});

type Props = {
    className?: string;
};

const ShareAniversariantesButton: React.FC<Props> = ({ className }) => {
    const isSSR = typeof window === 'undefined';

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

    return exibeBotao && !isSSR ? (
        <Suspense fallback={<div />}>
            <div className={className}>
                <ShareButton
                    config={{
                        params: shareParams,
                    }}
                />
            </div>
        </Suspense>
    ) : null;
};

export default ShareAniversariantesButton;
