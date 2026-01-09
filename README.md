# MoJoT
A scratchpad for your week, minimal notes&amp;calendar app using vanilla JavaScript and persistent storage.

---

# SSW Project 

I did this project so I would learn about js persistent storage.
I saw some time ago a passion project called noto.ooo and was mesmerized. So I though this was a good progression.

I followed [this tutorial](https://www.youtube.com/watch?v=01YKQmia2Jw&t=148s)(# Build a Notes App with JavaScript & Local Storage (No Frameworks)) except for "source of truth", which was fun to learn, I noticed all the tutorials about it on local storage use one global array approach, quick question to ai confirmed that it was the best method for me rather than complicating things with the appoach in the video. We are editing an array of notes on ram rather than the local storage for every event with a global `let notes = []`, i mean as far as I understand ¯\_(ツ)_/¯

 We have grid-items in the HTML so javascript can automatically fill in hour and date when we click at an item, and so it can render from a note with data-day and data-hour.

The javascript was honestly above my level, I followed the video and w3school tutorials on event listeners, which caused problems in the first iterations. **I needed some AI help** for especially in renderCalendarEvents. 

And here is what I had to figure out and write 

- the http css files
- added `day`, `start_hour` properties to notes for calendar functionality
- js implementation of calendars since the video includes event listening and rendering for the notes list but calender was my implementation. 

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
}```


- We itirate every note, 
- if the note.day and note.start_hour both are not null we
	- get the number from time. 
- Change the style of the block, gridItem.


For mobile design I though of using a different flexbox, but it turns out lots of approaches just break and it needs lots of work. So it is simpler for now. 

# In the future
- [ ] I know creating calendar notes over each other looks like a bug now, but I will try a better implementation. 

## Helps

- https://www.youtube.com/watch?v=01YKQmia2Jw&t=148s
	- Notes App with JavaScript & Local Storage
- https://www.w3schools.com/js/js_events.asp
	- event listeners
- duck.ai
