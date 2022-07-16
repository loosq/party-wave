import React, {ButtonHTMLAttributes} from 'react';
import './Button.scss';

type ButtonPropsType = ButtonHTMLAttributes<unknown>;

export const Button: React.FC<ButtonPropsType> = React.memo(({className, ...restProps}) => (
    <button
        {...restProps}
        className={className || 'main-button'}
    />
));
