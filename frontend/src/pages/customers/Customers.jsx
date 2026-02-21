import Datatable from "../../components/datatable/Datatable";
import { customerColumns } from "../../datatablesource";
import "./customers.scss";

const Customers = (columns) => {

  return (
    <div className="customers">
      <Datatable 
        columns={customerColumns} 
        title="العملاء"
      />
    </div>
  );
};

export default Customers;
