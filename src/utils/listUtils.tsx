import { List } from 'immutable';

import { Aniversariante } from '../models/Aniversariante';

const ListUtils = {
    descendingComparator: (a: any, b: any, orderBy: string): number => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    },

    getComparator: (order: 'asc' | 'desc', orderBy: string): Function => {
        return order === 'desc'
            ? (a: {}, b: {}) => ListUtils.descendingComparator(a, b, orderBy)
            : (a: {}, b: {}) => -ListUtils.descendingComparator(a, b, orderBy);
    },

    stableSort: (
        array: List<Aniversariante>,
        comparator: Function,
    ): List<Aniversariante> => {
        const arrayMapeado: any[] = [];
        array.map((el: any, index: number) => arrayMapeado.push([el, index]));

        arrayMapeado.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });

        const listaOrdenada: List<any> = List(arrayMapeado);
        return listaOrdenada.map(el => el[0]) as List<Aniversariante>;
    },
};

export default ListUtils;
