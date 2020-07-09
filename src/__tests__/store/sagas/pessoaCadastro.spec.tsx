import axios from '../../../axios';
import { PessoaCadastroAction } from '../../../models/PessoaCadastroAction';
import { initCadastroSaga } from '../../../store/sagas/pessoaCadastro';
import {
    cadastroStart,
    cadastroSuccess,
    cadastroFail,
} from '../../../store/actions';

import { executeSaga } from '../../testUtils';

const pessoaNome = 'jumentinho';

const actionMock: PessoaCadastroAction = {
    type: '',
    idFamilia: '',
    pessoa: pessoaNome,
    nascimento: new Date('2000-01-02T03:00:00Z'),
    error: '',
};

describe('PessoaCadastroSaga', () => {
    test('verifica se os actions foram chamados corretamente', async () => {
        const responseMock = {
            data: {
                fields: {
                    pessoa: {
                        stringValue: pessoaNome,
                    },
                },
            },
        };

        const cadastraPessoa = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.resolve(responseMock));

        const dispatched = await executeSaga(initCadastroSaga, actionMock);

        expect(cadastraPessoa).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            cadastroStart(),
            cadastroSuccess(pessoaNome),
        ]);

        cadastraPessoa.mockClear();
    });

    test('verifica se deu erro na chamada da api', async () => {
        const mockError = 'mockError';
        const responseMock = {
            response: {
                data: {
                    error: {
                        message: mockError,
                    },
                },
            },
        };
        const cadastraPessoa = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.reject(responseMock));

        const dispatched = await executeSaga(initCadastroSaga, actionMock);

        expect(cadastraPessoa).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([cadastroStart(), cadastroFail(mockError)]);

        cadastraPessoa.mockClear();
    });
});
