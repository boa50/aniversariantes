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
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { List } from 'immutable';

import { Aniversariante } from '../models/Aniversariante';
import { AniversariantesState } from '../models/AniversariantesState';
import { PropertiesState } from '../models/PropertiesState';

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
    columnIcon: {
        width: '10%',
        padding: '8px',
        paddingRight: '0',
    },
    columnAniversariantes: {
        width: '70%',
    },
    columnPessoa: {
        width: '30%',
    },
    columnData: {
        width: '30%',
    },
    collapsedTitle: {
        fontWeight: 500,
    },
}));

type ColumnProps = {
    id: string;
    dbname: string;
    label: string;
    mensal: boolean | undefined;
    mobile: boolean | undefined;
    classe: 'columnAniversariantes' | 'columnData' | 'columnPessoa';
};

const columns: ColumnProps[] = [
    {
        id: 'aniversariantes-nome',
        dbname: 'pessoa',
        label: 'Aniversariante',
        mensal: true,
        mobile: undefined,
        classe: 'columnAniversariantes',
    },
    {
        id: 'aniversariantes-nome',
        dbname: 'pessoa',
        label: 'Aniversariante',
        mensal: false,
        mobile: undefined,
        classe: 'columnPessoa',
    },
    {
        id: 'aniversariantes-pai',
        dbname: 'paiNome',
        label: 'Pai',
        mensal: false,
        mobile: false,
        classe: 'columnPessoa',
    },
    {
        id: 'aniversariantes-mae',
        dbname: 'maeNome',
        label: 'Mãe',
        mensal: false,
        mobile: false,
        classe: 'columnPessoa',
    },
    {
        id: 'aniversariantes-dia',
        dbname: 'nascimento',
        label: 'Dia',
        mensal: true,
        mobile: undefined,
        classe: 'columnData',
    },
    {
        id: 'aniversariantes-nascimento',
        dbname: 'nascimento',
        label: 'Nascimento',
        mensal: false,
        mobile: undefined,
        classe: 'columnData',
    },
];

type Props = {
    mensal?: boolean;
};

const Linha = (props: {
    linha: Aniversariante;
    classes: any;
    mensal: boolean;
    isMobile: boolean;
    rowClickHandler: Function;
}) => {
    const [open, setOpen] = useState(false);
    const { linha, classes, mensal, isMobile, rowClickHandler } = props;

    return (
        <React.Fragment>
            <TableRow
                hover={true}
                data-testid="aniversariantes-linha"
                className={classes.tableRow}
            >
                {!mensal && isMobile ? (
                    <TableCell className={classes.columnIcon}>
                        <IconButton
                            aria-label="expand row"
                            data-testid="aniversariantes-linha-expand"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <KeyboardArrowUpIcon data-testid="aniversariantes-linha-expand-up" />
                            ) : (
                                <KeyboardArrowDownIcon data-testid="aniversariantes-linha-expand-down" />
                            )}
                        </IconButton>
                    </TableCell>
                ) : null}
                <TableCell
                    className={
                        mensal
                            ? classes.columnAniversariantes
                            : classes.columnPessoa
                    }
                    data-testid="aniversariante-nome"
                    onClick={() => rowClickHandler(linha)}
                >
                    {linha.pessoa}
                </TableCell>
                {!mensal && !isMobile ? (
                    <React.Fragment>
                        <TableCell
                            className={classes.columnPessoa}
                            data-testid="aniversariante-pai"
                            onClick={() => rowClickHandler(linha)}
                        >
                            {linha.paiNome}
                        </TableCell>
                        <TableCell
                            className={classes.columnPessoa}
                            data-testid="aniversariante-mae"
                            onClick={() => rowClickHandler(linha)}
                        >
                            {linha.maeNome}
                        </TableCell>
                    </React.Fragment>
                ) : null}
                {mensal ? (
                    <TableCell
                        className={classes.columnData}
                        data-testid="aniversariante-dia"
                        onClick={() => rowClickHandler(linha)}
                    >
                        {DateUtils.getDia(linha.nascimento)}
                    </TableCell>
                ) : (
                    <TableCell
                        className={classes.columnData}
                        data-testid="aniversariante-nascimento"
                        onClick={() => rowClickHandler(linha)}
                    >
                        {DateUtils.getDataCompleta(linha.nascimento)}
                    </TableCell>
                )}
            </TableRow>
            {!mensal && isMobile ? (
                <TableRow data-testid="aniversariantes-linha-hidden">
                    <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={3}
                    >
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Box margin={1}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.collapsedTitle}
                                    >
                                        Pai:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {' ' + linha.paiNome}
                                    </Typography>
                                </Box>
                                <Box margin={1}>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        className={classes.collapsedTitle}
                                    >
                                        Mãe:
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                    >
                                        {' ' + linha.maeNome}
                                    </Typography>
                                </Box>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            ) : null}
        </React.Fragment>
    );
};

const ListaAniversariantes: React.FC<Props> = ({ mensal = false }) => {
    const classes = useStyles();
    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );
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
        const paisPreenchidos: Aniversariante[] = [];

        aniversariantes.map((aniversariante: Aniversariante) => {
            const pai = AniversariantesUtils.getAniversariantePorId(
                aniversariantes,
                aniversariante.idPai,
            ).pessoa;
            const mae = AniversariantesUtils.getAniversariantePorId(
                aniversariantes,
                aniversariante.idMae,
            ).pessoa;

            paisPreenchidos.push({
                ...aniversariante,
                paiNome: pai,
                maeNome: mae,
            });
        });

        if (mensal) {
            setAniversariantesOrdenados(
                AniversariantesUtils.ordenaPorDiaNome(paisPreenchidos),
            );
        } else {
            setAniversariantesOrdenados(
                AniversariantesUtils.ordenaPorNomeNascimento(paisPreenchidos),
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
                return (linha.pessoa + linha.paiNome + linha.maeNome)
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

        const linhas = ordenacao.map((linha, index) => (
            <Linha
                key={index}
                linha={linha}
                classes={classes}
                mensal={mensal}
                isMobile={isMobile}
                rowClickHandler={rowClickHandler}
            />
        ));

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
                            {!mensal && isMobile ? (
                                <TableCell className={classes.columnIcon} />
                            ) : null}
                            {columns.map(col =>
                                (col.mobile === undefined ||
                                    col.mobile === isMobile) &&
                                (col.mensal === undefined ||
                                    col.mensal === mensal) ? (
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
