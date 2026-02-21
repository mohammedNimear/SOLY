import Datatable from "../../components/datatable/Datatable";
import { employerColumns } from "../../datatablesource";
import "./employers.scss";

const Employers = (columns) => {

  return (
    <div className="employers">
      <Datatable 
        columns={employerColumns} 
        title="الموظفين"
      />
    </div>
  );
};

export default Employers;
