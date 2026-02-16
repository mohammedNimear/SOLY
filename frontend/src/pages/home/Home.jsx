import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import DusterWidget from "../../components/dusterWidget/Widget";
import StockWidget from "../../components/stockWidget/Widget";


const Home = () => {
 
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <DusterWidget type="dusters"/>
          <StockWidget type="stock" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="اخر الحركات (6 شهر)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">المنتجات الأخيرة</div>
          <Table />
        </div>
      </div>
            <Sidebar />

    </div>
  );
};

export default Home;
