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

const ShareButton: React.FC<WebShareInterface> = ({ share }) => {
    const classes = useStyles();

    return (
        <Box className={classes.box} onClick={share}>
            <ShareIcon className={classes.shareIcon} /> {'Compartilhar'}
        </Box>
    );
};
export default webShare()(ShareButton);
