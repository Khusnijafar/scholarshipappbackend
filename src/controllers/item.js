require("dotenv").config();
const itemModels = require("../models/item");
const miscHelpers = require("../helpers/helpers");
const cloudinary = require("cloudinary");

module.exports = {
  insertItem: async (req, res) => {
    let path = req.file.path;

    const { title, description, location } = req.body;

    let getUrl = async req => {
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      });

      let dataCloudinary;
      await cloudinary.uploader.upload(path, result => {
        const fs = require("fs");
        fs.unlinkSync(path);
        dataCloudinary = result.url;
      });

      return dataCloudinary;
    };

    const data = {
      title,
      image: await getUrl(),
      description,
      location,
      created_at: new Date(),
      updated_at: new Date()
    };
    itemModels
      .insertItem(data)
      .then(result => {
        miscHelpers.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getItem: (req, res) => {
    const jumlah = 0;
    const search = req.query.search;
    const page = req.query.page;
    itemModels
      .getItem(search, page)
      .then(result => {
        miscHelpers.response(res, result, 200, false, jumlah);
      })
      .catch(error => {
        console.log(error);
      });
  },
  updateItem: (req, res) => {
    const id_item = req.params.id_item;
    const { title, image, description, location } = req.body;
    const data = {
      title,
      image,
      description,
      location,
      updated_at: new Date()
    };
    itemModels
      .updateItem(id_item, data)
      .then(result => {
        miscHelpers.response(res, result, 200, [id_item, data]);
      })
      .catch(error => {
        console.log(error);
      });
  },
  deleteItem: (req, res) => {
    const id_item = req.params.id_item;
    itemModels
      .deleteItem(id_item)
      .then(result => {
        miscHelpers.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
