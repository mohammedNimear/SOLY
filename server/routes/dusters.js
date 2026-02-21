import express from "express";
import { createType, deleteType, getAllSTypes, getType, updateType } from "../trash/dustersctrl.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();


//* Create
router.post("/", createType);

//* UPDATE

router.put("/:id", updateType);

//* DELETE

router.delete("/:id", deleteType);

//* GET

router.get("/find/:id", getType);

//* GET ALL  

router.get("/",  getAllSTypes);





export default router;
