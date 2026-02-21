import Datatable from "../../components/datatable/Datatable";
import { salesColumns } from "../../datatablesource";
import "./sales.scss";

const Sales = (columns) => {

  return (
    <div className="sales ">
      <Datatable 
        columns={salesColumns} 
        title="الفواتير"
      />
    </div>
  );
};

export default Sales;
