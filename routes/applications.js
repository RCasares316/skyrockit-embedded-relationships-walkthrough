const { Router } = require("express");
const controllers = require("../controllers/applications.js");

const router = Router();

// GET ‘/applications’ => Render the Index Page; [CRUD] GET all applications
router.get("/", controllers.getApplicationPage);

// GET ‘/applications/new’ => Render the Form Page to create a new application
router.get("/new", controllers.getCreateFormPage);

// POST ‘/applications’ => [CRUD] Create a new application; Redirect to "/applications"
router.post("/", controllers.createApplication);


// GET ‘/applications/:applicationId’ => Render Show Page; [CRUD] GET one application by id
router.get("/:applicationId", controllers.applicationDetails);

// GET ‘/applications/:applicationId/edit’ => Render edit Form Page to update an application
router.get("/:applicationId/edit", controllers.editApplication)

// PUT ‘/applications/:applicationId’ => [CRUD] Find an application by it's id and update; Redirect to "/applications/:applicationId"
router.put("/:applicationId", controllers.updateApplication)

// Delete	DELETE ‘/applications/:applicationId’ => [CRUD] Find an application by it's id and delete; Redirect to "/applications"
router.delete("/:applicationId", controllers.deleteApplication);

module.exports = router;
