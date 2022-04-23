export const allMatches = [
	{
		id: 41,
		homeTeam: 16,
		homeTeamGoals: 2,
		awayTeam: 9,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: 'São Paulo'
		},
		teamAway: {
			teamName: 'Internacional'
		}
	},
	{
		id: 42,
		homeTeam: 6,
		homeTeamGoals: 1,
		awayTeam: 1,
		awayTeamGoals: 0,
		inProgress: false,
		teamHome: {
			teamName: 'Ferroviária'
		},
		teamAway: {
			teamName: 'Avaí/Kindermann'
		}
},
{
  id: 43,
  homeTeam: 11,
  homeTeamGoals: 0,
  awayTeam: 10,
  awayTeamGoals: 0,
  inProgress: true,
  teamHome: {
    teamName: 'Napoli-SC'
  },
  teamAway: {
    teamName: 'Minas Brasília'
  }
}]

export const allMatchesInProgress = [
	{
		id: 41,
		homeTeam: 16,
		homeTeamGoals: 2,
		awayTeam: 9,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: 'São Paulo'
		},
		teamAway: {
			teamName: 'Internacional'
		}
	},
	{
		id: 42,
		homeTeam: 6,
		homeTeamGoals: 1,
		awayTeam: 1,
		awayTeamGoals: 0,
		inProgress: true,
		teamHome: {
			teamName: 'Ferroviária'
		},
		teamAway: {
			teamName: 'Avaí/Kindermann'
		}
},
{
  id: 43,
  homeTeam: 11,
  homeTeamGoals: 0,
  awayTeam: 10,
  awayTeamGoals: 0,
  inProgress: true,
  teamHome: {
    teamName: 'Napoli-SC'
  },
  teamAway: {
    teamName: 'Minas Brasília'
  }
}]

export const allMatchesFinished = [
	{
		id: 41,
		homeTeam: 16,
		homeTeamGoals: 2,
		awayTeam: 9,
		awayTeamGoals: 0,
		inProgress: false,
		teamHome: {
			teamName: 'São Paulo'
		},
		teamAway: {
			teamName: 'Internacional'
		}
	},
	{
		id: 42,
		homeTeam: 6,
		homeTeamGoals: 1,
		awayTeam: 1,
		awayTeamGoals: 0,
		inProgress: false,
		teamHome: {
			teamName: 'Ferroviária'
		},
		teamAway: {
			teamName: 'Avaí/Kindermann'
		}
},
{
  id: 43,
  homeTeam: 11,
  homeTeamGoals: 0,
  awayTeam: 10,
  awayTeamGoals: 0,
  inProgress: false,
  teamHome: {
    teamName: 'Napoli-SC'
  },
  teamAway: {
    teamName: 'Minas Brasília'
  }
}]

export const requestCreateMatche = {
  homeTeam: 1, 
  awayTeam: 2, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
}

export const responseCreateMatche = {
  id: 1,
  homeTeam: 16, 
  awayTeam: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
}

export const equalTeamsResquest = {
  homeTeam: 2, 
  awayTeam: 2, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
}

export const notFoundTeam ={ 
  homeTeam: 1111111, 
  awayTeam: 2, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true
};
