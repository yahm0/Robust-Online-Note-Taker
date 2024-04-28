document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.querySelector('form');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const noteList = document.querySelector('.list-group');
    const clearBtn = document.getElementById('clear-btn'); 

    let activeNote = {};

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleNoteSave();
    });

    clearBtn.addEventListener('click', clearForm);

    function handleNoteSave() {
        const noteToSave = {
            title: noteTitle.value.trim(),
            text: noteText.value.trim(),
            id: activeNote.id || undefined
        };

        const method = noteToSave.id ? 'PUT' : 'POST';
        const url = noteToSave.id ? `/api/notes/${noteToSave.id}` : '/api/notes';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteToSave)
        })
        .then(response => response.json())
        .then(savedNote => {
            console.log('Note saved:', savedNote);
            activeNote = {};
            loadAndRenderNotes();
        })
        .catch(err => console.error('Failed to save note:', err));
    }

    function clearForm() {
        noteTitle.value = '';
        noteText.value = '';
        activeNote = {};
    }

    function loadAndRenderNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => {
                noteList.innerHTML = '';
                notes.forEach(note => {
                    const noteItem = document.createElement('li');
                    noteItem.classList.add('list-group-item');
                    noteItem.innerHTML = `${note.title} <i class="fas fa-trash-alt float-right text-danger" data-id="${note.id}"></i>`;

                    noteItem.querySelector('.fa-trash-alt').addEventListener('click', function(event) {
                        event.stopPropagation(); // Prevent triggering the note edit when clicking the trash icon
                        deleteNote(note.id);
                    });

                    noteItem.addEventListener('click', function() {
                        editNote(note);
                    }, true); // Use capture to ensure the note is set before any bubbling deletions

                    noteList.appendChild(noteItem);
                });
            })
            .catch(err => console.error('Failed to load notes:', err));
    }

    function deleteNote(noteId) {
        fetch(`/api/notes/${noteId}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(result => {
                console.log('Note deleted:', result);
                loadAndRenderNotes();
            })
            .catch(err => console.error('Failed to delete note:', err));
    }

    function editNote(note) {
        activeNote = note;
        noteTitle.value = note.title;
        noteText.value = note.text;
    }

    loadAndRenderNotes(); // Initially load and render notes
});
