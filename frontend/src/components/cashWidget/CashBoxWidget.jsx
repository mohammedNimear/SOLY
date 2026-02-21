import "./widget.scss";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import useFetch from "../../Hooks/useFetch";
import { Link } from "react-router-dom";

const CashBoxWidget = ({ type }) => {
  let cashBoxData;

  const { data } = useFetch("/sales/cash/totals");
  console.log(data)

  //
  const diff = "+0.5"; // نسبة الزيادة أو النقصان (مثال)

  cashBoxData = {
    title: "Cash Box",
    isMoney: true,
    isCretical: false,
    link: "التفاصيل",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "#04067197",
          color: "white",
        }}
      />
    ),
  };

  const amount = data?.cashTotal || 0;

  return (
    <div className="widget">

      <div className="right">
        <div className="percentage positive">
          {diff}%
        </div>
        {cashBoxData.icon}
      </div>  <div className="left">
        <span className="title">{cashBoxData.title}</span>
        <span className="counter">
          <span style={{ fontSize: "14px", color: "gray", marginRight: "5px" }}>
            {cashBoxData.isMoney && "sdg"}
          </span>
          {amount}
        </span>
        <Link to="/cashBox" style={{ textDecoration: "none" }}>
          <span className="link">{cashBoxData.link}</span>
        </Link>

      </div>
    </div>
  );
};

export default CashBoxWidget;
