// for teams class

export const seasonMode = ["Combined", "Season", "Playoff"];
export const teamStatsFieldsAbbreviated = [
      "GP",
      "Win",
      "Loss",
      "Draw",
      "Points",
      "GF",
      "GA",
      "GD",
      "GFA",
      "GAA",
    ]
export const teamStatsFields = [
      "GamesPlayed",
      "Win",
      "Loss",
      "Draw",
      "Points",
      "GoalsFor",
      "GoalsAgainst",
      "GoalDifferential",
      "GoalsForAverage",
      "GoalsAgainstAverage",
    ]
export const teamStatsFieldNamesMAP = [
      "allTimeGamesPlayed",
      "allTimeWins",
      "allTimeLosses",
      "allTimeDrawsLength",
      "allTimePoints",
      "allTimeGoals",
      "allTimeGoalsAgainst",
      "allTimeGoalDifferential",
      "allTimeGoalsForAverage",
      "allTimeGoalsAgainstAverage",
    ]

export const groupedAllTimeTeamStats = [
      "groupTeamsAllTimeStats",
      "groupTeamsAllTimeSeasonStats",
      "groupTeamsAllTimePlayoffStats",
    ]
export const statsType = ["CombinedStats", "SeasonStats", "PlayoffStats"]

// forplayer class

export const  playerSeasonMode = ["Season", "Playoff"];
export const  playerStatsFields = [
  "Assists",
  "Goals",
  "Points",
  "Kicks",
  "Passes",
  "ShotsOnGoal",
  "OwnGoals",
];
  export const  groupedAllTimePlayerStats = [
    "groupPlayersAllTimeStats",
    "groupPlayersAllTimeSeasonStats",
    "groupPlayersAllTimePlayoffStats",
  ];
  export const  allTimeMapNames = [
    "groupPlayersAllTimeStatsMAP",
    "groupPlayersAllTimeSeasonStatsMAP",
    "groupPlayersAllTimePlayoffStatsMAP",
  ];
  export const  perSeasonCats = ["CombinedStats", "SeasonStats", "PlayoffStats"];
  export const  perSeasonCatMAPS = ["CombinedStatsMAP", "SeasonStatsMAP", "PlayoffStatsMAP"];
  
// for both team/players class'

export const allTimeStatsArray = [
    "allTimeStats",
    "allTimeSeasonStats",
    "allTimePlayoffStats",
  ];

  export const allTimeStatsMAPS = [
    "allTimeStatsMAP",
    "allTimeSeasonStatsMAP",
    "allTimePlayoffStatsMAP",
  ];

  // SET FIELDS FOR TEAMS TABLES WITH TIE GAMES

export const homePageFields = ["Team", "GP", "Wins", "Losses", "Draws", "Points"];
export const fullTable = [
  "Team",
  "GP",
  "Wins",
  "Losses",
  "Draws",
  "Points",
  "GF",
  "GA",
  "GD",
  "GFA",
  "GAA",
  "PF",
  "PFA",
  "PA",
  "PAA",
];

// SET FIELDS FOR TEAMS TABLES IN SEASONS THAT DON'T HAVE TIE GAMES
export const homePageFieldsNoTies = ["Team", "GP", "Wins", "Losses", "OTL", "Points"];
export const fullTableNoTies = [
  "Team",
  "GP",
  "Wins",
  "OTW",
  "Losses",
  "OTL",
  "Points",
  "GF",
  "GA",
  "GD",
  "GFA",
  "GAA",
  "PF",
  "PFA",
  "PA",
  "PAA",
];
// SET FIELDS FOR PLAYERS TABLES
export const playersTable = [
  "Name",
  "GP",
  "Goals",
  "Assists",
  "Points",
  "Kicks",
  "Passes",
  "ShotsOnGoal",
  "OwnGoals",
];