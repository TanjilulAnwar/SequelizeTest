module.exports = app => {
  
    const tutorials = require("../controllers/tutorial.controller.js");
    const { authJwt } = require("../middleware");

  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/",[authJwt.verifyToken, authJwt.isAuthor], tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published",[authJwt.verifyToken, authJwt.isAdmin], tutorials.findAllPublished);

    // create a comment under tutorials
    router.post("/comments/", tutorials.createComment);
  
    // create a comment under tutorials
    router.get("/comments/:id", tutorials.findCommentById);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id",[authJwt.verifyToken, authJwt.isAuthor], tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id",[authJwt.verifyToken, authJwt.isAuthor], tutorials.delete);

    // Delete a Comment with id
    router.delete("/comments/:id", tutorials.deleteComment);
  
    // Delete all Tutorials
    router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };