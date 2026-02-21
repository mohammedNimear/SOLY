import express from "express";
import { createEmployer, deleteEmployer, getAllEmployers, getEmployer, updateEmployer } from "../controllers/employers.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();


//* Create
router.post("/", createEmployer);

//* UPDATE

router.put("/:id", updateEmployer);

//* DELETE

router.delete("/:id", deleteEmployer);

//* GET

router.get("/find/:id", getEmployer);

//* GET ALL

router.get("/", getAllEmployers);



export default router;
