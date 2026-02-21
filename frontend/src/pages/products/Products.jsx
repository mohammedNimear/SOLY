import Datatable from "../../components/datatable/Datatable";
import { productColumns } from "../../datatablesource";
import "./products.scss";

const Products = (columns) => {

  return (
    <div className="products">
      <Datatable 
        columns={productColumns} 
        title="المنتجات"
      />
    </div>
  );
};

export default Products;
