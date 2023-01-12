// Import Patients Controller
const PatientsController = require("../controllers/PatientsController");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Express");
});

// get all resource patiens
// method get
router.get("/Patients", PatientsController.index);

// menambahkan resource patiens
// method post
router.post("/patients", PatientsController.store);

// get detail resource by id
router.get("patients/:id", PatientsController.show);

// method put
router.put("/patients/:id", PatientsController.update);

// method delete
router.delete("/patients/:id", PatientsController.destroy);

// method search by name
router.get("/patients/search/:name", PatientsController.search);

// get positive resource
router.get("/patients/status/positive" , PatientsController.positive);

// get recovered resource
router.get("/patients/status/recovered" , PatientsController.recovered);

// get dead resource
router.get("/patients/status/dead" , PatientsController.dead);

// Export router
module.exports = router;