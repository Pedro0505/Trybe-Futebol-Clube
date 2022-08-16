export const matchesHome = [
	{
		id: 1,
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
		id: 2,
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
  id: 3,
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
}];

export const teamsHome = [
  {
    id: 11,
    teamName: 'Napoli-SC'
  },
  {
    id: 16,
    teamName: 'São Paulo'
  },
  {
    id: 6,
    teamName: 'Ferroviária'
  }
];

export const leaderboardHomeResult = [
  {
    name: 'São Paulo',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'Ferroviária',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 0,
    goalsBalance: 1,
    efficiency: 100
  },
  {
    name: 'Napoli-SC',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 33.33
  }
]; 

export const matchesAway = [
  {
		id: 1,
		homeTeam: 1,
		homeTeamGoals: 0,
		awayTeam: 12,
		awayTeamGoals: 3,
		inProgress: false,
		teamHome: {
			teamName: 'Avaí/Kindermann'
		},
		teamAway: {
			teamName: 'Palmeiras'
		}
	},
	{
		id: 2,
		homeTeam: 2,
		homeTeamGoals: 0,
		awayTeam: 9,
		awayTeamGoals: 2,
		inProgress: false,
		teamHome: {
			teamName: 'Bahia'
		},
		teamAway: {
			teamName: 'Internacional'
		}
	},
	{
		id: 3,
		homeTeam: 13,
		homeTeamGoals: 1,
		awayTeam: 3,
		awayTeamGoals: 0,
		inProgress: false,
		teamHome: {
			teamName: 'Real Brasília'
		},
		teamAway: {
			teamName: 'Botafogo'
		}
	},
];

export const teamsAway = [
  {
    id: 12,
    teamName: 'Palmeiras'
  },
  {
    id: 9,
    teamName: 'Internacional'
  },
  {
    id: 3,
    teamName: 'Botafogo'
  }
]

export const leaderboardAwayResult = [
  {
    name: 'Palmeiras',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 0,
    goalsBalance: 3,
    efficiency: 100
  },
  {
    name: 'Internacional',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'Botafogo',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 1,
    goalsBalance: -1,
    efficiency: 0
  }
];

export const matchesAll = [
  {
		id: 1,
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
		id: 2,
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
    id: 3,
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
    },
    {
    id: 1,
    homeTeam: 1,
    homeTeamGoals: 0,
    awayTeam: 12,
    awayTeamGoals: 3,
    inProgress: false,
    teamHome: {
      teamName: 'Avaí/Kindermann'
    },
    teamAway: {
      teamName: 'Palmeiras'
    }
  },
  {
    id: 2,
    homeTeam: 2,
    homeTeamGoals: 0,
    awayTeam: 9,
    awayTeamGoals: 2,
    inProgress: false,
    teamHome: {
      teamName: 'Bahia'
    },
    teamAway: {
      teamName: 'Internacional'
    }
  },
  {
    id: 3,
    homeTeam: 13,
    homeTeamGoals: 1,
    awayTeam: 3,
    awayTeamGoals: 0,
    inProgress: false,
    teamHome: {
      teamName: 'Real Brasília'
    },
    teamAway: {
      teamName: 'Botafogo'
    }
  },
]

export const teamsAll = [
  {
    id: 11,
    teamName: 'Napoli-SC'
  },
  {
    id: 16,
    teamName: 'São Paulo'
  },
  {
    id: 6,
    teamName: 'Ferroviária'
  },
  {
    id: 12,
    teamName: 'Palmeiras'
  },
  {
    id: 9,
    teamName: 'Internacional'
  },
  {
    id: 3,
    teamName: 'Botafogo'
  }
]

export const allResultsMatchs = [
  {
    name: 'Palmeiras',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 0,
    goalsBalance: 3,
    efficiency: 100
  },
  {
    name: 'São Paulo',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 2,
    goalsOwn: 0,
    goalsBalance: 2,
    efficiency: 100
  },
  {
    name: 'Ferroviária',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 1,
    goalsOwn: 0,
    goalsBalance: 1,
    efficiency: 100
  },
  {
    name: 'Internacional',
    totalPoints: 3,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 2,
    goalsOwn: 2,
    goalsBalance: 0,
    efficiency: 50
  },
  {
    name: 'Napoli-SC',
    totalPoints: 1,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 33.33
  },
  {
    name: 'Botafogo',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 0,
    goalsOwn: 1,
    goalsBalance: -1,
    efficiency: 0
  }
]
