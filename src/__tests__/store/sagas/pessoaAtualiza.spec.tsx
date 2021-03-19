import axios from '../../../axios';
import { PessoaAtualizaAction } from '../../../models/PessoaAtualizaAction';
import { initAtualizaSaga } from '../../../store/sagas/pessoaAtualiza';
import {
    atualizaStart,
    atualizaSuccess,
    atualizaFail,
} from '../../../store/actions';
import { Aniversariante } from '../../../models/Aniversariante';

import { executeSaga } from '../../testUtils';

const pessoaNomeMock = 'Algum Nome Mockado';

const actionMock: PessoaAtualizaAction = {
    type: '',
    idFamilia: '',
    aniversariante: {
        idPessoa: '',
        pessoa: pessoaNomeMock,
        nascimento: new Date(),
    } as Aniversariante,
    error: '',
};

describe('PessoaAtualizaSaga', () => {
    test('verifica se os actions foram chamados corretamente', async () => {
        const responseMock = {
            data: {
                fields: {
                    pessoa: {
                        stringValue: pessoaNomeMock,
                    },
                },
            },
        };

        const atualizaPessoa = jest
            .spyOn(axios, 'patch')
            .mockImplementation(() => Promise.resolve(responseMock));

        const dispatched = await executeSaga(initAtualizaSaga, actionMock);

        expect(atualizaPessoa).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            atualizaStart(),
            atualizaSuccess({ pessoa: pessoaNomeMock }),
        ]);

        atualizaPessoa.mockClear();
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

        const atualizaPessoa = jest
            .spyOn(axios, 'patch')
            .mockImplementation(() => Promise.reject(responseMock));

        const dispatched = await executeSaga(initAtualizaSaga, actionMock);
        expect(atualizaPessoa).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([atualizaStart(), atualizaFail(mockError)]);

        atualizaPessoa.mockClear();
    });
});
