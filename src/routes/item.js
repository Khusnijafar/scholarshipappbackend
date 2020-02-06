const express = require("express");
const Route = express.Router();
const itemController = require("../controllers/item");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

Route.post("/", upload.single("image"), itemController.insertItem)
  .get("/", itemController.getItem)
  .patch("/:id_item", itemController.updateItem)
  .delete("/:id_item", itemController.deleteItem);

module.exports = Route;
