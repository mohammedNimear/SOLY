
// client/src/pages/home/Home.jsx
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import "./home.scss";
import CashBoxWidget from './../../components/cashWidget/CashBoxWidget';
import StockWidget from './../../components/stockWidget/Widget';

const Home = () => {


  return (
    <div className="home" dir="rtl">
      <div className="homeContainer">

        
        {/* قسم البطاقات العلوية */}
        <div className="widgets">
          <CashBoxWidget />
          <StockWidget />
        </div>

        {/* قسم الرسوم البيانية */}
        <div className="charts">
          <Featured />
          <Chart title="آخر 6 أشهر" />
        </div>

        {/* قائمة المنتجات الأكثر مبيعاً */}
        <div className="listContainer">
          <div className="listHeader">
            <h3 className="listTitle">المنتجات الأكثر مبيعاً</h3>
            <span className="listBadge">لهذا الشهر</span>
          </div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;