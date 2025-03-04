import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  TableSortLabel
} from '@mui/material';
import { User } from '../utils/users';

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  onSort?: (field: keyof User) => void;
  sortConfig?: {
    field: keyof User;
    direction: 'asc' | 'desc';
  };
}

export default function UserTable({ 
  users, 
  isLoading = false,
  onSort,
  sortConfig 
}: UserTableProps) {
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  const columns: { field: keyof User; label: string }[] = [
    { field: 'id', label: 'ID' },
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>
                {onSort ? (
                  <TableSortLabel
                    active={sortConfig?.field === column.field}
                    direction={sortConfig?.field === column.field ? sortConfig.direction : 'asc'}
                    onClick={() => onSort(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}