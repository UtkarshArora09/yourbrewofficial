import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { run } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, inquiry_type, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required fields.' });
        }

        const result = await run(`
            INSERT INTO messages (name, email, company, inquiry_type, message)
            VALUES (?, ?, ?, ?, ?)
        `, [name, email, company || '', inquiry_type || 'General Inquiry', message]);

        console.log(`📩 New message received from ${name} (${email})`);
        
        res.status(201).json({ 
            success: true, 
            messageId: result.id,
            msg: 'Thank you! Your message has been received successfully.' 
        });
    } catch (err) {
        console.error('❌ Database error during contact submission:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Admin Route (To view messages later)
app.get('/api/admin/messages', async (req, res) => {
    try {
        const rows = await query('SELECT * FROM messages ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'up' });
});

// Initialize server
app.listen(PORT, () => {
    console.log(`🚀 YourBrew Backend running on http://localhost:${PORT}`);
});
