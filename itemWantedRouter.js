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
  response.json({ message: "Image is uploaded successfully.", data: request.file.filename });
});

// create new items and add to database
router.route("/add-item").post(async (request, response) => {
  const {title, image, description, user, tag, location} = request.body;
  console.log("image: "+image);
  console.log(title+ " - "+description);

  try {
    await itemWanted.create({
      title, image, description, user, tag, location,
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

// get all item wanted created by user
router.route("/get-user-item").get(async (request, response) => {
  const user = request.query.user;
  try{
    itemWanted.find({ user: user }).then (data => 
      response.status(200).json({
        message: "User's items sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "User's items not successful found",
      error: error.mesage,
    });
  }
});

// delete an item from database
router.route("/delete-item").post(async (request, response) => {
  const entry = request.body.entry;
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
      error: error.message,
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

// edit item
router.route("/edit-item").post(async (request, response) => {
  const update = { title: request.body.title, image: request.body.image, description: request.body.description, tag, location: request.body.tag, location };
  console.log(update);

  // delete image file
  if (request.body.image != request.body.oldImage && request.body.oldImage != "imageIcon.png") {
    fs.unlink("./tmuclassifieds-client/src/images/"+request.body.oldImage, (error) => {
      if (error) {
        console.log("error:", error.message);
      } else { 
        console.log("File "+request.body.oldImage+" is deleted");
      }
    });
  }
  
  try {
    await itemWanted.findByIdAndUpdate(request.body.id, update).then(item =>
        response.status(200).json({
          message: "Item sucessfully edited",
          item,
        })
      );
    } catch (error) {
      console.log("error: ", error.message);
      return response.status(401).json({
        message: "Item not successful edited",
        error: error.mesage,
      });
    }
});

// delete all user's items from database
router.route("/delete-all").post(async (request, response) => {
  const { email, items } = request.body;
  try {
    await itemWanted.deleteMany( { "user" : email } ).then(result => {
      response.status(200).json({
        message: "Items sucessfully deleted",
        result,
      })}
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Items not successful deleted",
      error: error.message,
    });
  }
  if (items != null) {
    for (let item of items) {
      // delete image file
      if (item.image != "imageIcon.png") {
        fs.unlink("./tmuclassifieds-client/src/images/"+item.image, (error) => {
          if (error) {
            console.log("error:", error.message);
          } else { 
            console.log("File "+item.image+" is deleted");
          }
        });
      }
    }
  }
});

module.exports = router;
