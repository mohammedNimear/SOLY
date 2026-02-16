import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext ";
import { customerColumns, employerColumns, hotelColumns, productColumns, roomColumns, saleColumns, storeColumns, supplierColumns, destersColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from './pages/newRoom/NewRoom';
import { customerInputs, empolyerInputs, productInputs, saleInputs, storeInputs, supplierInputs, typesInputs } from "./formSource";
import DusterTable from "./components/dusterTable/Table";
import StockTable from "./components/stockTable/Table";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"} >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />

            {/* //* تفاصيل التصريف*/}

            <Route path="getByDuster">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <DusterTable />
                  </ProtectedRoutes>
                }
              />

            </Route>

            {/* //* تفاصيل الكمية الحرجة*/}

            <Route path="getByCritical">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <StockTable />
                  </ProtectedRoutes>
                }
              />
              
            </Route>

            {/* //*employers الموظفين*/}

            <Route path="employers">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={employerColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":employerId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={empolyerInputs} title="Add New Employer" />
                  </ProtectedRoutes>
                }
              />
            </Route>


            {/* //*supplier الموردين*/}

            <Route path="suppliers">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={supplierColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":supplierId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={supplierInputs} title="Add New Supplier" />
                  </ProtectedRoutes>
                }
              />
            </Route>


            {/* //*Sales المبيعات*/}

            <Route path="sales">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={saleColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":saleId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={saleInputs} title="Add New Sale Move" />
                  </ProtectedRoutes>
                }
              />
            </Route>

            {/* //*Store المخازن*/}

            <Route path="stores">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={storeColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":storeId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={storeInputs} title="Add New Store" />
                  </ProtectedRoutes>
                }
              />
            </Route>

            {/* //*Customers العملاء */}

            <Route path="customers">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={customerColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":customerId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={customerInputs} title="Add New Customer" />
                  </ProtectedRoutes>
                }
              />
            </Route>


            {/* //*User */}

            {/* <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={userColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoutes>
                }
              />
            </Route> */}


            {/* //*desterbution التصريف*/}


            <Route path="desters">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={destersColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":desterId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={typesInputs} title="Add New Desterbuter" />
                  </ProtectedRoutes>
                }
              />
            </Route>


            {/* //*products المنتجات*/}

            <Route path="products">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={productColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <New inputs={productInputs} title="Add New Products" />
                  </ProtectedRoutes>
                }
              />
            </Route>





            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <List columns={hotelColumns} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewHotel />
                  </ProtectedRoutes>
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List columns={roomColumns} />} />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoutes>
                    <Single />
                  </ProtectedRoutes>
                }
              />


              <Route
                path="new"
                element={
                  <ProtectedRoutes>
                    <NewRoom />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
