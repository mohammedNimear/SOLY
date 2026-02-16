import express from "express";
import { createStore, deleteStore, getAllStores, getCriticalProducts, getStore, updateStore } from "../controllers/stores.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();


//* Create
router.post("/", createStore);

//* UPDATE

router.put("/:id", verfiyUser, updateStore);

//* DELETE

router.delete("/:id", verfiyUser, deleteStore);

//* GET

router.get("/find/:id", verfiyUser, getStore);

//* GET ALL

router.get("/",  getAllStores);

//* GET CRITICAL PRODUCTS

router.get("/getByCritical", getCriticalProducts );




export default router;
