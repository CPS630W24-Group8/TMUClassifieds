const express = require("express");
const router = express.Router();
const service = require("./model/service");

// create new service and add to database
router.route("/add-service").post(async (request, response) => {
  const {title, description, user, tag} = request.body;
  console.log(title+ " - "+description);

  try {
    await service.create({
      title, description, user, tag
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

// get all services created by user
router.route("/get-user-service").get(async (request, response) => {
  const user = request.query.user;
  try{
    service.find({ user: user }).then (data => 
      response.status(200).json({
        message: "User's services sucessfully found",
        data: data,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "User's services not successful found",
      error: error.mesage,
    });
  }
});

// delete a service from database
router.route("/delete-service").post(async (request, response) => {
  const entry = request.body.entry;
  console.log("service:", entry);
  try {
    await service.findByIdAndDelete( { "_id" : entry._id } ).then(service =>
      response.status(200).json({
        message: "Service sucessfully created",
        service,
      })
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Service not successful deleted",
      error: error.mesage,
    });
  }
});

// edit service
router.route("/edit-service").post(async (request, response) => {
  const update = { title: request.body.title, description: request.body.description, tag: request.body.tag };
  console.log(update);
  try {
    await service.findByIdAndUpdate(request.body.id, update).then(service =>
        response.status(200).json({
          message: "Service sucessfully edited",
          service,
        })
      );
    } catch (error) {
      console.log("error: ", error.message);
      return response.status(401).json({
        message: "Service not successful edited",
        error: error.mesage,
      });
    }
});

// delete all user's services from database
router.route("/delete-all").post(async (request, response) => {
  const email = request.body.email;
  try {
    await service.deleteMany( { "user" : email } ).then(result => {
      response.status(200).json({
        message: "Services sucessfully deleted",
        result,
      })}
    );
  } catch (error) {
    console.log("error: ", error.message);
    return response.status(401).json({
      message: "Services not successful deleted",
      error: error.message,
    });
  }
});

module.exports = router;