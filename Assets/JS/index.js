document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.querySelector('.note-form');
    const noteTitle = document.querySelector('.note-title');
    const noteText = document.querySelector('.note-textarea');
    const saveNoteBtn = document.querySelector('.save-note');
    const newNoteBtn = document.querySelector('.new-note');
    const clearBtn = document.querySelector('.clear-btn');
    const noteList = document.querySelector('.list-group'); // Ensure this selector matches your HTML

    let activeNote = {};

    const getNotes = () => JSON.parse(localStorage.getItem('notes')) || [];
    const saveNotes = (notes) => localStorage.setItem('notes', JSON.stringify(notes));
    const show = (element) => element.style.display = 'inline';
    const hide = (element) => element.style.display = 'none';

    function renderNewNote() {
        noteTitle.value = '';
        noteText.value = '';
        show(saveNoteBtn);
        hide(newNoteBtn);
        noteTitle.removeAttribute('readonly');
        noteText.removeAttribute('readonly');
    }

    function renderActiveNote() {
        if (activeNote.id) {
            noteTitle.value = activeNote.title;
            noteText.value = activeNote.text;
            noteTitle.setAttribute('readonly', true);
            noteText.setAttribute('readonly', true);
            hide(saveNoteBtn);
        } else {
            renderNewNote();
        }
    }

    function handleNoteSave() {
        const newNote = {
            title: noteTitle.value.trim(),
            text: noteText.value.trim(),
            id: activeNote.id || crypto.randomUUID() // Using crypto API to generate UUID
        };

        if (newNote.title && newNote.text) {
            const notes = getNotes();
            const noteIndex = notes.findIndex(note => note.id === newNote.id);
            if (noteIndex !== -1) {
                notes[noteIndex] = newNote; // Update existing note
            } else {
                notes.push(newNote); // Add new note
            }
            saveNotes(notes);
            renderNewNote();
            renderNoteList();
        }
    }

    // Additional functions remain unchanged...

    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', renderNewNote);
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('notes');
        renderNoteList();
    });

    renderNoteList();
    renderNewNote();
    renderActiveNote();
});
