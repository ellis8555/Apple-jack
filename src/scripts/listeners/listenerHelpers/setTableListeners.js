import sortTable from "../../misc/sortTable";

export default function setTableListeners() {
    let browserWidth = window.innerWidth;
    if (browserWidth < 982) {
      let mobileTableCells = document.querySelectorAll("#tablesDiv");
      mobileTableCells[0].onclick = function (e) {
        let td = e.target.closest("td");
        if (!td) return;
        sortTable(e);
      };
    } else {
      let getFieldNames = document.querySelectorAll("#tablesDiv");
      getFieldNames[0].onclick = function (e) {
        let th = e.target.closest("th");
        if (!th) return;
        sortTable(e);
      };
    }
  }