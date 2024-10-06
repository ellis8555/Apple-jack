import clearScoreboardDiv from "../../scoreboard/clearScoreboardDiv"
import clearTablesDiv from "../../tables/clearTablesDiv"
import getTablesDiv from "../../tables/getTablesDiv";
import { GameResults } from "../../../constants/masterHaxData";
import TeamStats from "../../setTables/createTeam";
import sortGroupedStats from "../../misc/sorting/sort";
import bestOfSeries from "./componenets/bestOfSeries";
import setMainNavbar from "../navbar/setMainNavbar";
import setHeaderBanner from "../setHeaderBanner";
import { DEFENDING_CHAMPS } from "../../../constants/consts/vars";
import createElement from "../../misc/createElement";
import seriesContainer from "./componenets/seriesContainer";
import COLORS from "../../../constants/consts/colors";

function playoffTree(seasonNumber){
    clearTablesDiv()
    clearScoreboardDiv()
    document.body.style.backgroundColor = COLORS["w3-blue"]
    // get season number from data attribute on playoff menu link
    setHeaderBanner(DEFENDING_CHAMPS, seasonNumber-1)
    setMainNavbar(seasonNumber)
    // get semis playoff games for matching season
    const semiPlayoffGames = GameResults.filter(game => {
        if(game.SeasonNumber === seasonNumber && game.Round === 1){
            return game;
        }
    })
    
    // get finals playoff games for matching season
    const finalPlayoffGames = GameResults.filter(game => {
        if(game.SeasonNumber === seasonNumber && game.Round === 2){
            return game;
        }
    })
    const key = `groupTeamsSeason${seasonNumber}SeasonStats`
    const seasonsFinalStandings = TeamStats[key]
    const sortedFinalStandings = sortGroupedStats(seasonsFinalStandings, "Points")
    // begin constructing the display
    const tablesDiv = getTablesDiv();
    
    // playoff tree grid container
    const containerElem = createElement("div", "w3-container", "playoffTree")
    const playoffsAnnouncementContainer = createElement("div", "playoffAnnouncement")
    playoffsAnnouncementContainer.innerHTML = `<h3>Season ${seasonNumber} playoffs</h3>`
    containerElem.append(playoffsAnnouncementContainer)

    // first round title
    const firstRoundTitleContainer = createElement("div", "firstRound")
    const firstRoundTitleHeadElement = createElement("h4");
    firstRoundTitleHeadElement.textContent = "Round One"
    firstRoundTitleContainer.append(firstRoundTitleHeadElement)
    containerElem.append(firstRoundTitleContainer)

    // final round title
    const finalRoundTitleContainer = createElement("div", "finalRound")
    const finalRoundTitleHeadElement = createElement("h4")
    finalRoundTitleHeadElement.textContent = "Championship"
    finalRoundTitleContainer.append(finalRoundTitleHeadElement)
    containerElem.append(finalRoundTitleContainer)

    //// semi final 1v4 ////
    const seriesOneContainerArgs = {
        teamOne: sortedFinalStandings[0],
        teamOneRank: 1,
        teamTwo: sortedFinalStandings[3],
        teamTwoRank: 4,
        gamesArray: semiPlayoffGames,
        seriesNum: 1,
    }
    // returns dom container for a single series
    const {
        semiDivContainer: semiDiv1Container,
        seriesTeam1Results: firstSeriesTeam1Results, 
        seriesTeam2Results: firstSeriesTeam2Results
    } = seriesContainer(seriesOneContainerArgs);

    //// semi final 2v3 ////
    const seriesTwoContainerArgs = {
        teamOne: sortedFinalStandings[1],
        teamOneRank: 2,
        teamTwo: sortedFinalStandings[2],
        teamTwoRank: 3,
        gamesArray: semiPlayoffGames,
        seriesNum: 2,
    }
    // returns dom container for a single series
    const {
        semiDivContainer: semiDiv2Container,
        seriesTeam1Results: secondSeriesTeam1Results, 
        seriesTeam2Results: secondSeriesTeam2Results
    } = seriesContainer(seriesTwoContainerArgs);

    // finals container
    const finalsContainer = createElement("div", "finalsContainer")
    const finalsDivInnerContainer = createElement("div", "semi2")
    const finalSeries = createElement("div", "series")
    
    // get the finalists index in sorted standings in order to be passed into the finalists bestOfSeries call
    const seriesOneWinner = firstSeriesTeam1Results.seriesWinner ?? firstSeriesTeam2Results.seriesWinner;
    const seriesTwoWinner = secondSeriesTeam1Results.seriesWinner ?? secondSeriesTeam2Results.seriesWinner;
    const seriesOneWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesOneWinner)
    const seriesTwoWinnerInFinalStandings = sortedFinalStandings.findIndex(team => team.get("Team") === seriesTwoWinner)
    // team one flex container
    const finalSeriesTeam1Results = bestOfSeries(sortedFinalStandings[seriesOneWinnerInFinalStandings], finalPlayoffGames, "team1", seriesOneWinnerInFinalStandings, true);
    // team two flex container
    const finalSeriesTeam2Results = bestOfSeries(sortedFinalStandings[seriesTwoWinnerInFinalStandings], finalPlayoffGames, "team2", seriesTwoWinnerInFinalStandings, true);
    // append state of series such as series winner or tied at 0-0
    const seriesWinner = finalSeriesTeam1Results.seriesWinner ?? finalSeriesTeam2Results.seriesWinner;
    const seriesLosersWins = Math.min(finalSeriesTeam1Results.wins, finalSeriesTeam2Results.wins)
    const finaSeriesStatusContainer = createElement("div")
    if(seriesWinner && seriesLosersWins != null){
        finaSeriesStatusContainer.textContent = `${seriesWinner} win (2 - ${seriesLosersWins})`;
    } else {
        finaSeriesStatusContainer.textContent = `Series (0 - 0)`;
    }
    // only append the series status if both teams are determined
    if(seriesOneWinner && seriesTwoWinner){
        finalSeries.append(finaSeriesStatusContainer)
    }
    finalSeries.append(finalSeriesTeam1Results.seriesFrag)
    finalSeries.append(finalSeriesTeam2Results.seriesFrag)
    finalsDivInnerContainer.append(finalSeries)
    finalsContainer.append(finalsDivInnerContainer)

    // append each series to playoffs grid layout
    containerElem.append(semiDiv1Container, semiDiv2Container, finalsContainer)

    // if both finalists are set but no games have been played then append dashes in place of scores
    if(seriesOneWinner && seriesTwoWinner){
        if(finalPlayoffGames.length == 0){
                setTimeout(() => {
                    for(let i = 1; i<=2; i++){
                        let getFinalsContainer = document.querySelector(`.finalsContainer .team${i}`)
                            for(let j = 0; j<=2; j++){
                                const teamOneFinalsScoreHolder = createElement("div", "teamData")
                                teamOneFinalsScoreHolder.textContent = "-";
                                getFinalsContainer.append(teamOneFinalsScoreHolder)
                            }
                    }
                }, 0)
            }
        }

    tablesDiv.append(containerElem)
}

export default playoffTree