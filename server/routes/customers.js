import express from "express";
import { countByDuster, createCustomer, deleteCustomer, getAllCustomers, getByDuster, getCustomer, updateCustomer } from "../controllers/customers.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();

//* Create
router.post("/", createCustomer);

//* UPDATE

router.put("/:id",  updateCustomer);

//* DELETE

router.delete("/:id",  deleteCustomer);

//* GET

router.get("/find/:id",  getCustomer);

//* GET ALL  countByDuster

router.get("/", getAllCustomers);

//* COUNT Dusters

router.get("/countByDuster", countByDuster);

//* GET Dusters 

router.get("/getByDuster", getByDuster);




export default router;
