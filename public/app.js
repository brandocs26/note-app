let editingNoteId = null;

async function fetchNotes() {
    const res = await fetch('/notes');
    const data = await res.json();
    return data.notes || [];
}

async function renderNotes() {
    const notes = await fetchNotes();
    const container = document.getElementById('notes');
    container.innerHTML = '';

    if (!notes.length) {
        container.textContent = 'No notes yet.';
        return;
    }

    notes.forEach((note) => {
        const div = document.createElement('div');
        div.className = 'note';

        const header = document.createElement('div');
        header.className = 'note-header';

        const title = document.createElement('span');
        title.className = 'note-title';
        title.textContent = note.title;

        const buttons = document.createElement('div');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.style.marginRight = '0.5rem';
        editBtn.onclick = () => startEditing(note);

        // Delete button
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = async () => {
            await fetch(`/notes/${note.id}`, { method: 'DELETE' });
            // If we deleted the note currently being edited, exit edit mode
            if (editingNoteId === note.id) {
                stopEditing();
            }
            renderNotes();
        };

        buttons.appendChild(editBtn);
        buttons.appendChild(delBtn);

        header.appendChild(title);
        header.appendChild(buttons);

        const body = document.createElement('div');
        body.className = 'note-body';
        body.textContent = note.body;

        div.appendChild(header);
        div.appendChild(body);
        container.appendChild(div);
    });
}

function startEditing(note) {
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-edit');

    editingNoteId = note.id;
    titleInput.value = note.title;
    bodyInput.value = note.body;
    submitBtn.textContent = 'Save Changes';
    cancelBtn.style.display = 'inline-block';
}

function stopEditing() {
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-edit');

    editingNoteId = null;
    titleInput.value = '';
    bodyInput.value = '';
    submitBtn.textContent = 'Add Note';
    cancelBtn.style.display = 'none';
}

async function setupForm() {
    const form = document.getElementById('note-form');
    const titleInput = document.getElementById('title');
    const bodyInput = document.getElementById('body');
    const cancelBtn = document.getElementById('cancel-edit');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        if (!title || !body) return;

        if (editingNoteId === null) {
            // Create new note (POST)
            await fetch('/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body }),
            });
        } else {
            // Update existing note (PUT)
            await fetch(`/notes/${editingNoteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body }),
            });
        }

        stopEditing();
        renderNotes();
    });

    cancelBtn.addEventListener('click', () => {
        stopEditing();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    await setupForm();
    await renderNotes();
});