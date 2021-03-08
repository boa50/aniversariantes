import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { navigate } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import SearchBar from 'material-ui-search-bar';
import { List } from 'immutable';

import { Aniversariante } from '../models/Aniversariante';
import { AniversariantesState } from '../models/AniversariantesState';
import AniversariantesUtils from '../utils/aniversariantesUtils';
import DateUtils from '../utils/dateUtils';
import ListUtils from '../utils/listUtils';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    tableRow: {
        cursor: 'pointer',
    },
    columnAniversariantes: {
        width: '70%',
    },
    columnData: {
        width: '30%',
    },
}));

type ColumnProps = {
    id: string;
    dbname: string;
    label: string;
    mensal: boolean | undefined;
    classe: 'columnAniversariantes' | 'columnData';
};

const columns: ColumnProps[] = [
    {
        id: 'aniversariantes-nome',
        dbname: 'pessoa',
        label: 'Aniversariante',
        mensal: undefined,
        classe: 'columnAniversariantes',
    },
    {
        id: 'aniversariantes-dia',
        dbname: 'nascimento',
        label: 'Dia',
        mensal: true,
        classe: 'columnData',
    },
    {
        id: 'aniversariantes-nascimento',
        dbname: 'nascimento',
        label: 'Nascimento',
        mensal: false,
        classe: 'columnData',
    },
];

type Props = {
    mensal?: boolean;
};

const ListaAniversariantes: React.FC<Props> = ({ mensal = false }) => {
    const classes = useStyles();
    const aniversariantes = useSelector((state: AniversariantesState) =>
        mensal
            ? state.aniversariantes.aniversariantesMes
            : state.aniversariantes.aniversariantes,
    );

    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('');
    const [busca, setBusca] = useState<string>('');
    const [aniversariantesFiltrados, setAniversariantesFiltrados] = useState<
        List<Aniversariante>
    >(List<Aniversariante>());
    const [aniversariantesOrdenados, setAniversariantesOrdenados] = useState<
        List<Aniversariante>
    >(List<Aniversariante>());

    useEffect(() => {
        if (mensal) {
            setAniversariantesOrdenados(
                AniversariantesUtils.ordenaPorDiaNome(aniversariantes),
            );
        } else {
            setAniversariantesOrdenados(
                AniversariantesUtils.ordenaPorNomeNascimento(aniversariantes),
            );
        }
    }, [aniversariantes]);

    useEffect(() => {
        setAniversariantesFiltrados(aniversariantesOrdenados);
    }, [aniversariantesOrdenados]);

    const imprimeListaVazia = (): JSX.Element => (
        <Typography variant="h5" data-testid="sem-aniversariantes-mensagem">
            Sem aniversariantes {mensal ? `no mês` : `cadastrados`}
        </Typography>
    );

    const sortHandler = (property: string) => (event: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const rowClickHandler = (aniversariante: Aniversariante) => {
        navigate('/pessoaInformacoes/', {
            state: { aniversariante },
        });
    };

    const imprimeListaPreenchida = (): JSX.Element => {
        const searchHandler = (buscaValor: string) => {
            const filtrados = aniversariantesOrdenados.filter(linha => {
                return linha.pessoa
                    .toLowerCase()
                    .includes(buscaValor.toLowerCase());
            });
            setAniversariantesFiltrados(filtrados);
            setBusca(buscaValor);
        };

        const searchCancelHandler = () => {
            setBusca('');
            searchHandler('');
        };

        const ordenacao =
            mensal || orderBy === ''
                ? aniversariantesFiltrados
                : ListUtils.stableSort(
                      aniversariantesFiltrados,
                      ListUtils.getComparator(order, orderBy),
                  );

        const linhas = ordenacao.map((linha, index) => {
            return (
                <TableRow
                    hover={true}
                    key={index}
                    data-testid="aniversariantes-linha"
                    onClick={() => rowClickHandler(linha)}
                    className={classes.tableRow}
                >
                    <TableCell
                        className={classes.columnAniversariantes}
                        data-testid="aniversariante-nome"
                    >
                        {linha.pessoa}
                    </TableCell>
                    {mensal ? (
                        <TableCell
                            className={classes.columnData}
                            data-testid="aniversariante-dia"
                        >
                            {DateUtils.getDia(linha.nascimento)}
                        </TableCell>
                    ) : (
                        <TableCell
                            className={classes.columnData}
                            data-testid="aniversariante-nascimento"
                        >
                            {DateUtils.getDataCompleta(linha.nascimento)}
                        </TableCell>
                    )}
                </TableRow>
            );
        });

        return (
            <TableContainer
                className={classes.root}
                component={Paper}
                data-testid="aniversariantes-tabela"
            >
                {mensal ? null : (
                    <SearchBar
                        value={busca}
                        onChange={(buscaValor: string) =>
                            searchHandler(buscaValor)
                        }
                        onCancelSearch={() => searchCancelHandler()}
                        placeholder={'Busca'}
                        data-testid="aniversariantes-tabela-busca"
                    />
                )}
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(col =>
                                col.mensal === undefined ||
                                col.mensal === mensal ? (
                                    <TableCell
                                        key={col.id}
                                        className={classes[col.classe]}
                                        sortDirection={
                                            orderBy === col.dbname
                                                ? order
                                                : false
                                        }
                                        data-testid={`${col.id}-header`}
                                    >
                                        {mensal ? (
                                            col.label
                                        ) : (
                                            <TableSortLabel
                                                active={orderBy === col.dbname}
                                                direction={
                                                    orderBy === col.dbname
                                                        ? order
                                                        : 'asc'
                                                }
                                                onClick={sortHandler(
                                                    col.dbname,
                                                )}
                                                data-testid={`${col.id}-sortLabel`}
                                            >
                                                {col.label}
                                            </TableSortLabel>
                                        )}
                                    </TableCell>
                                ) : null,
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>{linhas}</TableBody>
                </Table>
            </TableContainer>
        );
    };

    if (aniversariantes.length === 0) {
        return imprimeListaVazia();
    } else {
        return imprimeListaPreenchida();
    }
};

export default ListaAniversariantes;
