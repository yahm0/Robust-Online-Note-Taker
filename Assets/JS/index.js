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
    
        // Get note data
        function getNoteData(event) {
            let title = noteTitle.value.trim();
            let text = noteText.value.trim();
    
            if (title && text) {
                activeNote = {
                    title,
                    text
                };
    
                return activeNote;
            }
        }
    
        // Save note
        function handleNoteSave() {
            let newNote = getNoteData();
    
            if (newNote) {
                if (activeNote.id) {
                    newNote.id = activeNote.id;
                    activeNote.id = null;
                } else {
                    newNote.id = Math.floor(Math.random() * 1000);
                }
    
                let savedNotes = getNotes() || [];
                let newNotesArr = [...savedNotes, newNote];
    
                saveNotes(newNotesArr);
                renderNewNote();
                renderNoteList();
            }
        }
    
        // Delete note
        function handleNoteDelete(event) {
            event.stopPropagation();
    
            let note = event.target;
            let noteId = parseInt(note.parentElement.getAttribute('data-id'));
    
            if (activeNote.id === noteId) {
                activeNote = {};
            }
    
            let savedNotes = getNotes();
            let newNotesArr = savedNotes.filter((note) => note.id !== noteId);
    
            saveNotes(newNotesArr);
            renderActiveNote();
            renderNoteList();
        }
    
        // Set active note
        function handleNoteView(event) {
            activeNote = JSON.parse(event.target.parentElement.getAttribute('data-note'));
            renderActiveNote();
        }

        // Clear notes
        function handleClearNotes() {
            localStorage.removeItem('notes');
            renderNoteList();
        }

        // Render note list
        function renderNoteList() {
            noteList.innerHTML = '';
    
            let notes = getNotes();
    
            if (notes) {
                notes.forEach((note) => {
                    let li = document.createElement('li');
                    li.classList.add('list-group-item');
                    li.setAttribute('data-note', JSON.stringify(note));
                    li.setAttribute('data-id', note.id);
    
                    let span = document.createElement('span');
                    span.innerText = note.title;
                    span.addEventListener('click', handleNoteView);
    
                    let delBtn = document.createElement('i');
                    delBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger');
                    delBtn.addEventListener('click', handleNoteDelete);
    
                    li.appendChild(span);
                    li.appendChild(delBtn);
                    noteList.appendChild(li);
                });
            }
        }

        // Event listeners
        saveNoteBtn.addEventListener('click', handleNoteSave);
        newNoteBtn.addEventListener('click', renderNewNote);
        clearBtn.addEventListener('click', handleClearNotes);

        // Render initial note list
        renderNoteList();
        renderNewNote();
        renderActiveNote();
    }
);


