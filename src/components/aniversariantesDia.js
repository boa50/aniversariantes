import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import AniversariantesService from '../services/aniversariantes';

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

const AniversariantesDia = () => {
    const classes = useStyles();

    const aniversariantes = AniversariantesService.ListaAniversariantesDia();
    const quantidadeAniversariantes = aniversariantes.length;

    const texto = aniversariantes.map((linha, index) => {
        if (index < quantidadeAniversariantes - 1) {
            return linha.pessoa + ', ';
        } else {
            return linha.pessoa;
        }
    });

    if (quantidadeAniversariantes > 0) {
        return (
            <Grid sm={12} md={8} lg={5}>
                <Card className={classes.card}>
                    <CardContent>
                        <Box display="flex" alignItems="center">
                            <NotificationsActiveIcon
                                className={classes.alertIcon}
                            />
                            <Typography component="span">
                                <strong>Hoje a festa é para: </strong>
                                {texto}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        );
    } else {
        return '';
    }
};

export default AniversariantesDia;
