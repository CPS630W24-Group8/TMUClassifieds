const express = require("express");
const router = express.Router();
const item = require("./model/item");
const multer = require('multer');
let imageName = "";

// determine the destination and filename of the uploaded file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'tmuclassifieds-client/src/images/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({storage: storage});

// upload image when creating new item
router.route("/upload").post(upload.single("image"), async (request, response) => {
  imageName = request.file.filename;
  response.json({ message: "Image is uploaded successfully." });
});

// create new items and add to database
router.route("/add-item").post(async (request, response) => {
  const {title, description, type} = request.body;
  console.log("image: "+imageName);
  console.log(title+ " - "+description);

  try {
    await item.create({
      title: title, 
      image: imageName, 
      description: description,
      type: type,
    }).then(item =>
      response.status(200).json({
        message: "Item sucessfully created",
        item,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Item not successful created",
      error: error.mesage,
    });
  }
});

// get all items with the type "items wanted"
router.route("/get-item-wanted").get(async (request, response) => {
  try{
    item.find({type: 'items wanted'}).then (data => 
      response.status(200).json({
        message: "Items sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Items not successful found",
      error: error.mesage,
    });
  }
});

// get all items with the type "items for sale"
router.route("/get-item-sale").get(async (request, response) => {
  try{
    item.find({type: 'items for sale'}).then (data => 
      response.status(200).json({
        message: "Items sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Items not successful found",
      error: error.mesage,
    });
  }
});

module.exports = router;