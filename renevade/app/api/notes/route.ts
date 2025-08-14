import fs from 'fs';
import path from 'path';

const notesFilePath = path.join(process.cwd(), 'notes.json');

// Helper function to read the notes file
const readNotes = () => {
    if (!fs.existsSync(notesFilePath)) {
        fs.writeFileSync(notesFilePath, JSON.stringify({ note: '' }), 'utf8');
    }
    const fileContent = fs.readFileSync(notesFilePath, 'utf8');
    return JSON.parse(fileContent);
};

export default function handler(req:any, res:any) {
    if (req.method === 'GET') {
        const data = readNotes();
        res.status(200).json(data);
    } else if (req.method === 'POST') {
        const { note } = req.body;
        fs.writeFileSync(notesFilePath, JSON.stringify({ note }), 'utf8');
        res.status(200).json({ message: 'Note saved successfully' });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}