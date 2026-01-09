// scripts/main.js

import App from './App.js';


/**
 * This script runs when the entire HTML document has been loaded.
 * It serves as the entry point for our modular note-taking app.
 */
document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('app');
    const app = new App(rootElement);
    app.init();
});
