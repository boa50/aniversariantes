import React from 'react';

import Button from '@material-ui/core/Button';

type Props = {
    id: string;
    label: string;
    disabled?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ id, label, disabled = false }) => {
    return (
        <Button
            id={id}
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            data-testid={id + '-button'}
            disabled={disabled}
        >
            {label}
        </Button>
    );
};

export default PrimaryButton;
