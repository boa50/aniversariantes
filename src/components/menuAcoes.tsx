import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import webShare, { WebShareInterface } from 'react-web-share-api';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { AuthState } from '../models/AuthState';
import { PropertiesState } from '../models/PropertiesState';

import { initLogout } from '../store/actions';

import MenuButton from './menuButton';
import ShareAniversariantesButton from './shareAniversariantesButton';

const useStyles = makeStyles(theme => {
    return {
        buttonSpacing: {
            marginLeft: theme.spacing(2),
        },
    };
});

const MenuAcoes: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [showShare, setShowShare] = React.useState(false);
    const HandleShareShow: React.FC<WebShareInterface> = ({ isSupported }) => {
        if (isSupported) {
            setShowShare(true);
        }
        return null;
    };
    const CheckShare = webShare()(HandleShareShow);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);

    const exibeMenu = idFamilia.length > 0;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onInitLogout = () => dispatch(initLogout());
    const logoutButton = (
        <MenuButton
            link="/login"
            textMobile="Sair"
            Icon={ExitToAppIcon}
            onClick={onInitLogout}
        />
    );

    const cadastroButton = (
        <MenuButton
            link="/pessoaCadastro"
            textMobile="Cadastrar"
            Icon={PersonAddIcon}
        />
    );

    let telaAniversariantes = false;
    const isSSR = typeof window === 'undefined';
    if (!isSSR) {
        telaAniversariantes = !location.pathname.startsWith('/pessoaCadastro');
    }

    let conteudo = (
        <Box>
            {telaAniversariantes ? cadastroButton : null}
            <span className={classes.buttonSpacing} />
            {logoutButton}
        </Box>
    );
    if (isMobile && exibeMenu) {
        conteudo = (
            <Box>
                <CheckShare />
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                    data-testid="dot-menu"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    data-testid="dot-menu-opened"
                >
                    {telaAniversariantes ? (
                        <MenuItem
                            key="cadastrar"
                            color="inherit"
                            aria-label="cadastrar"
                        >
                            {cadastroButton}
                        </MenuItem>
                    ) : null}

                    {showShare && telaAniversariantes ? (
                        <MenuItem
                            key="share"
                            color="inherit"
                            aria-label="share"
                            data-testid="share-button-menu"
                        >
                            <ShareAniversariantesButton />
                        </MenuItem>
                    ) : null}

                    <MenuItem key="logout" color="inherit" aria-label="logout">
                        {logoutButton}
                    </MenuItem>
                </Menu>
            </Box>
        );
    }

    return conteudo;
};

export default MenuAcoes;
