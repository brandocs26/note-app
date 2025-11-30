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
import { send } from "process";
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
    console.log(`${req.method} ${req.url}`);
    // --- Serve frontend files ---
    if(req.url === '/' && req.method === 'GET'){
        const filePath = join(__dirname, 'public', 'index.html');
        readFile(filePath, (err, content) => {
            if(err){
                sendJson(res, 500, {error: 'Error loading page'});
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content);
        });
        return;
    }
    if(req.url === '/app.js' && req.method === 'GET'){
        const filePath = join(__dirname, 'public', 'app.js');
        readFile(filePath, (err, content) => {
            if(err){
                sendJson(res, 500, {error: 'Error loading script'});
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(content);
        });
        return;
    }

    // --- GET /status ---
    if(req.url === '/status' && req.method === 'GET'){
        sendJson(res, 200, {
            status: 'ok',
            message: 'Brandon Notes API is running'
        });
        return;
    }

    // TODO --- GET /hello ---


    // TODO --- POST /notes [create note] ---


    // TODO --- GET /notes [list all notes] ---



    // TODO --- GET /notes/:id [single note] ---



    // TODO --- PUT /notes/:id [update note] ---


    // TODO --- DELETE /notes/:id [delete note] ---


    // 404 fallback
    sendJson(res, 404, {error: 'Not found'});
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});