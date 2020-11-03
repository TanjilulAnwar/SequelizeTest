module.exports = app => {
    const authors = require("../controllers/author.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", authors.create);
  
    // Retrieve all authors
    router.get("/", authors.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // // create a comment under tutorials
    // router.post("/comments/", tutorials.createComment);
  
    // // create a comment under tutorials
    // router.get("/comments/:id", tutorials.findCommentById);

    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete a Comment with id
    // router.delete("/comments/:id", tutorials.deleteComment);
  
    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);
  
    app.use('/api/author', router);
  };