// scripts/NoteAPI.js

const NOTES_STORAGE_KEY = 'app-notes'; // Key for localStorage
let notes = []; // This array will hold all our note objects

/**
 * Saves the 'notes' array to the browser's localStorage.
 * The array is converted to a string so it can be stored.
 */
function saveNotes() {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Loads notes from localStorage when the app starts.
 */
export function loadNotes() {
    const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
    
    // If there are no stored notes, create a welcome note.
    if (notes.length === 0) {
        createNote('Welcome!', 'This is your first note. Click a slot on the calendar to create an event!');
    }
}

/**
 * Returns all notes.
 */
export function getNotes() {
    return [...notes].sort((a, b) => b.id - a.id); // Return a sorted copy
}

/**
 * Returns a specific note by ID.
 */
export function getNote(id) {
    return notes.find(n => n.id === id);
}

/**
 * Creates a new note object and adds it to our 'notes' array.
 */
export function createNote(title, content = '', day = null, hour = null) {
    const newNote = {
        id: Date.now().toString(),
        title: title || 'New Note',
        content: content,
        day: day,
        start_hour: hour !== null ? `${String(hour).padStart(2, '0')}:00` : null,
    };

    notes.push(newNote);
    saveNotes();
    return newNote; // Return the new note for immediate selection
}

/**
 * Deletes a note from the 'notes' array by its ID.
 */
export function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    // Select the next available note.
    return (notes.length > 0) ? notes.sort((a,b) => b.id - a.id)[0].id : null;
}

/**
 * Updates an existing note.
 */
export function updateNote(id, newTitle, newContent, newDay, newStartHour) {
    const note = notes.find(n => n.id === id);
    if (note) {
        note.title = newTitle;
        note.content = newContent;
        note.day = newDay || null;
        note.start_hour = newStartHour || null;
        saveNotes();
    }
}
