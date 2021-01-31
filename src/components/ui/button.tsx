import React from 'react';

import MaterialButton from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

type Props = {
    id: string;
    label: string;
    disabled?: boolean;
    type?: 'primary' | 'secondary';
    icon?: 'save' | 'edit';
    btnType?: 'button' | 'submit' | 'reset';
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button: React.FC<Props> = ({
    id,
    label,
    disabled = false,
    type = 'primary',
    icon,
    btnType = 'submit',
    onClick,
}) => {
    let color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
    if (type === 'primary') {
        color = 'secondary';
    } else {
        color = 'default';
    }

    let iconClass = null;
    switch (icon) {
        case 'save':
            iconClass = <SaveIcon />;
            break;
        case 'edit':
            iconClass = <EditIcon />;
            break;
    }

    return (
        <MaterialButton
            id={id}
            variant="contained"
            color={color}
            size="large"
            type={btnType}
            data-testid={id + '-button'}
            disabled={disabled}
            startIcon={iconClass}
            onClick={onClick}
        >
            {label}
        </MaterialButton>
    );
};

export default Button;
