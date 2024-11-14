import { Router } from 'express';
const router = Router();
import Contact, { find, findByIdAndUpdate, findByIdAndDelete } from '../models/Contact';

// Create a new contact
router.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a contact
router.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;