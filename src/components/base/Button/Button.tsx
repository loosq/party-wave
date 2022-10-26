import React, { ButtonHTMLAttributes } from 'react';
import './Button.scss';

type Props = ButtonHTMLAttributes<unknown>;

export const Button: React.FC<Props> = React.memo((
    {
        className,
        ...restProps
    },
) => (
    <button
        {...restProps}
        className={className || 'main-button'}
        data-testid='button'
    />
));
