import React from 'react';

export const SvgIcon = ({ name, sizes, className }:
  { name: string; sizes: number[]; className?: string }) => {
  const [width, height] = sizes;
  const viewBox = `0 0 ${width} ${height ?? width}`;

  return (
    <svg fill="none" width={width} height={height} className={className} viewBox={viewBox}>
      <use href={`#icon-${name}`} />
    </svg>
  );
};
