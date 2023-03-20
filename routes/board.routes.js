const express = require("express")
const router = express.Router()

const Board = require("../models/Board.model")
const Note = require("../models/Note.model")


//Post: creating a new Board
router.post("/boards",(req,res,next)=>{

    const {name} = req.body

    Board.create({name})
        .then(responseBoard=>{
            console.log(`Board "${name}" has been created`)
            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error creating the Board "${name}"`,err)
            res.status(500).json(err)
        })
})

//Get: Getting all boards
router.get("/boards",(req,res,next)=>{

    
    Board.find()
        .then(responseBoard=>{
            
            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error getting the Boards`,err)
            res.status(500).json(err)
        })
})

router.get("/boards/:boardId",(req,res,next)=>{

    const {boardId} = req.params
    
    Board.findById(boardId)
        .then(responseBoard=>{
            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error getting the Board ${boardId}`,err)
            res.status(500).json(err)
        })
})

// Delete: delete the board and all its notes
router.delete("/boards/:boardId",(req,res,next)=>{

    const {boardId}=req.params
    let response= {}

    Board.findByIdAndDelete(boardId)
        .then(responseBoard=>{
            response ={responseBoard}
            console.log("board deleted")
            return Note.deleteMany({"board":boardId})
        })
        .then(responseNote=>{
            console.log("notes deleted",responseNote)
            response = {...response, responseNote}
            res.json(response)
        })
        .catch(err=>{
            console.log(`Error deleting the Board ${boardId}`,err)
            res.status(500).json(err)
        })

})

// //Post: add a new note
// router.post("/boards/:id/notes",(req,res,next)=>{

//     const boardId = req.params.id
//     const {title,description,checklist,deadline}  = req.body
//     const newNote = {title,description,checklist,deadline}  

//     Board.findByIdAndUpdate(boardId,{ $push: {notes: newNote}},{new:true})
//         .then(responseBoard=>{
//             console.log(`note "${title}" has been created`)
//             res.json(responseBoard)

//         })
//         .catch(err=>{
//             console.log(`Error creating the note ${title}`,err)
//             res.status(500).json(err)
//         })
   
// })

// //Get: get all the notes from a board

// router.get("/boards/:id/notes",(req,res,next)=>{

//     const boardId = req.params.id

//     Board.findById(boardId)
//         .then(responseBoard=>{
//             res.json(responseBoard.notes)
//         })
//         .catch(err=>{
//             console.log(`Error getting the notes from the board${boardId}`,err)
//             res.status(500).json(err)
//         })
// })



module.exports = router;