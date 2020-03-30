import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import { Aniversariante } from '../models/Aniversariante';
import AniversariantesUtils from '../utils/aniversariantesUtils';

const useStyles = makeStyles(theme => ({
    alertIcon: {
        marginRight: theme.spacing(1),
    },
    card: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        paddingTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
}));

type Props = {
    aniversariantes: Aniversariante[];
};

const AniversariantesDia: React.FC<Props> = ({ aniversariantes }) => {
    const classes = useStyles();
    const [aniversariantesDia, setAniversariantesDia] = useState<
        Aniversariante[]
    >([]);

    useEffect(() => {
        const pessoasDia = AniversariantesUtils.getAniversariantesDia(
            aniversariantes,
        );

        setAniversariantesDia(pessoasDia);
    }, [aniversariantes]);

    const quantidadeAniversariantes = aniversariantesDia.length;

    const texto = aniversariantesDia.map((linha, index): string => {
        if (index < quantidadeAniversariantes - 1) {
            return linha.pessoa + ', ';
        } else {
            return linha.pessoa;
        }
    });

    if (quantidadeAniversariantes > 0) {
        return (
            <Grid item sm={12} md={8} lg={5}>
                <Card className={classes.card}>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <NotificationsActiveIcon
                                data-testid="aniversariante-icone"
                                className={classes.alertIcon}
                            />
                            <Typography
                                component="span"
                                variant="body2"
                                data-testid="aniversariante-texto"
                            >
                                <strong>Hoje a festa é para: </strong>
                                {texto}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        );
    } else {
        return <div />;
    }
};

export default AniversariantesDia;
