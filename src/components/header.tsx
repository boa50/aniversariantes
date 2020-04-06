import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CakeIcon from '@material-ui/icons/Cake';

import AniversariantesUtils from '../utils/aniversariantesUtils';
import { AniversariantesState } from '../models/AniversariantesState';

const ShareButton = React.lazy(() => {
    return import('../components/shareButton');
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
}));

const Header: React.FC = () => {
    const classes = useStyles();
    const isSSR = typeof window === 'undefined';

    const aniversariantes = useSelector(
        (state: AniversariantesState) => state.aniversariantesMes,
    );
    const mes = useSelector((state: AniversariantesState) => state.mes);

    const shareParams = {
        text: AniversariantesUtils.getAniversariantesShare(
            aniversariantes,
            mes,
        ),
    };

    console.log(shareParams);

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
                        variant="h6"
                        className={classes.title}
                        data-testid="header-texto"
                    >
                        Aniversariantes
                    </Typography>
                    {!isSSR && (
                        <Suspense fallback={<div />}>
                            <ShareButton
                                config={{
                                    params: shareParams,
                                }}
                            />
                        </Suspense>
                    )}
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
};

export default Header;
