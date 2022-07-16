import React, {LinkHTMLAttributes} from 'react';
import './AltUrl.scss';

type AltUrlPropsType = LinkHTMLAttributes<unknown>;

export const AltUrl: React.FC<AltUrlPropsType> = React.memo(({className, ...restProps}) => (
    <a
        {...restProps}
        className={className || 'alt-url'}
    />
));

export type LinkType = AltUrlPropsType;
