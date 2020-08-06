import React from 'react';
import webShare, { WebShareInterface } from 'react-web-share-api';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => {
    return {
        shareIcon: {
            marginRight: theme.spacing(2),
        },
        box: {
            color: 'inherit',
            alignItems: 'center',
            display: 'flex',
        },
    };
});

type Props = {
    onClick?:
        | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
        | undefined;
};

export const Placeholder: React.FC<Props> = ({ onClick = undefined }) => {
    const classes = useStyles();

    return (
        <Box className={classes.box} onClick={onClick}>
            <ShareIcon className={classes.shareIcon} /> {'Compartilhar'}
        </Box>
    );
};

const ShareButton: React.FC<WebShareInterface> = ({ share }) => {
    return <Placeholder onClick={share} />;
};
export default webShare()(ShareButton);
