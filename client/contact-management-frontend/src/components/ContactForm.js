import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      fetchContacts(); // Refresh the contact list
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: ''
      });
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required fullWidth />
      <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required fullWidth />
      <TextField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required fullWidth />
      <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required fullWidth />
      <TextField label="Company" name="company" value={formData.company} onChange={handleChange} fullWidth />
      <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} fullWidth />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Contact
      </Button>
    </Box>
  );
};

export default ContactForm;









// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import axios from 'axios';

// const ContactForm = ({ fetchContacts }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     company: '',
//     jobTitle: ''
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/contacts', formData);
//       fetchContacts(); // Refresh the contact list
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phoneNumber: '',
//         company: '',
//         jobTitle: ''
//       });
//     } catch (error) {
//       console.error('Error adding contact:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
//       <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
//       <TextField label="Email" name="email" value={formData.email} onChange={handleChange} type="email" required />
//       <TextField label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
//       <TextField label="Company" name="company" value={formData.company} onChange={handleChange} />
//       <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
//       <Button type="submit" variant="contained" color="primary">
//         Add Contact
//       </Button>
//     </form>
//   );
// };

// export default ContactForm;