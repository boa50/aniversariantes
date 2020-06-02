import { useEffect, useCallback } from 'react';
import { navigate } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';

import { checkIdFamilia } from '../store/actions';
import { AuthState } from '../models/AuthState';

const useAuthCheck = (location: Location) => {
    const dispatch = useDispatch();

    const authLoading = useSelector((state: AuthState) => state.auth.loading);
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const onCheckIdFamilia = useCallback(() => dispatch(checkIdFamilia()), []);

    useEffect(() => {
        if (!idFamilia) {
            onCheckIdFamilia();
        }
    }, [onCheckIdFamilia]);

    if (!authLoading) {
        if (!idFamilia && !location.pathname.startsWith('/login')) {
            navigate('/login/');
            return null;
        }
        if (idFamilia && location.pathname.startsWith('/login')) {
            navigate('/');
            return;
        }
    }

    return;
};

export default useAuthCheck;
