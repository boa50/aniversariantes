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
}));

const ListaAniversariantes: React.FC = () => {
    const classes = useStyles();
    const aniversariantes = useSelector(
        (state: AniversariantesState) =>
            state.aniversariantes.aniversariantesMes,
    );

    const imprimeListaVazia = (): JSX.Element => (
        <Typography variant="h5" data-testid="sem-aniversariantes-mensagem">
            Sem aniversariantes no mês
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
        const aniversariantesOrdenados = AniversariantesUtils.ordenaPorDiaNome(
            aniversariantes,
        );

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
                    <TableCell data-testid="aniversariante-nome">
                        {linha.pessoa}
                    </TableCell>
                    <TableCell data-testid="aniversariante-dia">
                        {DateUtils.getDia(linha.nascimento)}
                    </TableCell>
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
                            <TableCell data-testid="aniversariantes-nome-header">
                                Aniversariante
                            </TableCell>
                            <TableCell data-testid="aniversariantes-dia-header">
                                Dia
                            </TableCell>
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
