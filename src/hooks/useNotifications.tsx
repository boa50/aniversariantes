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
            const messaging = firebase.messaging();
            messaging
                .requestPermission()
                .then(() => {
                    console.log('Notifications allowed');
                    return messaging.getToken();
                })
                .then((token: any) => {
                    console.log('Token Is : ' + token);
                    subs(token);
                })
                .catch((err: any) => {
                    console.log('No permission to send push', err);
                });
        }
    }, [idFamilia]);
};
