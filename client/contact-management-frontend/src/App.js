import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import { Container, Typography } from '@mui/material';

function App() {
  const [contacts, setContacts] = useState([]);

  // fetchContacts function to get contacts from the backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Use useEffect to fetch contacts on initial render
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        CONTACT MANAGEMENT
      </Typography>
      <ContactForm fetchContacts={fetchContacts} />
      <ContactsTable contacts={contacts} fetchContacts={fetchContacts} />
    </Container>
  );
}

export default App;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ContactForm from './components/ContactForm';
// import ContactsTable from './components/ContactsTable';

// function App() {
//   const [contacts, setContacts] = useState([]);

//   // fetchContacts function to get contacts from the backend
//   const fetchContacts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/contacts');
//       setContacts(response.data);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };

//   // Use useEffect to fetch contacts on initial render
//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   return (
//     <div>
//       <h1>CONTACT MANAGEMENT</h1>
//       <ContactForm fetchContacts={fetchContacts} />
//       <ContactsTable contacts={contacts} fetchContacts={fetchContacts} />
//     </div>
//   );
// }

// export default App;