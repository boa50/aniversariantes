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
        type: 'date' | 'string',
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
            default:
                fieldValue = '';
        }

        return fieldValue;
    },

    getAniversarianteNome: (document: Document): string => {
        return DbUtils.getDocumentField(document, 'pessoa', 'string');
    },

    getAniversarianteNascimento: (document: Document): Date => {
        return DbUtils.getDocumentField(document, 'nascimento', 'date');
    },
};

export default DbUtils;
