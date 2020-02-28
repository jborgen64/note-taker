// Dependencies
const express = require('express');
const path = require('path');

const app = express();

//Set port 
const PORT = process.env.PORT || 3000;

//Data parse
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Router
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'notes.html'));
});


app.get('/api/tables', (req, res) => {
  return res.json(tables);
});

app.get('/api/waitlist', (req, res) => {
  return res.json(waitlist);
});

app.post('/api/clear', (req, res) => {
  tables.empty();
  return res.json(clear);
});

app.post('/api/tables', (req, res) => {
  const data = req.body;
  
  if (tables.length < 6) {
    tables.push(data);
  }   else {
    waitlist.push(data);
  }

  return res.json(data);
});

//Listen on PORT

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });