let fetchHaxBallData = await fetch("../json/haxData.json");
let haxBallData = await fetchHaxBallData.json();

////////////////////// destructed variables
// 1. TEAMS - has map
// 2. PLAYERS - has map
// 3. GAME TYPE - has map
// 4. TEAM PLAYERS
// 5. GAME RESULTS
// 6. GAME PLAYER STATS
export let {
  Teams: teams,
  Players: players,
  GameType: gameType,
  TeamPlayers: teamPlayers,
  GameResults: gameResults,
  GamePlayerStats: gamePlayerStats,
} = haxBallData;
//**** MISC ****//
let currentSeason = Math.max(
  Array.from(new Set(teamPlayers.map((item) => +item.SeasonNumber)))
);
let seasonCount = Array.from(
  //get count of how many seasons in order to create arrays for each season
  new Set(gameResults.map((item) => item.SeasonNumber))
);
let seasonCountLength = seasonCount.length;
seasonCount.sort((a, b) => a - b);
let defendingChamps = "Haxual Chocolate";
//**** TEAMS ****//
let teamsLength = teams.length;
let teamNames = [teamsLength];
let eachTeamObjectMAP = new Map(); // maps out each teams basic info. ID, Color, logo file path, etc...
let teamsMAP = new Map();
let teamsNumMAP = new Map();
let teamsSeasonsMAP = new Map();
let eachSeasonsTeamsMAP = new Map();
for (let i = 0; i < teamsLength; i++) {
  teamNames[i] = teams[i].TeamName;
  eachTeamObjectMAP.set(teamNames[i], teams[i]);
}
for (let i = 0; i < teamsLength; i++) {
  // map a list of teams with ID number to name
  teamsMAP.set(Number(teams[i].TeamID), teams[i].TeamName);
  teamsNumMAP.set(teams[i].TeamName, Number(teams[i].TeamID));
}
// lists which seasons each team participated in
for (let i = 1; i <= teamsMAP.size; i++) {
  teamsSeasonsMAP.set(
    teamsMAP.get(i),
    Array.from(
      new Set(
        teamPlayers
          .filter((item) => item.TeamID == teamsNumMAP.get(teamsMAP.get(i)))
          .map((item) => item.SeasonNumber)
      )
    )
  );
}
// list of teams playing in any given season
for (let i = 1; i <= seasonCountLength; i++) {
  eachSeasonsTeamsMAP.set(
    i,
    Array.from(
      new Set(
        teamPlayers
          .filter((item) => item.SeasonNumber == i)
          .map((item) => teamsMAP.get(+item.TeamID))
      )
    )
  );
}
// maps teams main color with ID number
let teamsColorMAP = new Map();
for (let i = 0; i < teamsMAP.size; i++) {
  teamsColorMAP.set(teamsMAP.get(i + 1), teams[i].MainColor);
}

// (function setMainNavbar() {
//   let navbarContent = document.querySelector("#teamsNavbar > section");

//   for (let i = 0; i < eachSeasonsTeamsMAP.get(currentSeason).length; i++) {
//     let firstDiv = document.createElement("DIV");
//     let secondDiv = document.createElement("DIV");
//     let thirdDiv = document.createElement("DIV");
//     let imgDiv = document.createElement("IMG");
//     firstDiv.className = "w3-container w3-cell w3-cell-middle";
//     secondDiv.className =
//       "w3-card-4 w3-blue w3-round-xlarge w3-padding-small w3-section";
//     let imageSource = teams[i].S01HomeFilePath;
//     imgDiv.src = imageSource;
//     imgDiv.alt = `${eachSeasonsTeamsMAP.get(currentSeason)[i]}`;
//     imgDiv.className = "w3-image navLogo";
//     imgDiv.dataset.teamName = eachSeasonsTeamsMAP.get(currentSeason)[i];
//     imgDiv.dataset.seasonNum = currentSeason;
//     navbarContent.append(firstDiv);
//     firstDiv.append(secondDiv);
//     secondDiv.append(thirdDiv);
//     thirdDiv.append(imgDiv);
//   }
// })();

// setMainNavbar();
//**** PLAYERS ****//
let playersLength = players.length;
let playersMAP = new Map();
for (let i = 0; i < playersLength; i++) {
  // map a list of players
  playersMAP.set(Number(players[i].PlayerID), players[i].Players);
}
//**** GAME TYPE ****//
let gameTypeLength = gameType.length;
let gameTypeMAP = new Map();
for (let i = 0; i < gameTypeLength; i++) {
  // map a list of players
  gameTypeMAP.set(Number(gameType[i].GameTypeID), gameType[i].GameType);
}
//**** TEAM PLAYERS ****//
let teamPlayersLength = teamPlayers.length;

//**** GAME RESULTS ****//
let gameResultsLength = gameResults.length;

//**** GAME PLAYER STATS ****//
let gamePlayerStatsLength = gamePlayerStats.length;
// maps
export {
  teamsMAP,
  eachTeamObjectMAP,
  teamsNumMAP,
  eachSeasonsTeamsMAP,
  teamsSeasonsMAP,
  teamsColorMAP,
  playersMAP,
  gameTypeMAP,
};
// var lengths
export {
  teamsLength,
  playersLength,
  gameTypeLength,
  teamPlayersLength,
  gameResultsLength,
  seasonCountLength,
  gamePlayerStatsLength,
};
// arrays
export { defendingChamps, seasonCount, currentSeason };
