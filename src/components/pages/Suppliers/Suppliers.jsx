import { default as Container } from "./SuppliersContainer";
import { default as TableForm } from "./SuppliersForm";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { DataTable } from "../../table";
import { useEffect, useState } from "react";
import firebaseService from "../../../services/firebaseService";

const columns = [
  { id: "name", label: "Nome" },
  { id: "address", label: "Endereço" },
];

export default function Suppliers() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await firebaseService.getDocs(
        "Suppliers",
        firebaseService.currentUser().uid
      );
      if (error) return;
      if (data.length > 0) setRows(data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <DataTable>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              Fornecedores
            </TableCell>
          </TableRow>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} style={{ top: 57 }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${row.code}-${rowIndex}`}
                >
                  {columns.map((column, columnIndex) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`${column.id}-${columnIndex}`}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </DataTable>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableForm rows={rows} setRows={setRows} />
    </Container>
  );
}
