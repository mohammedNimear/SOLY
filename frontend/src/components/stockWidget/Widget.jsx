import "./widget.scss";
import ShoppingCartOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import useFetch from "../../Hooks/useFetch";
import { Link } from "react-router-dom";

const StockWidget = ({ type }) => {
  let criticalData;

  const { data } = useFetch("/stores/stocks/getByCritical");

  // console.log(data)
  //temporary
  const amount = data?.length ?? 0;
  const diff = data.length;

  criticalData = {
    title: "الكمية الحرجة",
    isMoney: false,
    isCretical: true,
    link: "التفاصيل",
    icon: (
      <ShoppingCartOutlinedIcon
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
          صنف {diff}
        </div>
        {criticalData.icon}
      </div>  <div className="left">
        <span className="title">{criticalData.title}</span>
        <span className="counter">
          {criticalData.isMoney && "$"}الاصناف {amount} 
        </span>
        <Link to="/getByCritical" style={{ textDecoration: "none" }}>
          <span className="link">{criticalData.link}</span>
        </Link>

      </div>
    </div>
  );
};

export default StockWidget;
