import { useEffect, useCallback } from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';

import { authCheckState, initAniversariantes } from '../store/actions';
import { AuthState } from '../models/AuthState';

export const useAuthCheck = (location: Location) => {
    const dispatch = useDispatch();

    const authLoading = useSelector((state: AuthState) => state.auth.loading);
    const authChecked = useSelector(
        (state: AuthState) => state.auth.authChecked,
    );
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const onAuthCheckState = useCallback(() => dispatch(authCheckState()), []);
    const onInitAniversariantes = useCallback(
        (idFamilia: string) => dispatch(initAniversariantes(idFamilia)),
        [],
    );

    useEffect(() => {
        if (!idFamilia) {
            onAuthCheckState();
        }
    }, [onAuthCheckState]);

    useEffect(() => {
        if (idFamilia) {
            onInitAniversariantes(idFamilia);
        }
    }, [idFamilia, onInitAniversariantes]);

    if (authChecked && !authLoading) {
        if (!idFamilia && !location.pathname.startsWith('/login')) {
            navigate('/login/');
        }
        if (idFamilia && location.pathname.startsWith('/login')) {
            navigate('/');
        }
    }
};
