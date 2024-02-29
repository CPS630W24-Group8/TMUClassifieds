const express = require("express");
const router = express.Router();
const service = require("./model/service");

// create new service and add to database
router.route("/add-service").post(async (request, response) => {
  const {title, description, user} = request.body;
  console.log(title+ " - "+description);

  try {
    await service.create({
      title, description, user
    }).then(service =>
      response.status(200).json({
        message: "Service sucessfully created",
        service,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Service not successful created",
      error: error.mesage,
    });
  }
});

// get all services
router.route("/get-service").get(async (request, response) => {
  try{
    service.find({}).then (data => 
      response.status(200).json({
        message: "Services sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Services not successful found",
      error: error.mesage,
    });
  }
});

module.exports = router;