import React from "react";

export const SvgIcon = ({ name, width, height, className }: { name: string; width?: string; height?: string; className?: string }) => (
    <svg fill="none" width={width} height={height} className={className} viewBox={`0 0 ${width} ${height}`}>
        <use href={`#icon-${name}`}></use>
    </svg>
)