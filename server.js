const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // for generating unique ids

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Changed to 'public' to follow common conventions

// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read database file." });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read database file." });
        }
        const notes = JSON.parse(data);
        const newNote = { ...req.body, id: uuidv4() };
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '/db/database.json'), JSON.stringify(notes, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to save note." });
            }
            res.json(newNote);
        });
    });
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Failed to read database file." });
        }
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== req.params.id);
        fs.writeFile(path.join(__dirname, '/db/database.json'), JSON.stringify(updatedNotes, null, 4), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Failed to delete note." });
            }
            res.json({ ok: true });
        });
    });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
