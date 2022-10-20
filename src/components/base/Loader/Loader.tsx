import React from 'react';
import bemCn from 'libs/bemCn';

import './Loader.scss';

type Props = {
    className?: string;
};

const bemBlock = bemCn('loader');

export const Loader = ({className}: Props) => (
    <div className={bemBlock(null, className)} />
);
