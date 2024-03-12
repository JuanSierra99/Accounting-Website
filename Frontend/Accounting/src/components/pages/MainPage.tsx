import { useState, useEffect } from "react";
import NavBar from "../atoms/NavBar.js";
import { AgGridReact } from "ag-grid-react";
import SideBar from "../atoms/SideBar.js";
import { getJson } from "./Request.js";
import ModalCell from "../atoms/ModalCell.js";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./MainPage.css";

// This componet takes a page parameter 'bill' or 'invoice' and provides the structure necessary to show a list of bills/invoices
const MainPage = ({ page }) => {
  const pagination = true;
  const paginationPageSize = 25;
  const paginationPageSizeSelector = [25, 50, 100];
  const [rowData, setRowData] = useState([]);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const [colDefs, setColDefs] = useState([
    {
      headerName: "Details",
      valueGetter: () => "Open",
      cellRenderer: ModalCell,
      cellRendererParams: (params) => ({
        id: params.data.id, // Directly access the id from params.data here
        page: page,
      }),
    },
    {
      field: "id",
    },
    {
      field: "amount",
    },
    {
      field: "due_date",
      headerName: "Due Date",
      valueGetter: (d) => {
        const dueDate = new Date(d.data.due_date);
        return dueDate.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
      },
    },
  ]);

  //Fetch json from api to gather data
  const getData = async () => {
    const request = await getJson(`http://127.0.0.1:3000/${page}`);
    return request;
  };

  // Toggles sidebar visibility state, affecting CSS classes for show/hide behavior
  const toggleSidebarVisibility = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  useEffect(() => {
    // Fetches data when component mounts or page prop changes
    const fetchData = async () => {
      try {
        const data = await getData();
        if (data && data.length > 0) {
          setRowData(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    // Call the async function
    if (page) {
      fetchData();
    }
  }, [page]);

  return (
    <>
      <div className={`sidebar-section ${sidebarVisibility && "hide-sidebar"}`}>
        <SideBar></SideBar>
      </div>

      <div className={`right-section ${sidebarVisibility && "expand-table"}`}>
        <NavBar page={`/ ${page}`} />
        <button
          className={`toggle-sidebar-button ${
            sidebarVisibility && "rotate-button"
          }`}
          onClick={toggleSidebarVisibility}
        >
          +
        </button>
        <div className={"table ag-theme-quartz"}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
          />
        </div>
      </div>
    </>
  );
};
export default MainPage;
