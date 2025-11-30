Brandon’s Notes App

  A full-stack note-taking application built with Node.js, vanilla JavaScript, HTML/CSS, and SQLite.
  This project includes a custom backend API, a persistent SQL database, and a dark-mode responsive UI.
  Perfect for learning full-stack fundamentals, CRUD operations, REST APIs, and lightweight database integration.

Features
    Frontend
        * Clean dark-mode UI
        * Create, edit, and delete notes
        * Real-time updates without page reload
        * Mobile-friendly layout
        * Smooth transitions and modern styling
    Backend
      * Pure Node.js HTTP server (no Express)
      * REST API endpoints for notes:
          - POST /notes — create a note
          - GET /notes — list all notes
          - GET /notes/:id — get a single note
          - PUT /notes/:id — update a note
          - DELETE /notes/:id — delete a note
      * Automatic SQLite table creation
      * ISO timestamps for created/updated notes
      * JSON request/response handling
    Database
        * Uses SQLite (notes.db)
        * Persistent storage
        * Auto-incrementing IDs
        * Columns:
            - id
            - title
            - body
            - created_at
            - updated_at

            
Project Structure
          backend-training/
          │
          ├── index.js              # Node.js backend server (API + static files)
          ├── notes.db              # SQLite database (auto-created)
          │
          ├── public/
          │   ├── index.html        # Dark-mode UI + layout
          │   └── app.js            # Frontend logic (fetch calls)
          │
          └── README.md             # Project documentation



Installation & Setup

1. Clone or download the project
    ```bash
    git clone <your-repo-url>
    cd backend-training
    ```
3. Install dependencies
4. Start the server
5. Open the app in your browser

