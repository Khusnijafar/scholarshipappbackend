require("dotenv").config();
const connection = require("../configs/db");

module.exports = {
  register: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  login: email => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM user WHERE email = ?",
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },
  deleteUser: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM user WHERE id_user =?", id_user, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
};
