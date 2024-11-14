import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TablePagination, TableSortLabel, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material';
import axios from 'axios';

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [editContact, setEditContact] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });

  const fetchContacts = async () => {
    const response = await axios.get('http://localhost:5000/api/contacts');
    setContacts(response.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    fetchContacts();
  };

  const handleEditClick = (contact) => {
    setEditContact(contact._id);
    setFormData(contact);
  };

  const handleEditSubmit = async () => {
    await axios.put(`http://localhost:5000/api/contacts/${editContact}`, formData);
    setEditContact(null);
    fetchContacts();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((column) => (
              <TableCell key={column}>
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? order : 'asc'}
                  onClick={() => handleSort(column)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(contact => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(contact)}>Edit</Button>
                <Button onClick={() => handleDelete(contact._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={contacts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Dialog */}
      <Dialog open={editContact !== null} onClose={() => setEditContact(null)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth />
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth />
          <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
          <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} fullWidth />
          <TextField label="Company" name="company" value={formData.company} onChange={handleChange} fullWidth />
          <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditContact(null)} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ContactsTable;


// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
// import axios from 'axios';

// const ContactsTable = () => {
//   const [contacts, setContacts] = useState([]);

//   const fetchContacts = async () => {
//     const response = await axios.get('http://localhost:5000/api/contacts');
//     setContacts(response.data);
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:5000/api/contacts/${id}`);
//     fetchContacts();
//   };

//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>First Name</TableCell>
//             <TableCell>Last Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Phone Number</TableCell>
//             <TableCell>Company</TableCell>
//             <TableCell>Job Title</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {contacts.map(contact => (
//             <TableRow key={contact._id}>
//               <TableCell>{contact.firstName}</TableCell>
//               <TableCell>{contact.lastName}</TableCell>
//               <TableCell>{contact.email}</TableCell>
//               <TableCell>{contact.phoneNumber}</TableCell>
//               <TableCell>{contact.company}</TableCell>
//               <TableCell>{contact.jobTitle}</TableCell>
//               <TableCell>
//                 <Button onClick={() => handleDelete(contact._id)}>Delete</Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ContactsTable;