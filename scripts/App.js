// scripts/App.js

import * as NoteAPI from './NoteAPI.js';
import NoteView from './NoteView.js';

export default class App {
    constructor(rootElement) {
        this.view = new NoteView(rootElement);
        this.currentNoteId = null;

        // Bind event handlers to this instance
        this._handleNewNote = this._handleNewNote.bind(this);
        this._handleEditorInput = this._handleEditorInput.bind(this);
        this._handleTitleChange = this._handleTitleChange.bind(this);
        this._handlePropDayChange = this._handlePropDayChange.bind(this);
        this._handlePropStartHourChange = this._handlePropStartHourChange.bind(this);
        this._handleCalendarGridItemClick = this._handleCalendarGridItemClick.bind(this);
        this._handleNoteSelect = this._handleNoteSelect.bind(this);
        this._handleNoteDelete = this._handleNoteDelete.bind(this);
    }

    init() {
        NoteAPI.loadNotes();
        this._refreshApp();

        this.view.onNewNoteButtonClick(this._handleNewNote);
        this.view.onEditorInput(this._handleEditorInput);
        this.view.onTitleInput(this._handleTitleChange);
        this.view.onPropDayInput(this._handlePropDayChange);
        this.view.onPropStartHourInput(this._handlePropStartHourChange);
        this.view.onCalendarGridItemClick(this._handleCalendarGridItemClick);

        // Automatically select the most recent note to show first.
        const allNotes = NoteAPI.getNotes();
        if (allNotes.length > 0) {
            this._selectNote(allNotes[0].id);
        }
    }

    _refreshApp() {
        const allNotes = NoteAPI.getNotes();
        this.view.renderFileList(allNotes, this.currentNoteId, this._handleNoteSelect, this._handleNoteDelete);
        this.view.renderCalendarEvents(allNotes);
        const selectedNote = NoteAPI.getNote(this.currentNoteId);
        this.view.updateEditor(selectedNote);
    }

    _selectNote(id) {
        this.currentNoteId = id;
        this._refreshApp();
    }

    _handleNewNote() {
        const newNote = NoteAPI.createNote();
        this._selectNote(newNote.id);
    }

    _handleNoteSelect(noteId) {
        this._selectNote(noteId);
    }

    _handleNoteDelete(noteId) {
        const nextNoteId = NoteAPI.deleteNote(noteId);
        this._selectNote(nextNoteId);
    }

    _handleEditorInput() {
        if (!this.currentNoteId) return;
        const note = NoteAPI.getNote(this.currentNoteId);
        if (note) {
            NoteAPI.updateNote(this.currentNoteId, note.title, this.view.elements.editor.value, note.day, note.start_hour);
            this.view.renderFileList(NoteAPI.getNotes(), this.currentNoteId, this._handleNoteSelect, this._handleNoteDelete);
        }
    }

    _handleTitleChange() {
        if (!this.currentNoteId) return;
        const note = NoteAPI.getNote(this.currentNoteId);
        if (note) {
            NoteAPI.updateNote(this.currentNoteId, this.view.elements.titleInput.value, note.content, note.day, note.start_hour);
            this._refreshApp();
        }
    }

    _handlePropDayChange() {
        if (!this.currentNoteId) return;
        const note = NoteAPI.getNote(this.currentNoteId);
        if (note) {
            const newValue = this.view.elements.propDayInput.value;
            NoteAPI.updateNote(this.currentNoteId, note.title, note.content, newValue, note.start_hour);
            this._refreshApp();
        }
    }

    _handlePropStartHourChange() {
        if (!this.currentNoteId) return;
        const note = NoteAPI.getNote(this.currentNoteId);
        if (note) {
            const newValue = this.view.elements.propStartInput.value;
            NoteAPI.updateNote(this.currentNoteId, note.title, note.content, note.day, newValue);
            this._refreshApp();
        }
    }

    _handleCalendarGridItemClick(day, hour) {
        const newNote = NoteAPI.createNote('New Calendar Note', '', day, hour);
        this._selectNote(newNote.id);
    }
}
