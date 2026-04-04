import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query, run } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || '';
const GOOGLE_FORM_RESPONSE_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSe4-BEN8vvNV7IL3ikb1ffNeC1sTsy8HtcelS5DP4CWtt06Nw/formResponse';

const GOOGLE_FORM_FIELDS = {
    company: 'entry.530466241',
    email: 'entry.1181930089',
    phone: 'entry.1013833292',
    website: 'entry.1660876971',
    needs: 'entry.543205304',
    freeConsultation: 'entry.318307616',
    contactMethod: 'entry.462295189',
};

function normalizeArray(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
}

function buildInquirySummary({
    company,
    email,
    phone,
    website,
    needs,
    freeConsultation,
    contactMethod,
}) {
    return [
        `Company: ${company}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone}`,
        `Website / App Link: ${website || 'Not provided'}`,
        `Needs: ${needs.length ? needs.join(', ') : 'Not provided'}`,
        `Free Consultation Call: ${freeConsultation || 'Not specified'}`,
        `Preferred Contact Method: ${contactMethod.length ? contactMethod.join(', ') : 'Not specified'}`,
    ].join('\n');
}

async function submitToGoogleForm({
    company,
    email,
    phone,
    website,
    needs,
    freeConsultation,
    contactMethod,
}) {
    const params = new URLSearchParams();
    params.append(GOOGLE_FORM_FIELDS.company, company);
    params.append(GOOGLE_FORM_FIELDS.email, email);
    params.append(GOOGLE_FORM_FIELDS.phone, phone);
    params.append(GOOGLE_FORM_FIELDS.website, website);

    needs.forEach((need) => params.append(GOOGLE_FORM_FIELDS.needs, need));

    if (freeConsultation) {
        params.append(GOOGLE_FORM_FIELDS.freeConsultation, freeConsultation);
    }

    contactMethod.forEach((method) => params.append(GOOGLE_FORM_FIELDS.contactMethod, method));

    const response = await fetch(GOOGLE_FORM_RESPONSE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: params.toString(),
    });

    if (!response.ok) {
        throw new Error(`Google Form submission failed with status ${response.status}`);
    }
}

app.use(cors({
    origin(origin, callback) {
        if (!origin || !FRONTEND_URL) {
            callback(null, true);
            return;
        }

        if (origin === FRONTEND_URL) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
    },
}));
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    try {
        const company = (req.body.company || '').trim();
        const email = (req.body.email || '').trim();
        const phone = (req.body.phone || '').trim();
        const website = (req.body.website || '').trim();
        const needs = normalizeArray(req.body.needs);
        const freeConsultation = (req.body.freeConsultation || '').trim();
        const contactMethod = normalizeArray(req.body.contactMethod);

        if (!company || !email || !phone || needs.length === 0) {
            return res.status(400).json({
                error: 'Company, email, phone, and at least one service selection are required.',
            });
        }

        await submitToGoogleForm({
            company,
            email,
            phone,
            website,
            needs,
            freeConsultation,
            contactMethod,
        });

        const summary = buildInquirySummary({
            company,
            email,
            phone,
            website,
            needs,
            freeConsultation,
            contactMethod,
        });

        let messageId = null;

        try {
            const result = await run(
                `
                INSERT INTO messages (name, email, company, inquiry_type, message)
                VALUES (?, ?, ?, ?, ?)
            `,
                [company, email, company, needs.join(', ') || 'Startup Inquiry', summary]
            );
            messageId = result.id;
        } catch (dbError) {
            console.warn('Inquiry reached Google Form, but local SQLite save failed:', dbError.message);
        }

        console.log(`New inquiry received from ${company} (${email})`);

        res.status(201).json({
            success: true,
            messageId,
            msg: 'Inquiry submitted successfully. We will reach out shortly.',
        });
    } catch (err) {
        console.error('Contact submission failed:', err.message);
        res.status(500).json({ error: 'Unable to submit your inquiry right now.' });
    }
});

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

app.get('/api/contact', (req, res) => {
    res.status(405).json({
        error: 'Use POST /api/contact to submit an inquiry.',
    });
});

app.listen(PORT, () => {
    console.log(`YourBrew backend running on http://localhost:${PORT}`);
});

