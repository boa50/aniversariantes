import React from 'react';
import webShare, { WebShareInterface } from 'react-web-share-api';

import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';

const ShareButton: React.FC<WebShareInterface> = ({ share, isSupported }) =>
    isSupported ? (
        <IconButton
            edge="end"
            color="inherit"
            onClick={share}
            aria-label="share"
        >
            <ShareIcon />
        </IconButton>
    ) : null;

export default webShare()(ShareButton);
