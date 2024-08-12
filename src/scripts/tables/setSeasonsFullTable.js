import createTable from "./createTable";
import { fullTableNoTies, fullTable } from "../../constants/consts/supportVars";
import { SEASONS_WITH_TIE_GAMES } from "../../constants/consts/vars";
import TeamStats from "../setTables/createTeam"
import setTableListeners from "../listeners/listenerHelpers/setTableListeners";
import setMainNavbar from "../layouts/setMainNavbar";
import currentSeason from "../var_lib/season/currentSeason";

// modeDescriptor either 'Season', 'Playoff', or 'Combined' -- case sensitive!
// tableDescriptor either 'Regular Season', 'Playoffs', or 'Combined' -- these are just table titles

export default function setSeasonsFullTable(seasonNumber = currentSeason, modeDescriptor = "Season", tableDescriptor = "Regular Season") {
  // set the table headers for ties for seasons that played with tie games
  let tableTypeString;
  let tableTypeArray;
  if(SEASONS_WITH_TIE_GAMES.includes(seasonNumber)){
    tableTypeString = "fullTable";
    tableTypeArray = fullTable
  } else {
    tableTypeString = "fullTableNoTies";
    tableTypeArray = fullTableNoTies;
  }
  
  const key = `groupTeamsSeason${seasonNumber}${modeDescriptor}Stats`
  createTable(
    seasonNumber,
    `S0${seasonNumber} ${tableDescriptor}`,
    `TeamStats.groupTeamsSeason${seasonNumber}${modeDescriptor}Stats`,
    TeamStats[key],
    "w3-yellow",
    "Points",
    tableTypeString,
    tableTypeArray
  );
  setTableListeners();
  setMainNavbar(seasonNumber);
  }