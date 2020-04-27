import React from 'react';
import { useSelector } from 'react-redux';
import webShare, { WebShareInterface } from 'react-web-share-api';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

import { AuthState } from '../models/AuthState';
import { AniversariantesState } from '../models/AniversariantesState';

import LogoutButton from './logoutButton';
import ShareAniversariantesButton from './shareAniversariantesButton';

type Props = {
    isMobile?: boolean;
};

let showShare = false;
const HandleShareShow: React.FC<WebShareInterface> = ({ isSupported }) => {
    if (isSupported) {
        showShare = true;
    }
    return null;
};

const CheckShare = webShare()(HandleShareShow);

const MenuAcoes: React.FC<Props> = ({ isMobile }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);
    const loading = useSelector(
        (state: AniversariantesState) => state.aniversariantes.loading,
    );

    const exibeMenu = !loading && idFamilia.length > 0;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let conteudo = <LogoutButton />;
    if (isMobile && exibeMenu) {
        conteudo = (
            <div>
                <CheckShare />
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                >
                    {showShare ? (
                        <MenuItem
                            key="share"
                            color="inherit"
                            aria-label="share"
                        >
                            <ShareAniversariantesButton />
                        </MenuItem>
                    ) : null}

                    <MenuItem key="logout" color="inherit" aria-label="logout">
                        <LogoutButton isMobile />
                    </MenuItem>
                </Menu>
            </div>
        );
    }

    return conteudo;
};

export default MenuAcoes;
