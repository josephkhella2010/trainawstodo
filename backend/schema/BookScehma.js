const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "Book.db"),
});

// Define Todo schema/model
const Book = sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT, // percentage, e.g. 10 for 10%
      allowNull: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced and Todo table created");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Export sequelize and Todo model
module.exports = { sequelize, Book };
