import axios from '../../axios';
import { NotificacaoAction } from '../../models/NotificacaoAction';
import { Notificado } from '../../models/db/Notificado';

function* checaSubscricao(url: string, config: {}, tokenDestino: string) {
    try {
        const response = yield axios.get(`${url}?pageSize=2000`, config);
        const notificados: Notificado[] = response.data.documents;

        for (let notificado of notificados) {
            const token = notificado.fields.tokenDestino.stringValue;

            if (token === tokenDestino) {
                return true;
            }
        }
    } catch (error) {
        console.error('Falha ao verificar subscrição.');
        console.error(`Error: ${error}`);
    }

    return false;
}

export function* subscreveSaga(action: NotificacaoAction) {
    const token = yield localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const idFamilia = action.idFamilia;
    const tokenDestino = action.tokenDestino;
    const url = idFamilia + '/notificados';

    const isSubscrito = yield checaSubscricao(url, config, tokenDestino);

    if (!isSubscrito) {
        try {
            const payload = {
                fields: {
                    tokenDestino: {
                        stringValue: tokenDestino,
                    },
                },
            };

            yield axios.post(`${url}/`, payload, config);
        } catch (error) {
            console.error('Falha ao cadastrar token para notificações.');
            console.error(`Error: ${error}`);
        }
    }
}
