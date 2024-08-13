// Load the notes and categories from localStorage when the page loads
window.onload = function() {
    loadNotes();
    loadCategories();
};

// Function to save a note with a timestamp and category
function saveNote() {
    const noteContent = document.getElementById('note').value.trim();
    const noteCategory = document.getElementById('category').value;
    if (noteContent) {
        const timestamp = new Date().toLocaleString();
        const note = { content: noteContent, time: timestamp, category: noteCategory };
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        document.getElementById('note').value = '';  // Clear the textarea
        loadNotes();
    } else {
        alert('Note cannot be empty.');
    }
}

// Function to load and display notes
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';  // Clear existing notes
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <p>${note.content}</p>
                <span class="timestamp">Saved on: ${note.time}</span>
                <span class="category">[${note.category}]</span>
            </div>
            <button onclick="deleteNote(${index})">Delete</button>`;
        noteList.appendChild(li);
    });
}

// Function to delete a specific note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Function to clear all notes
function clearAllNotes() {
    if (confirm('Are you sure you want to clear all notes?')) {
        localStorage.removeItem('notes');
        loadNotes();
    }
}

// Function to search through notes
function searchNotes() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(searchQuery));
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';  // Clear existing notes
    filteredNotes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <p>${note.content}</p>
                <span class="timestamp">Saved on: ${note.time}</span>
                <span class="category">[${note.category}]</span>
            </div>
            <button onclick="deleteNote()">Delete</button>`;
        noteList.appendChild(li);
    });
}

// Function to add a new category (folder)
function addCategory() {
    const newCategory = document.getElementById('newCategory').value.trim();
    if (newCategory) {
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        if (!categories.includes(newCategory)) {
            categories.push(newCategory);
            localStorage.setItem('categories', JSON.stringify(categories));
            loadCategories();
            document.getElementById('newCategory').value = '';  // Clear the input
        } else {
            alert('Category already exists.');
        }
    } else {
        alert('Folder name cannot be empty.');
    }
}

// Function to load categories (folders) into the dropdown
function loadCategories() {
    let categories = JSON.parse(localStorage.getItem('categories')) || ['General', 'AI', 'Project Management'];
    const categorySelect = document.getElementById('category');
    categorySelect.innerHTML = '';  // Clear existing options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}
