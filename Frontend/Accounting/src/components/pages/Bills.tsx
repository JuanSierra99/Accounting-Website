import MainPage from "./MainPage.js";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

// This component will display a list of bills
const Bills = () => {
  return <MainPage page={"bills"}></MainPage>;
};
export default Bills;
