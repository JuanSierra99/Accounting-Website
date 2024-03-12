import MainPage from "./MainPage.js";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

// This component will display a list of invoices
const Invoices = () => {
  return <MainPage page={"invoices"}></MainPage>;
};
export default Invoices;
