const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Public'));

// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Public/index.html'));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/Public/notes.html'));

// API Routes
app.get('/api/notes', (req, res) =>
    fs.readFile(path.join(__dirname, '/DB/database.json'), (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    })
);

app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/DB/database.json'), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, '/DB/database.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
}

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '/DB/database.json'), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== req.params.id);
        fs.writeFile(path.join(__dirname, '/DB/database.json'), JSON.stringify(updatedNotes), (err) => {
            if (err) throw err;
            res.json({ ok: true });
        });
    });
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));