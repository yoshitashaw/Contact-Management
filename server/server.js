import express from 'express';
import { connect, connection } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
import contactRoutes from './routes/contact';

const app = express();

app.use(cors());
app.use(json());
app.use('/api', contactRoutes);

// MongoDB Connection
connect('mongodb+srv://yoshitashaw2:n6BgXuOzo7WoYfd8@cluster1.dbdb6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const db = connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
