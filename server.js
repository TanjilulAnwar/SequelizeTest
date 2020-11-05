//Reference: https://bezkoder.com/node-js-express-sequelize-mysql/
//Reference: https://bezkoder.com/sequelize-associate-one-to-many/
//Reference: https://bezkoder.com/sequelize-associate-many-to-many/
//Reference: https://github.com/bezkoder/node-js-jwt-auth
//Reference: https://bezkoder.com/node-js-jwt-authentication-mysql/

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/index");
const Role = db.role;
db.sequelize.sync().then(() => {
  //initial();
  });


  function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
    Role.create({
      id: 2,
      name: "moderator"
    });
    Role.create({
      id: 3,
      name: "author"
    });
    Role.create({
      id: 4,
      name: "admin"
    });

  }

//for renewed database eachtime
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

var corsOptions = {
  origin: "http://localhost:8081"//frontend
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sequelize application." });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/tags.routes")(app);
require("./app/routes/author.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

