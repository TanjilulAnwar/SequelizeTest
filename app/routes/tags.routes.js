module.exports = app => {
    const tags = require("../controllers/tag.controller");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tags.create);
  
    // Retrieve all Tutorials
    router.get("/", tags.findAll);

        // Create a new Tutorial
        router.post("/addtag", tags.addTutorial);
        router.get("/:id", tags.findById);
  
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
  
    app.use('/api/tags', router);
  };