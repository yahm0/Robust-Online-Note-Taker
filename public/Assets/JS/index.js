document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.querySelector('form');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const noteList = document.querySelector('.list-group');

    let activeNote = {}; // Initialize activeNote

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        handleNoteSave();
    });

    function handleNoteSave() {
        const noteToSave = {
            title: noteTitle.value.trim(),
            text: noteText.value.trim(),
            id: activeNote.id || undefined // Use existing id if editing, undefined if new
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
            activeNote = {}; // Clear activeNote after saving
            loadAndRenderNotes();
        })
        .catch(err => console.error('Failed to save note:', err));
    }

    function loadAndRenderNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(notes => {
                noteList.innerHTML = ''; // Clear the list first
                notes.forEach(note => {
                    const noteItem = document.createElement('li');
                    noteItem.classList.add('list-group-item');
                    noteItem.innerHTML = `${note.title} <i class="fas fa-trash-alt float-right text-danger" data-id="${note.id}"></i>`;

                    // Add click event listener for editing and deleting
                    noteItem.querySelector('.fa-trash-alt').addEventListener('click', function() {
                        deleteNote(note.id);
                    });
                    noteItem.addEventListener('click', function() {
                        editNote(note);
                    }, true); // Use capture phase to avoid conflict with delete icon

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
        activeNote = note; // Set activeNote to the note to be edited
        noteTitle.value = note.title; // Set input fields to note values
        noteText.value = note.text;
    }

    loadAndRenderNotes(); // Initially load and render notes
});
