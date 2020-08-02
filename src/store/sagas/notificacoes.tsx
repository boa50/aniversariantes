import axios from '../../axios';
import { NotificacaoAction } from '../../models/NotificacaoAction';

export function* subscreveSaga(action: NotificacaoAction) {
    const token = yield localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const idFamilia = action.idFamilia;
        const tokenDestino = action.tokenDestino;
        const url = idFamilia + '/notificacoes/';
        const payload = {
            fields: {
                tokenDestino: {
                    stringValue: tokenDestino,
                },
            },
        };

        yield axios.post(url, payload, config);
    } catch (error) {}
}
