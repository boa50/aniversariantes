import { PessoaCadastroAction } from '../models/PessoaCadastroAction';
import { PessoaAtualizaAction } from '../models/PessoaAtualizaAction';

type Document = {
    name: string;
    fields: any;
};

const DbUtils = {
    getDocumentId: (document: Document): string => {
        const nameSplit: string[] = document.name.split('/');
        const id: string = nameSplit[nameSplit.length - 1];

        return id;
    },

    getDocumentField: (
        document: Document,
        field: string,
        type: 'date' | 'string' | 'reference',
    ): any => {
        let fieldValue;

        switch (type) {
            case 'date':
                const timestampValue: string =
                    document.fields[field].timestampValue;
                fieldValue = new Date(timestampValue);
                break;
            case 'string':
                fieldValue = document.fields[field].stringValue;
                break;
            case 'reference':
                if (document.fields[field] !== undefined) {
                    fieldValue = document.fields[field].referenceValue;
                } else {
                    fieldValue = '';
                }
                break;
        }

        return fieldValue;
    },

    getAniversarianteNome: (document: Document): string => {
        return DbUtils.getDocumentField(document, 'pessoa', 'string');
    },

    getAniversarianteNascimento: (document: Document): Date => {
        return DbUtils.getDocumentField(document, 'nascimento', 'date');
    },

    getIdPais: (document: Document, pessoa: 'pai' | 'mae'): string => {
        const reference: string = DbUtils.getDocumentField(
            document,
            pessoa,
            'reference',
        );

        if (reference === '') {
            return '';
        } else {
            const nameSplit: string[] = reference.split('/');
            const id: string = nameSplit[nameSplit.length - 1];
            return id;
        }
    },

    mountReferenceField: (
        baseURL: string | undefined,
        idFamilia: string,
        idPessoa: string,
    ): string => {
        let url = '';
        if (baseURL !== undefined) {
            url = baseURL;
        }

        const urlSplit = url.split('/');
        let base = '';

        for (let i = 4; i < urlSplit.length; i++) {
            base = base + '/' + urlSplit[i];
        }

        base = base.substring(1);

        return `${base}${idFamilia}/aniversariantes/${idPessoa}`;
    },

    mountPayload: (
        baseURL: string | undefined,
        action: PessoaCadastroAction | PessoaAtualizaAction,
    ): any => {
        const payload: any = {
            fields: {
                pessoa: {
                    stringValue: action.aniversariante.pessoa,
                },
                nascimento: {
                    timestampValue: action.aniversariante.nascimento,
                },
            },
        };

        const mountField = (field: string): string => {
            return DbUtils.mountReferenceField(
                baseURL,
                action.idFamilia,
                field,
            );
        };

        if (action.aniversariante.idPai !== '') {
            payload.fields['pai'] = {
                referenceValue: mountField(action.aniversariante.idPai),
            };
        }

        if (action.aniversariante.idMae !== '') {
            payload.fields['mae'] = {
                referenceValue: mountField(action.aniversariante.idMae),
            };
        }

        return payload;
    },
};

export default DbUtils;
