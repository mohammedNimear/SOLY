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

const DusterTable = () => {

    const { data } = useFetch("/customers/getByDuster?duster=true");
  
    const [rows, setRows] = useState([]);

    useEffect(() => {

  console.log(data)
  setRows(data) }, [data]);
  
  
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">مواعيد السداد</TableCell>
            <TableCell className="tableCell">الموظف</TableCell>
            <TableCell className="tableCell">المتبقي</TableCell>
            <TableCell className="tableCell">المدفوع</TableCell>
            <TableCell className="tableCell">قيمة الاصناف</TableCell>
            <TableCell className="tableCell">الاصناف</TableCell>
            <TableCell className="tableCell">اسم العميل</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.pay_time}</span>
              </TableCell>
              <TableCell className="tableCell">{row.employer}</TableCell>
              <TableCell className="tableCell">{row.rest_money}</TableCell>
              <TableCell className="tableCell">{row.payed}</TableCell>
              <TableCell className="tableCell">{row.total}</TableCell>
              <TableCell className="tableCell">{row.products}</TableCell>
              <TableCell className="tableCell">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DusterTable;
