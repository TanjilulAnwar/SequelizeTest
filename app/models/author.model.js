module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("author", {
      name: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Author;
  };