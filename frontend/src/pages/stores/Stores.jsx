import Datatable from "../../components/datatable/Datatable";
import { storeColumns } from "../../datatablesource";
import "./stores.scss";

const Stores = (columns) => {

  return (
    <div className="stores">
      <Datatable 
        columns={storeColumns} 
        title="المتاجر"
      />
    </div>
  );
};

export default Stores ;
