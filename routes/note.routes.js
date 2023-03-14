const express = require("express")
const router = express.Router()

const Note = require("../models/Note.model")


//Post: add a new note to a board
router.post("/notes/:boardId",(req,res,next)=>{

    const {boardId}= req.params

   
    const {title,description,checklist,deadline}  = req.body

    const newNote = {title,description,checklist,deadline,board : boardId}  


    Note.create(newNote)
        .then(responseNote=>{
            console.log(`note "${title}" has been created`)
            
            res.json(responseNote)
        })
        .catch(err=>{
            console.log(`Error creating the note ${title}`,err)
            res.status(500).json(err)
        })
   
})

//Get: get all the notes from a board

router.get("/notes/:boardId",(req,res,next)=>{

    const {boardId} = req.params

    Note.find({board: boardId})
        .then(responseNote=>{
            res.json(responseNote)
            console.log(`notes of board ${boardId} sent to client`)
        })
        .catch(err=>{
            console.log(`Error getting the notes from the board${boardId}`,err)
            res.status(500).json(err)
        })
})

router.get("/notes/:boardId/:noteId",(req,res,next)=>{
    
    const {boardId, noteId} = req.params
})



module.exports = router;