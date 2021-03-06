import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { subscreve } from '../store/actions';
import { AuthState } from '../models/AuthState';

import firebase from 'gatsby-plugin-firebase';

export const useNotifications = () => {
    const dispatch = useDispatch();

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const subs = (tokenDestino: string) =>
        dispatch(subscreve(idFamilia, tokenDestino));

    useEffect(() => {
        if (idFamilia) {
            try {
                const messaging = firebase.messaging();
                messaging
                    .requestPermission()
                    .then(() => {
                        return messaging.getToken();
                    })
                    .then((token: any) => {
                        subs(token);
                    })
                    .catch((err: any) => {
                        console.error(`Erro ao gerar token: ${err}`);
                    });
            } catch (error) {
                console.log('Browser não suporta notificações.');
                console.error(error);
            }
        }
    }, [idFamilia]);
};
