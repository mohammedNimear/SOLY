import express from "express";
import { createSupplier, deleteSupplier, getAllSuppliers, getSupplier, updateSupplier } from './../controllers/suppliers.js';
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();

//* Create
router.post("/", createSupplier);

//* UPDATE

router.put("/:id",  updateSupplier);

//* DELETE

router.delete("/:id",  deleteSupplier);

//* GET

router.get("/find/:id", getSupplier);

//* GET ALL

router.get("/", getAllSuppliers);





export default router;
