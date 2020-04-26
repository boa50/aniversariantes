import React from 'react';
import { Link } from 'gatsby';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CakeIcon from '@material-ui/icons/Cake';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { AuthState } from '../models/AuthState';
import { AniversariantesState } from '../models/AniversariantesState';

import MenuAcoes from './menuAcoes';

const useStyles = makeStyles(theme => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            [theme.breakpoints.down('sm')]: {
                marginRight: theme.spacing(0),
            },
            [theme.breakpoints.up('sm')]: {
                marginRight: theme.spacing(2),
            },
        },
        title: {
            flexGrow: 1,
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
        },
        offset: theme.mixins.toolbar,
    };
});

const Header: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const familiaNome = useSelector(
        (state: AuthState) => state.auth.familiaNome,
    );
    const loading = useSelector(
        (state: AniversariantesState) => state.aniversariantes.loading,
    );

    return (
        <div className={classes.root}>
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
                        Aniversariantes
                        {!loading && familiaNome
                            ? ' - Família ' + familiaNome
                            : null}
                    </Typography>
                    <MenuAcoes isMobile={isMobile} />
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
};

export default Header;
