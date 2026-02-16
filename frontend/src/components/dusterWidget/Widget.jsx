import "./widget.scss";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import useFetch from "../../Hooks/useFetch";
import { Link } from "react-router-dom";

const DusterWidget = ({ type }) => {
  let dusterData;

  const { data } = useFetch("/customers/getByDuster?duster=true");

  //
  const amount = data?.reduce((acc, item) => acc + (item.total || 0), 0) ?? 0;
  const diff = data.length;

  dusterData = {
    title: "التصريف",
    isMoney: true,
    isCretical: false,
    link: "التفاصيل",
    icon: (
      <AccountBalanceWalletOutlinedIcon
        className="icon"
        style={{
          backgroundColor: "rgba(236, 13, 9, 0.314)",
          color: "purple",
        }}
      />
    ),
  };

  return (
    <div className="widget">

      <div className="right">
        <div className="percentage positive">
          عميل {diff}
        </div>
        {dusterData.icon}
      </div>  <div className="left">
        <span className="title">{dusterData.title}</span>
        <span className="counter">
          {dusterData.isMoney && "$"} {amount}

        </span>
        <Link to="/getByDuster" style={{ textDecoration: "none" }}>
          <span className="link">{dusterData.link}</span>
        </Link>

      </div>
    </div>
  );
};

export default DusterWidget;
