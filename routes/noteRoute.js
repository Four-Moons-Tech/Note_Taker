const router = require('express').Router();
const {readFile,writeFile} = require('fs/promises'); 
const { v4: uuidv4 } = require('uuid');


// GET Route for retrieving all the feedback
router.get('/', (req, res) =>
  readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
router.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log(req.body)
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const note = {
      
      title,
      text,
      id: uuidv4(),
    };

    readFile('./db/db.json').then((data)=> {
     let notes = JSON.parse(data)
     console.log(notes)
     notes.push(note)
     writeFile('./db/db.json', JSON.stringify(notes)).then ((data)=> {
      return res.json(notes)
     })
    })

  
  } else {
    res.json('Error in posting note');
  }
});

router.delete('/:id', (req, res) => {
   console.log(req.params.id)
   readFile ('./db/db.json').then((data)=> {
    let notes = JSON.parse(data)
    let filteredNote = notes.filter(note => note.id !== req.params.id)
    writeFile('./db/db.json', JSON.stringify(filteredNote)).then ((data)=> {
      return res.json(filteredNote)
     })
   })
})

module.exports = router;
