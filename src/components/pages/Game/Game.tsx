import React, {
    FC, memo, useEffect,
} from 'react';
import { useCanvas } from './core/utils';
import Runner from './core';
import { useAppSelector } from 'store';
import './Game.scss';
import LeaderBoardService from 'api/Leaderboard';

export const Game: FC<any> = memo(({ username }) => {
    const [canvasRef] = useCanvas();

    const {
        user,
    } = useAppSelector((state) => state.base);

    useEffect(() => {
        if (canvasRef.current !== null) {
            // eslint-disable-next-line no-new
            new Runner(canvasRef.current, (value: number) => {
                LeaderBoardService.addScore({
                    data: {
                        username: user?.display_name ? user.display_name : user?.login,
                        score: value
                    },
                    ratingFieldName: "score",
                    teamName: "teamfive"
                })
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
        </>
    );
});
