const mongoose = require('mongoose');

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://suyashgaikwad22_db_user:n7qj9eRc590rQx5t@cluster0.fr2cm68.mongodb.net/Cohort"
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Error Connecting to DB", err);
    });
}

module.exports = connectToDB;