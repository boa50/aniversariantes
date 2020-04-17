import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'gatsby';

import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { AuthState } from '../models/AuthState';
import { initLogout } from '../store/actions';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();

    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const exibeBotao = idFamilia.length > 0;

    const onInitLogout = () => dispatch(initLogout());

    return exibeBotao ? (
        <Link to="/login" style={{ color: 'inherit' }} onClick={onInitLogout}>
            <IconButton edge="end" color="inherit" aria-label="logout">
                <ExitToAppIcon />
            </IconButton>
        </Link>
    ) : null;
};

export default LogoutButton;
