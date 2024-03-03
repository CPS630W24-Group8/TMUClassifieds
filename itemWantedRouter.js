const express = require("express");
const router = express.Router();
const itemWanted = require("./model/itemWanted");
const fs = require('fs');
const multer = require('multer');

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
  //imageName = request.file.filename;
  response.json({ message: "Image is uploaded successfully.", data: request.file.filename });
});

// create new items and add to database
router.route("/add-item").post(async (request, response) => {
  const {title, image, description, user} = request.body;
  console.log("image: "+image);
  console.log(title+ " - "+description);

  try {
    await itemWanted.create({
      title, image, description, user,
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

// get all items wanted 
router.route("/get-item").get(async (request, response) => {
  try{
    itemWanted.find({}).then (data => 
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

// delete an item from database
router.route("/delete-item").post(async (request, response) => {
  const entry = request.body.item;
  console.log("item:", entry);
  try {
    await itemWanted.findByIdAndDelete( { "_id" : entry._id } ).then(item =>
      response.status(200).json({
        message: "Item sucessfully created",
        item,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Item not successful deleted",
      error: error.mesage,
    });
  }
  // delete image file
  if (entry.image != "imageIcon.png") {
    fs.unlink("./tmuclassifieds-client/src/images/"+entry.image, (error) => {
      if (error) {
        console.log("error:", error.message);
      } else { 
        console.log("File "+entry.image+" is deleted");
      }
    });
  }
});

module.exports = router;