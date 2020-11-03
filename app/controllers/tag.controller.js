const db = require("..");
const Tutorial = db.tutorials;
const Tag = db.tag;

exports.create = (req,res) => {
     
      // Validate request
      if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

      // Create a Tag
    const tag = {
        name: req.body.name,
        
      };
    

  Tag.create(tag)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tag."
    });
  });
  };

  exports.findAll = (req,res) => {
  Tag.findAll({
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
          }
        //   through: {
        //   attributes: ["tag_id", "tutorial_id"],
        // },
        },
      ],
    })
    .then(data => {
        res.send(data);
      }).catch(err=>{
        res.status(500).send({
          message:
         err.message || "Some error occurred while retrieving tags."
        })
      })
  };

  exports.findById = (req,res) => {
    const id= req.params.id;
   
    Tag.findByPk(id, {
      include: [
        {
          model: Tutorial, 
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
        }
        },
      ],
    })
    .then(data => {
        res.send(data);
      }).catch(err=>{
        res.status(500).send({
          message:
         err.message || "Some error occurred while retrieving tags."
        })
      })
  };

  exports.addTutorial = (req,res) => {
   Tag.findByPk(req.body.tagId)
      .then((tag) => {
        if (!tag) {
            res.send("The tag wasn't found");
        }
        Tutorial.findByPk(req.body.tutorialId).then((tutorial) => {
          if (!tutorial) {
            res.send("The tutorial wasn't found");
          }
          tag.addTutorial(tutorial);
          res.send(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
         
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };

