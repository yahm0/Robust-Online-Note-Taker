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

