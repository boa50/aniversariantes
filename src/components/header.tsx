import React from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CakeIcon from '@material-ui/icons/Cake';

import { AuthState } from '../models/AuthState';
import { PropertiesState } from '../models/PropertiesState';

import MenuAcoes from './menuAcoes';

const useStyles = makeStyles(theme => {
    return {
        menuButton: {
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(1),
            },
            [theme.breakpoints.up('sm')]: {
                marginRight: theme.spacing(2),
            },
        },
        title: {
            flexGrow: 1,
        },
        offset: theme.mixins.toolbar,
    };
});

const getTitulo = (familiaNome: string, title?: string) => {
    if (title) {
        return title;
    }

    if (familiaNome) {
        return 'Família ' + familiaNome;
    }

    return 'Aniversariantes';
};

type Props = {
    title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
    const classes = useStyles();

    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );
    const familiaNome = useSelector(
        (state: AuthState) => state.auth.familiaNome,
    );

    const titulo = getTitulo(familiaNome, title);

    return (
        <Box>
            <AppBar position="fixed">
                <Toolbar>
                    <Link to="/" style={{ color: 'inherit' }}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            data-testid="header-logo"
                        >
                            <CakeIcon />
                        </IconButton>
                    </Link>
                    <Typography
                        variant={isMobile ? 'subtitle1' : 'h6'}
                        component="h1"
                        className={classes.title}
                        data-testid="header-texto"
                    >
                        {titulo}
                    </Typography>
                    <MenuAcoes />
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </Box>
    );
};

export default Header;
