import sortTable from "./sortTable";
import setTeamsTableBgColor from "./setTeamsTableBgColor";

export default function screenResize() {
// if on boxscore page that has players table just return and exit 
let boxscorePlayerStats = document.getElementById("boxscorePlayerStats");
if (boxscorePlayerStats) {
  return;
}

  // insert fetch data function onto <TD> elements in mobile view
  let screenSize = window.innerWidth;
  let teamPlayersDataSource = document.getElementById("playerStatsBackButton");
  if (!teamPlayersDataSource) {
    let regularScreen = document.querySelectorAll("#tablesDiv table th");
    let mobileTableData = document.querySelectorAll("#tablesDiv table td");
    if (screenSize < 993) {
      mobileTableData.forEach((item) =>
        item.addEventListener("click", sortTable)
      );
      setTeamsTableBgColor();
    } else {
      regularScreen.forEach((item) =>
        item.addEventListener("click", sortTable)
      );
    }
  }
}
