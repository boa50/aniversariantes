import React from 'react';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CakeIcon from '@material-ui/icons/Cake';

import LogoutButton from './logoutButton';
import ShareAniversariantesButton from './shareAniversariantesButton';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    shareButton: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
}));

const Header: React.FC = () => {
    const classes = useStyles();

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
