// components/Table.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

interface CrudTableProps {
  data: Array<{
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
  }>;
  onDelete: (id: number) => void;
  onEdit: (item: {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
  }) => void;
  onView: (item: {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
  }) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CrudTable: React.FC<CrudTableProps> = ({
  data,
  onDelete,
  onEdit,
  onView,
}) => {
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // You can adjust the number of rows per page

  const handleDelete = (id: number) => {
    setDeleteItemId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId !== null) {
      onDelete(deleteItemId);
      setDeleteItemId(null); // Clear the deleteItemId after deletion
    }
  };

  const handleCancelDelete = () => {
    setDeleteItemId(null); // Clear the deleteItemId on cancel
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper style={{ width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>UserName</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>

              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.website}</TableCell>

                  <TableCell>
                    <Button onClick={() => onEdit(item)}>Edit</Button>
                    <Button onClick={() => handleDelete(item.id)}>
                      Delete
                    </Button>
                    <Button onClick={() => onView(item)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // You can customize the options
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={deleteItemId !== null} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this record?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CrudTable;
