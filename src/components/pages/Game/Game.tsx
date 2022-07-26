import React, {
    FC, memo, useEffect, useState,
} from 'react';
import { useCanvas } from './core/utils';
import Runner from './core';

import './Game.scss';

export const Game: FC<unknown> = memo(() => {
    const [canvasRef] = useCanvas();
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (canvasRef.current !== null) {
            // eslint-disable-next-line no-new
            new Runner(canvasRef.current, (value: number) => {
                setScore(value);
            });
        }
    }, []);

    const css = `
    .navigation{
      display: none;
    }

    .container {
      max-width: 100% !important;
      padding: 0 !important;
    }`;

    return (
        <>
            <style>{css}</style>
            {/* временно фикс */}
            <div className='game'>
                <canvas ref={canvasRef} />
            </div>
            {
                console.log(score)
            }
        </>
    );
});
