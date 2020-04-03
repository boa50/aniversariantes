import React from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { Aniversariante } from '../models/Aniversariante';
import AniversariantesUtils from '../utils/aniversariantesUtils';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

type Props = {
    aniversariantes: Aniversariante[];
};

const ListaAniversariantes: React.FC<Props> = ({ aniversariantes }) => {
    const classes = useStyles();

    const imprimeListaVazia = (): JSX.Element => (
        <Typography variant="h5" data-testid="sem-aniversariantes-mensagem">
            Sem aniversariantes no mês
        </Typography>
    );

    const imprimeListaPreenchida = (
        aniversariantes: Aniversariante[],
    ): JSX.Element => {
        const aniversariantesOrdenados = AniversariantesUtils.ordenaPorDia(
            aniversariantes,
        );

        const linhas = aniversariantesOrdenados.map((linha, index) => {
            return (
                <TableRow key={index} data-testid="aniversariantes-linha">
                    <TableCell data-testid="aniversariante-nome">
                        {linha.pessoa}
                    </TableCell>
                    <TableCell data-testid="aniversariante-dia">
                        {linha.dia}
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
