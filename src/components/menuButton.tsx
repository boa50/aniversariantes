import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';

import { AuthState } from '../models/AuthState';
import { PropertiesState } from '../models/PropertiesState';

const useStyles = makeStyles(theme => {
    return {
        menuButton: {
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

type Props = {
    link: string;
    textMobile: string;
    Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const MenuButton: React.FC<Props> = ({ link, textMobile, Icon, onClick }) => {
    const classes = useStyles();

    const isMobile = useSelector(
        (state: PropertiesState) => state.properties.isMobile,
    );
    const idFamilia = useSelector((state: AuthState) => state.auth.idFamilia);

    const exibeBotao = idFamilia.length > 0;

    const dataTestId = textMobile + '-menu-button';

    return exibeBotao ? (
        <Link to={link} className={classes.link} onClick={onClick}>
            {isMobile ? (
                <Box className={classes.div}>
                    <Icon
                        className={classes.menuButton}
                        data-testid={dataTestId}
                    />{' '}
                    {textMobile}
                </Box>
            ) : (
                <IconButton edge="end" color="inherit" aria-label={textMobile}>
                    <Icon data-testid={dataTestId} />
                </IconButton>
            )}
        </Link>
    ) : null;
};

export default MenuButton;
