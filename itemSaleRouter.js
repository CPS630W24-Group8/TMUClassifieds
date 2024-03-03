const express = require("express");
const router = express.Router();
const itemSale = require("./model/itemSale");
const fs = require('fs');

// create new items and add to database
router.route("/add-item").post(async (request, response) => {
  const {title, image, description, user, price} = request.body;
  console.log("image: "+image);
  console.log(title+ " - "+description);

  try {
    await itemSale.create({
      title, image, description, user, price,
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

// get all items for sale
router.route("/get-item").get(async (request, response) => {
  try{
    itemSale.find({}).then (data => 
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
  const entry = request.body.entry;
  console.log("item:", entry);
  try {
    await itemSale.findByIdAndDelete( { "_id" : entry._id } ).then(item =>
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