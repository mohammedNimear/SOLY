import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../Hooks/useFetch";
import { useEffect, useState } from "react";

const StockTable = () => {

  const { data } = useFetch("/stores/getByCritical");
  
    const [rows, setRows] = useState([]);
    console.log(data)

    useEffect(() => {

  setRows(data) }, [data]);
  
  
  
  return (
    <>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell"> المشرف</TableCell>
            <TableCell className="tableCell"> الكمية</TableCell>
            <TableCell className="tableCell">الصنف الحرج</TableCell>
            <TableCell className="tableCell">اسم المخزن</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.manager}</TableCell>
              <TableCell className="tableCell">{row.quantity}</TableCell>
              <TableCell className="tableCell">{row.productName}</TableCell>
              <TableCell className="tableCell">{row.storeName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default StockTable;
