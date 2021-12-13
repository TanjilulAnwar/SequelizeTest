const db = require("..");
const Tutorial = db.tutorials;
const Author = db.authors;
const Op = db.Sequelize.Op;

// Create and Save a new Author
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Author
  const author = {
    name: req.body.name,
    title: req.body.title,
    email: req.body.email,
    status: req.body.status ? req.body.status : false,
  };

  // Save Author in the database
  Author.create(author)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  Author.findAll({
    include: ["tutorials"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// // Retrieve all Tutorials from the database.
// // exports.findAll = (req, res) => {
// //     const title = req.query.title;
// //     var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

// //     Tutorial.findAll({ where: condition })
// //       .then(data => {
// //         res.send(data);
// //       })
// //       .catch(err => {
// //         res.status(500).send({
// //           message:
// //             err.message || "Some error occurred while retrieving tutorials."
// //         });
// //       });
// //   };
// // Find a single Tutorial with an id

//   exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Tutorial.findByPk(id,{
//       include: ["comments"]
//     })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
//   };

//   exports.findCommentById = (req, res) => {
//     const id = req.params.id;
//      Comment.findByPk(id, { include: ["tutorial"] })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Comment with id=" + id
//         });
//       });
//   };

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;

//     Tutorial.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty !`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Tutorial with id=" + id
//         });
//       });
//   };

//   // Delete a Tutorial with the specified id in the request
// exports.deleteComment = (req, res) => {
//   const id = req.params.id;

//   Comment.destroy({
//     where: { id: id },cascade:false
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Comment was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Comment with id=${id}. Maybe comment was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id=" + id
//       });
//     });
// };
// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Tutorial.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id=" + id
//         });
//       });
//   };
// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//     Tutorial.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Tutorials were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all tutorials."
//         });
//       });
//   };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };
