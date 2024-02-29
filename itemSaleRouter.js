const express = require("express");
const router = express.Router();
const itemSale = require("./model/itemSale");

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

module.exports = router;