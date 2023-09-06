import React from 'react';
import {ActionIcon} from '@mantine/core';


const ActionButton = ({data, icon, onClick, title = '', color = 'primary', sx}) => {
    const onClickButton = (e) => {
        e.stopPropagation();
        onClick(data)
    };
    return <ActionIcon onClick={onClickButton} color={color} title={title} sx={sx}>{ icon }</ActionIcon>
};

export default ActionButton;