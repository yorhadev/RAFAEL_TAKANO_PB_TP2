import { Table, TableContainer } from "@mui/material";

export default function DataTable({ children }) {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        {children}
      </Table>
    </TableContainer>
  );
}
