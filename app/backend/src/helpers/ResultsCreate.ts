import { ITeamsGames, Principals } from '../interfaces/helpers';

export const teamWins = (teamGames: ITeamsGames[], side: Principals) => {
  const outherSide = side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

  const wins = teamGames.reduce((acc: number[], cur) => {
    if (cur[side] > cur[outherSide]) {
      acc.push(3);
    }

    return acc;
  }, []);

  return wins;
};

export const teamLose = (teamGames: ITeamsGames[], side: Principals) => {
  const outherSide = side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

  const loses = teamGames.reduce((acc: number[], cur) => {
    if (cur[side] < cur[outherSide]) {
      acc.push(0);
    }

    return acc;
  }, []);

  return loses;
};

export const teamDraw = (teamGames: ITeamsGames[], side: Principals) => {
  const outherSide = side.includes('home') ? 'awayTeamGoals' : 'homeTeamGoals';

  const draw = teamGames.reduce((acc: number[], cur) => {
    if (cur[side] === cur[outherSide]) {
      acc.push(1);
    }

    return acc;
  }, []);

  return draw;
};
