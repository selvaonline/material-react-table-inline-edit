import React, { useState, useEffect } from 'react';
import {MaterialReactTable} from 'material-react-table';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

const App = () => {
  // State variables
  const [isLoadingUsers, setIsLoadingUsers] = useState(false); 
  const [isLoadingUsersError, setIsLoadingUsersError] = useState(false); 
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Column definitions
  const columns = [
    { accessor: 'id', header: 'ID' },
    { accessor: 'firstName', header: 'First Name', editable: true },
    { accessor: 'lastName', header: 'Last Name', editable: true },
    // ... more columns
  ];

  // Demo Data
  const demoUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Alice', lastName: 'Johnson' },
    // ... add more demo users here
  ];

  // Initialize with demo data
  useEffect(() => {
    setFetchedUsers(demoUsers);
  }, []); 

  // Handle user creation (placeholder)
  const handleCreateUser = async (newData) => {
    setIsCreatingUser(true);
    try {
      // In a real app, you'd send newData to your backend for creation
      console.log('New User:', newData); 
    } catch (error) {
      // Handle errors
    } finally {
      setIsCreatingUser(false);
    }
  };

  // Handle user updates/saves (placeholder)
  const handleSaveUser = async (newData, oldData) => {
    setIsUpdatingUser(true);
    try {
      // In a real app, you'd send updates to your backend
      console.log('Updated User:', newData, oldData);
    } catch (error) {
      // Handle errors
    } finally {
      setIsUpdatingUser(false);
    }
  };

  // Handle deletion (placeholder) 
  const openDeleteConfirmModal = (row) => {
    // ... open modal for confirmation & deletion logic
    console.log('Delete User:', row);
  };

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={fetchedUsers}
        createDisplayMode="row"
        editDisplayMode="row"
        enableEditing={true}
        getRowId={(row) => row.id}
        muiToolbarAlertBannerProps={isLoadingUsersError ? {
          color: 'error',
          children: 'Error loading data'
        } : undefined}
        muiTableContainerProps={{
          sx: { minHeight: '500px' }
        }}
        onCreatingRowCancel={() => setValidationErrors({})} 
        onCreatingRowSave={handleCreateUser}
        onEditingRowCancel={() => setValidationErrors({})}
        onEditingRowSave={handleSaveUser}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => (
          <Button
            variant="contained"
            onClick={() => table.setCreatingRow(true)}
          >
            Create New User
          </Button>
        )}
        state={{
          isLoading: isLoadingUsers,
          isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
          showAlertBanner: isLoadingUsersError,
          showProgressBars: false, // No fetching from an API
        }}
      />
    </div>
  );
};

export default App;