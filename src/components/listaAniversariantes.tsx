import React from 'react';
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
import Paper from '@material-ui/core/Paper';

import { Aniversariante } from '../models/Aniversariante';
import { AniversariantesState } from '../models/AniversariantesState';
import AniversariantesUtils from '../utils/aniversariantesUtils';
import DateUtils from '../utils/dateUtils';

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

    const imprimeListaVazia = (): JSX.Element => (
        <Typography variant="h5" data-testid="sem-aniversariantes-mensagem">
            Sem aniversariantes {mensal ? `no mês` : `cadastrados`}
        </Typography>
    );

    const rowClickHandler = (
        idPessoa: String,
        nome: String,
        nascimento: Date,
    ) => {
        navigate('/pessoaInformacoes/', {
            state: { idPessoa, nome, nascimento },
        });
    };

    const imprimeListaPreenchida = (
        aniversariantes: Aniversariante[],
    ): JSX.Element => {
        const aniversariantesOrdenados = mensal
            ? AniversariantesUtils.ordenaPorDiaNome(aniversariantes)
            : AniversariantesUtils.ordenaPorNomeNascimento(aniversariantes);

        const linhas = aniversariantesOrdenados.map((linha, index) => {
            return (
                <TableRow
                    hover={true}
                    key={index}
                    data-testid="aniversariantes-linha"
                    onClick={() =>
                        rowClickHandler(
                            linha.idPessoa,
                            linha.pessoa,
                            linha.nascimento,
                        )
                    }
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                className={classes.columnAniversariantes}
                                data-testid="aniversariantes-nome-header"
                            >
                                Aniversariante
                            </TableCell>
                            {mensal ? (
                                <TableCell
                                    className={classes.columnData}
                                    data-testid="aniversariantes-dia-header"
                                >
                                    Dia
                                </TableCell>
                            ) : (
                                <TableCell
                                    className={classes.columnData}
                                    data-testid="aniversariantes-nascimento-header"
                                >
                                    Nascimento
                                </TableCell>
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
        return imprimeListaPreenchida(aniversariantes);
    }
};

export default ListaAniversariantes;
