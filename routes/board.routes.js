const express = require("express")
const router = express.Router()

const Board = require("../models/Board.model")
const Note = require("../models/Note.model")
const { isAuthenticated } = require("../middleware/jwt.middleware")


//POST: create a new Board
router.post("/boards",isAuthenticated,(req,res,next)=>{


    const {name} = req.body
    const userId = req.payload._id
    
    Board.create({name, author:userId})
        .then(responseBoard=>{
            console.log(`Board "${name}" has been created`)
            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error creating the Board "${name}"`,err)
            res.status(500).json(err)
        })
})

//GET: all boards
router.get("/boards",isAuthenticated,(req,res,next)=>{

    const userId = req.payload._id
    
    Board.find({author:userId})
        .then(responseBoard=>{
            
            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error getting the Boards`,err)

            res.status(500).json({ message: "Internal server error." });
        })
})

//GET: one board
router.get("/boards/:boardId",isAuthenticated,(req,res,next)=>{

    const {boardId} = req.params
    const userId = req.payload._id
    
    Board.findById(boardId)
        .then(responseBoard=>{

            //check if the user is the author
            if(responseBoard.author.toString() !== userId.toString()){

                return res.status(403).json({message: "You are not authorized to access this board."})
            }

            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error getting the Board ${boardId}`,err)

            res.status(500).json({ message: "Internal server error." });
        })
})

//PUT: update one board
router.put(`/boards/:boardId`,isAuthenticated,(req,res,next)=>{

    const {boardId} = req.params
    const {name} = req.body
    const userId = req.payload._id

    Board.findOneAndUpdate({ _id: boardId, author: userId },{name},{ new: true })
        .then(responseBoard=>{

            if (!responseBoard) {
                return res.status(404).json({ message: "Board not found or you are not authorized to update this board." });
              }
            console.log(`Board ${boardId} updated correctly`,responseBoard)
            res.json(responseBoard)
        })
        .catch(err=>{
            console.log(`Error updating the board`,err);
            res.status(500),json(err)
        })
})

// DELETE: delete the board and all its notes
router.delete("/boards/:boardId", isAuthenticated, (req, res, next) => {
    const { boardId } = req.params;
    const userId = req.payload._id;
    let deletedBoard;
  
    Board.findOneAndDelete({ _id: boardId, author: userId })
      .then((board) => {
        deletedBoard = board;
  
        if (!deletedBoard) {
          return res.status(404).json({ message: "Board not found or you are not authorized to delete this board." });
        }
  
        console.log("Board deleted");

        return Note.deleteMany({ "board": boardId });
      })
      .then((deletedNotes) => {
        console.log("Notes deleted", deletedNotes);
        res.json({ board: deletedBoard, notes: deletedNotes });
      })
      .catch((err) => {
        console.log(`Error deleting the Board ${boardId}`, err);
        res.status(500).json({ message: "Internal server error." });
      });
  });



module.exports = router;