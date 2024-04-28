document.addEventListener('DOMContentLoaded', function() {
    let noteForm = document.querySelector('.note-form');
    let noteTitle = document.querySelector('.note-title');
    let noteText = document.querySelector('.note-textarea');
    let saveNoteBtn = document.querySelector('.save-note');
    let newNoteBtn = document.querySelector('.new-note');
    let clearBtn = document.querySelector('.clear-btn');
    let noteList = document.querySelector('.list-group'); // Ensure this selector matches your HTML

    // Show an element
    function show(element) {
        element.style.display = 'inline';
    }

    // Hide an element
    function hide(element) {
        element.style.display = 'none';
    }

    // Active Note
    let activeNote = {};

    // Get notes from localStorage
    function getNotes() {
        return JSON.parse(localStorage.getItem('notes'));
    }

    // Save notes to localStorage
    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }


        // Render a new note
        function renderNewNote() {
            noteTitle.value = '';
            noteText.value = '';
    
            show(saveNoteBtn);
            hide(newNoteBtn);
        }
    
        // Render active note
        function renderActiveNote() {
            hide(saveNoteBtn);
    
            if (activeNote.id) {
                noteTitle.setAttribute('readonly', true);
                noteText.setAttribute('readonly', true);
                noteTitle.value = activeNote.title;
                noteText.value = activeNote.text;
            } else {
                noteTitle.removeAttribute('readonly');
                noteText.removeAttribute('readonly');
                noteTitle.value = '';
                noteText.value = '';
            }
        }
    
    
