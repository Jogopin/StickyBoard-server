const { UnauthorizedError } = require("express-jwt");

module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ message: "This route does not exist" });
  });
  
  // This middleware handles errors that occur within the application
  app.use((err, req, res, next) => {
    // If the error is an UnauthorizedError, handle it separately
    if (err instanceof UnauthorizedError) {
      // Log a shorter message for UnauthorizedError 
      console.error("Unauthorized request", req.method, req.path);
      // Send a response with the error status and message
      return res.status(err.status).json({ message: err.message });
    }

     // Log the error details for other errors
    console.error("ERROR", req.method, req.path, err);
    
    
    // If the response headers have not been sent, send a response
    // with a 500 status code and an error message
    if (!res.headersSent) {
      res.status(500).json({
        message: "Internal server error. Check the server console",
      });
    }
  });
};
