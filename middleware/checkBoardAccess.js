const Board = require("../models/Board.model");

const checkBoardAccess = (req, res, next) => {
  const { boardId } = req.params;
  const userId = req.payload._id; 

  // Check if the user has access to the board (either as an author or through permissions)
  Board.findById(boardId)
    .then((responseBoard) => {
      if (responseBoard.author.toString() === userId.toString()) {
        next(); // User is the author or has permission, proceed to the route handler
      } else {
        res.status(403).json({ message: "You don't have access to this board" });
      }
    })
    .catch((err) => {
      console.log(`Error finding the board ${boardId}`, err);
      res.status(500).json(err);
    });
};

module.exports = checkBoardAccess;
