import Datatable from "../../components/datatable/Datatable";
import { supplierColumns } from "../../datatablesource";
import "./suppliers.scss";

const Suppliers = (columns) => {

  return (
    <div className="suppliers">
      <Datatable 
        columns={supplierColumns} 
        title="الموردين"
      />
    </div>
  );
};

export default Suppliers;
