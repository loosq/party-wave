import React, { LinkHTMLAttributes } from 'react';
import './AltUrl.scss';

type Props = LinkHTMLAttributes<unknown>;

export const AltUrl: React.FC<Props> = React.memo((
    {
        className,
        ...restProps
    },
) => (
    <a
        {...restProps}
        className={className || 'alt-url'}
    />
));

export type LinkType = Props;
