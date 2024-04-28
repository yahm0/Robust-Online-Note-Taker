const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // for generating unique ids

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public'

// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// API Routes for Notes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: "Failed to read database file." });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("POST /api/notes - Error reading database file:", err);
            return res.status(500).json({ error: "Failed to read database file." });
        }
        const notes = JSON.parse(data);
        const newNote = { ...req.body, id: uuidv4() };
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, './db/database.json'), JSON.stringify(notes, null, 4), (err) => {
            if (err) {
                console.error("POST /api/notes - Error writing database file:", err);
                return res.status(500).json({ error: "Failed to save note." });
            }
            res.status(201).json(newNote);
        });
    });
});


app.put('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, './db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: "Failed to read database file." });
        }
        let notes = JSON.parse(data);
        const noteIndex = notes.findIndex(note => note.id === req.params.id);
        if (noteIndex !== -1) {
            notes[noteIndex] = { ...notes[noteIndex], ...req.body };
            fs.writeFile(path.join(__dirname, './db/database.json'), JSON.stringify(notes, null, 4), (err) => {
                if (err) {
                    console.error("Error updating database file:", err);
                    return res.status(500).json({ error: "Failed to update note." });
                }
                res.json(notes[noteIndex]);
            });
        } else {
            res.status(404).json({ error: "Note not found." });
        }
    });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(path.join(__dirname, './db/database.json'), 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database file:", err);
            return res.status(500).json({ error: "Failed to read database file." });
        }

        let notes = JSON.parse(data);
        const initialLength = notes.length;
        notes = notes.filter(note => note.id !== noteId);

        // Check if any note was actually removed
        if (notes.length === initialLength) {
            return res.status(404).json({ error: "Note not found." });
        }

        fs.writeFile(path.join(__dirname, './db/database.json'), JSON.stringify(notes, null, 4), (err) => {
            if (err) {
                console.error("Error writing to database file:", err);
                return res.status(500).json({ error: "Failed to delete note." });
            }
            res.json({ ok: true, message: "Note deleted successfully." });
        });
    });
});


// Optional: Clear all notes
app.post('/api/notes/clear', (req, res) => {
    fs.writeFile(path.join(__dirname, './db/database.json'), JSON.stringify([], null, 4), (err) => {
        if (err) {
            console.error("Error clearing database file:", err);
            return res.status(500).json({ error: "Failed to clear notes." });
        }
        res.json({ ok: true });
    });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
