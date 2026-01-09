// scripts/NoteView.js

export default class NoteView {
    constructor(root) {
        this.root = root;
        this.elements = {}; // Store references to relevant DOM elements

        this.elements.editor = root.querySelector('#editor');
        this.elements.titleInput = root.querySelector('#editor-title-input');
        this.elements.fileList = root.querySelector('#file-list');
        this.elements.newNoteButton = root.querySelector('#new-note');
        this.elements.propDayInput = root.querySelector('#prop-day');
        this.elements.propStartInput = root.querySelector('#prop-start-hour');
        this.elements.gridItems = root.querySelectorAll('.grid-item');
        
        // Ensure sections are referenceable for showSection (even if not used for mobile-only navigation)
        this.elements.sidebar = root.querySelector('#sidebar');
        this.elements.editorArea = root.querySelector('#editor-area');
        this.elements.calendarArea = root.querySelector('#calendar-area');
    }


    /**
     * Displays the list of note titles in the sidebar.
     * @param {Array} notes - The array of note objects.
     * @param {string} currentNoteId - The ID of the currently selected note.
     * @param {Function} onNoteSelect - Callback for when a note is selected.
     * @param {Function} onNoteDelete - Callback for when a note is deleted.
     */
    renderFileList(notes, currentNoteId, onNoteSelect, onNoteDelete) {
        this.elements.fileList.innerHTML = ''; // Clear the old list first
        
        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.textContent = note.title;
            listItem.dataset.fileId = note.id;

            if (note.id === currentNoteId) {
                listItem.classList.add('active');
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-file-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', (event) => {
                event.stopPropagation();
                onNoteDelete(note.id);
            });

            listItem.appendChild(deleteBtn);
            listItem.addEventListener('click', () => onNoteSelect(note.id));
            this.elements.fileList.appendChild(listItem);
        });
    }


    /**
     * Displays events on the calendar by coloring in the correct grid box.
     * @param {Array} notes - The array of note objects.
     */
    renderCalendarEvents(notes) {
        this.elements.gridItems.forEach(item => {
            item.classList.remove('filled');
            item.textContent = '';
        });

        notes.forEach(note => {
            if (note.day && note.start_hour) {
                const startHour = parseInt(note.start_hour);
                
                const gridItem = this.root.querySelector(`.grid-item[data-day="${note.day}"][data-hour="${startHour}"]`);
                if (gridItem) {
                    gridItem.classList.add('filled');
                    gridItem.textContent = note.title;
                }
            }
        });
    }


    /**
     * Updates the editor and property fields with the given note's data.
     * @param {Object|null} note - The note object to display, or null to clear.
     */
    updateEditor(note) {
        if (note) {
            this.elements.titleInput.value = note.title;
            this.elements.editor.value = note.content;
            this.elements.propDayInput.value = note.day || '';
            this.elements.propStartInput.value = note.start_hour || '';
        } else {
            this.elements.titleInput.value = 'No File Selected';
            this.elements.editor.value = '';
            this.elements.propDayInput.value = '';
            this.elements.propStartInput.value = '';
        }
    }


    // Methods to attach event listeners from the App class
    onNewNoteButtonClick(handler) {
        this.elements.newNoteButton.addEventListener('click', handler);
    }

    onEditorInput(handler) {
        this.elements.editor.addEventListener('input', handler);
    }

    onTitleInput(handler) {
        this.elements.titleInput.addEventListener('input', handler);
    }

    onPropDayInput(handler) {
        this.elements.propDayInput.addEventListener('change', handler);
    }

    onPropStartHourInput(handler) {
        this.elements.propStartInput.addEventListener('change', handler);
    }

    onCalendarGridItemClick(handler) {
        this.elements.gridItems.forEach(item => {
            item.addEventListener('click', () => {
                const day = item.dataset.day;
                const hour = parseInt(item.dataset.hour);
                handler(day, hour);
            });
        });
    }
}
