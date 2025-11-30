/*
    Brandon Notes API

    Each note has:
      - id
      - title
      - body
      - created_at
      - updated_at

    Routes:
      GET       /status         -> health check
      GET       /hello          -> simple greeting
      POST      /notes          -> create a note
      GET       /notes          -> list all notes
      GET       /notes/:id      -> get a single note
      PUT       /notes/:id      -> update a note
      DELETE    /notes/:id      -> delete a note
*/

import { createServer } from "http";
import { readFile } from "fs";
import { join } from "path";
const sqlite3 = require('sqlite3').verbose();

// --- Setup SQLite database ---
const db = new sqlite3.Database('notes.db');

// Create notes table if it doesnt exist
db.run(`
    CREATE TABLE IF NOT EXISTS notes (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL, 
        body        TEXT NOT NULL,
        created_at  TEXT NOT NULL,
        updated_at  TEXT NOT NULL
    )
`);

// Helper to send JSON responses
function sendJson(res, statusCode, data){
    res.writeHead(statusCode, { 'Content-Type': 'application/json'});
    res.end(JSON.stringify(data));
}

// Helper to read JSON body from request
function readJsonBody(req, callback){
    let body = "";
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {   
        if(!body){
            callback(null, {}); // empty body
            return;
        }
        try{
            const data = JSON.parse(body);
            callback(null, data)
        } catch(err){
            callback(err);
        }
    });
}

// Create HTTP server
const server = createServer((req, res) => {

});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});