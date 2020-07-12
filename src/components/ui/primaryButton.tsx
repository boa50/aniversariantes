import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
    id: string;
    label: string;
};

const PrimaryButton: React.FC<Props> = ({ id, label }) => {
    return (
        <Button
            id={id}
            variant="contained"
            color="secondary"
            type="submit"
            data-testid={id + '-button'}
        >
            {label}
        </Button>
    );
};

export default PrimaryButton;
