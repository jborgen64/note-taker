// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();

//Set port 
const PORT = process.env.PORT || 3000;

//Data parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Router
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

//allows bringing in CSS & JS files to html
app.use(express.static(path.join(__dirname, 'public')));

//===============================================================

//GET
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
    var getNotes = JSON.parse(data);
    res.send(getNotes);
});
});

//POST
app.post('/api/notes', (req, res) => {
   fs.readFile('db/db.json', 'utf8', (err,data) => {
       if (err) throw err;
    let jasonArray = JSON.parse(data)
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: jasonArray.length + 1
    };
    jasonArray.push(note);

    fs.writeFile('db/db.json', JSON.stringify(jasonArray, null, 2), (err) => {
        if (err) throw err;
      });
    });
});

//DELETE
app.delete('/api/notes:id', (req, res) => {
    
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let noteDel = req.param.id;
        let jasonArray = JSON.parse(data);
        
        for (var i = 0; i < jasonArray.length; i++) {
            if (jasonArray[i] === noteDel) {
                jasonArray.splice(jasonArray[i], 1);
            };
        };

        fs.writeFile('db/db.json', JSON.stringify(jasonArray, null, 2), (err) => {
            if (err) throw err;
          });
    });
});


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });