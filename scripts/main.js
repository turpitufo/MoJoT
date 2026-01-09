// scripts/main.js

import App from './App.js';

document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById('app');
    const app = new App(rootElement);
    app.init();
});
