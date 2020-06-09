import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';

import { AuthState } from '../models/AuthState';
import { AniversariantesState } from '../models/AniversariantesState';
import { PropertiesState } from '../models/PropertiesState';
import { initLogout } from '../store/actions';

const useStyles = makeStyles(theme => {
    return {
        logoutButton: {
            marginRight: theme.spacing(2),
        },
        link: {
            color: 'inherit',
            textDecoration: 'none',
        },
        div: {
            color: 'inherit',
            alignItems: 'center',
            display: 'flex',
        },
    };
});

const LogoutButton: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const loading = useSelector(
        (state: AniversariantesState) => state.aniversariantes.loading,
    );
    const exibeBotao = !loading && idFamilia.length > 0;

    const onInitLogout = () => dispatch(initLogout());

    return exibeBotao ? (
        <Link to="/login" className={classes.link} onClick={onInitLogout}>
            {isMobile ? (
                <Box className={classes.div}>
                    <ExitToAppIcon
                        className={classes.logoutButton}
                        data-testid="logout-botao"
                    />{' '}
                    {'Sair'}
                </Box>
            ) : (
                <IconButton edge="end" color="inherit" aria-label="logout">
                    <ExitToAppIcon data-testid="logout-botao" />
                </IconButton>
            )}
        </Link>
    ) : null;
};

export default LogoutButton;