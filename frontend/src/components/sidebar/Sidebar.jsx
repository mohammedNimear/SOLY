import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
src={logo}
            alt="Icon"
            className="avatar"
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>

            <li>
              <span>الرئيسية</span>
              <DashboardIcon className="icon" />
            </li>
          </Link>

          <p className="title">القائمة</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <span>الاصناف</span>
              <PersonOutlineIcon className="icon" />
            </li>
          </Link>
          <Link to="/desters" style={{ textDecoration: "none" }}>
            <li>
              <span>التصريف</span>
              <StoreIcon className="icon" />
            </li>
          </Link>
          <Link to="/suppliers" style={{ textDecoration: "none" }}>
            <li>
              <span>الموردين</span>
              < SettingsSystemDaydreamOutlinedIcon className="icon" />
            </li>
          </Link>
          <Link to="/sales" style={{ textDecoration: "none" }}>
            <li>
              <span>المبيعات</span>
              < CreditCardIcon className="icon" />
            </li>
          </Link>
          <Link to="/customers" style={{ textDecoration: "none" }}>
            <li>
              <span>العملاء</span>
              < PersonOutlineIcon className="icon" />
            </li>
          </Link>
          <Link to="/stores" style={{ textDecoration: "none" }}>
            <li>
              <span>المخازن</span>
              <StoreIcon className="icon" />
            </li>
          </Link>
          <Link to="/employers" style={{ textDecoration: "none" }}>
            <li>
              <span>الموظفين</span>
              <SettingsApplicationsIcon className="icon" />
            </li>
          </Link> <p className="title">أخرى</p>

          <li>
            <span>الكمية الحرجة</span>
            < NotificationsNoneIcon className="icon" />
          </li>
          <li>
            <span>الصلاحية الحرجة</span>
            <PsychologyOutlinedIcon className="icon" />
          </li>
          <li>
            <span>التصريف</span>
            < LocalShippingIcon className="icon" />
          </li>
          <p className="title">USER</p>
          <Link to="/users" style={{ textDecoration: "none" }}>

            <li>
              <span>الاداريين</span>
              <AccountCircleOutlinedIcon className="icon" />
            </li>
          </Link>
          <li>
            <span>خروج</span>
            <ExitToAppIcon className="icon" />
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
