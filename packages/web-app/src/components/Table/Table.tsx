// Table.tsx
import React from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';

export interface Column<T> {
  /** The key in the data object to render */
  field: keyof T;
  /** Column header text */
  headerName: string;
  /** Optional alignment: defaults to 'left' */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  /**
   * Optional custom render function for the cell.
   * Receives the cell value and the entire row.
   */
  renderCell?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  /** Columns definitions */
  columns: Column<T>[];
  /** Array of data to display */
  data: T[];
  /** Optional array of rows per page options */
  rowsPerPageOptions?: number[];
  /** Optional default rows per page */
  defaultRowsPerPage?: number;
}


export const Table = <T extends {}>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
}: TableProps<T>) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the data for the current page
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell key={index} align={col.align || 'left'}>
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} align={col.align || 'left'}>
                    {col.renderCell ? col.renderCell(row[col.field], row) : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Paper>
  );
};
