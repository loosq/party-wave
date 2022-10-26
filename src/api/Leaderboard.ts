import { API } from "./API";

export interface LeaderBoard {
    data: Object,
    ratingFieldName: string,
    teamName: string,
};

export interface LeaderBoardAny {
    ratingFieldName: string,
    cursor: number,
    limit: number,
};

const addScore = async (data: LeaderBoard) => {
    return await API.postMethod('/leaderboard', data).then(res => res.data);
};

// const leaderboardAll = async (data: LeaderBoardAny) => {
//     return await API.post('/leaderboard/all', data).then(res => res.data);
// };

const getAll = async (data: LeaderBoardAny) => {
    return await API.post('/leaderboard/teamfive', data).then(res => res.data);
};

const LeaderBoardService = {
    addScore,
    // leaderboardAll,
    getAll,
};

export default LeaderBoardService;