require("dotenv").config();
const connection = require("../configs/db");

module.exports = {
  insertItem: data => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO item SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },
  getItem: (search, page) => {
    return new Promise((resolve, reject) => {
      if (search) {
        connection.query(
          "SELECT * FROM item",
          [`%${search}%`],
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(err);
            }
          }
        );
      } else if (page) {
        connection.query(
          "SELECT * FROM item LIMIT",
          page * 10 - 10 + ", 10",
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(err);
            }
          }
        );
      } else {
        connection.query("SELECT * FROM item", (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
      }
    });
  },
  updateItem: (id_item, data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE item SET ? WHERE id_item = ?",
        [data, id_item],
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
  deleteItem: id_item => {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM item WHERE id_item = ?",
        id_item,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }
};
