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

import LogoutButton from './logoutButton';
import ShareAniversariantesButton from './shareAniversariantesButton';

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
        shareButton: {
            marginRight: theme.spacing(1),
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
    const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

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
                        variant={isBigScreen ? 'h6' : 'subtitle1'}
                        component="h1"
                        className={classes.title}
                        data-testid="header-texto"
                    >
                        Aniversariantes
                        {!loading && familiaNome
                            ? ' - Família ' + familiaNome
                            : null}
                    </Typography>
                    <ShareAniversariantesButton
                        className={classes.shareButton}
                    />
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
};

export default Header;
