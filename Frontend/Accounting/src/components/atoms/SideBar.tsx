import "./SideBar.css";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar-container">
      <h6 className="menu-header">Menu</h6>
      <button
        className="sidebar-button"
        onClick={() => {
          navigate("/invoices");
        }}
      >
        Invoices
      </button>
      <button
        className="sidebar-button"
        onClick={() => {
          navigate("/bills");
        }}
      >
        Bills
      </button>
      <button className="sidebar-button">Generate Data</button>
    </div>
  );
};

export default SideBar;
