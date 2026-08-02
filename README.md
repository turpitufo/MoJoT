# MoJoT
A scratchpad for your week — a minimal notes & calendar app built with vanilla JavaScript and persistent storage.

**Live demo:** https://turpitufo.github.io/MoJoT/

## About this project

I built this project to learn how JS persistent storage works, after being inspired by a passion project called noto.ooo.

I followed [this tutorial](https://www.youtube.com/watch?v=01YKQmia2Jw&t=148s) (*Build a Notes App with JavaScript & Local Storage — No Frameworks*) for the core notes functionality, with one deliberate deviation: the "source of truth" approach. Most local storage tutorials use a single global array, so I confirmed with AI that this was the right approach for my case rather than following the more complex pattern in the video. Notes are edited in memory via one global array (`let notes = []`) rather than reading/writing local storage on every event — which I believe is the more efficient approach, though it's something I'd like to validate further.

The grid-items in the HTML let JavaScript auto-fill the hour and date when a cell is clicked, and let it render a note back onto the grid using its `data-day` and `data-hour` attributes.

Much of the JavaScript here was beyond my starting skill level. I worked through the tutorial and w3schools' event listener guides, which led to a few early bugs, and used AI assistance for parts of the implementation — particularly `renderCalendarEvents`.

## What I built myself

- the HTML/CSS
- the `day` and `start_hour` note properties used for calendar functionality
- the calendar view itself — the tutorial only covers rendering the notes list; the calendar logic was my own implementation:

```js
for (i = 0; i < notes.length; i++) {
	const note = notes[i];
	if (note.day && note.start_hour !== null) {
		const startHourNumber = note.start_hour;
		const gridItem = document.querySelector('.grid-item[data-day="' + note.day + '"][data-hour="' + startHourNumber + '"]');
		
		if (gridItem) {
			gridItem.classList.add('filled'); 
			gridItem.textContent = note.title;
		}
	}
}
```

This loops through every note. If a note has both `day` and `start_hour` set, it retrieves the hour, locates the matching grid cell, and updates its content and styling.

For mobile, I explored an alternative flexbox layout, but the approaches I tried introduced more issues than they solved, so the current layout remains simplified for now.

## In the future

- [ ] Overlapping calendar notes currently stack on top of each other. I plan to implement a cleaner layout for this.

## Helps

- [Notes App with JavaScript & Local Storage](https://www.youtube.com/watch?v=01YKQmia2Jw&t=148s)
- [W3Schools: event listeners](https://www.w3schools.com/js/js_events.asp)
- duck.ai
