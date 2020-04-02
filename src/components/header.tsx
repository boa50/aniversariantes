import React, { useEffect } from 'react';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CakeIcon from '@material-ui/icons/Cake';
import ShareButton from '../components/shareButton';

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

type Props = {
    shareParams: { text: String };
};

const Header: React.FC<Props> = ({ shareParams }) => {
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
                    <ShareButton
                        config={{
                            params: shareParams,
                        }}
                    />
                </Toolbar>
            </AppBar>
            <div className={classes.offset} />
        </div>
    );
};

export default Header;
