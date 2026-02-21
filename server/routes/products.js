import express from "express";
import { countAll, createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/products.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();

//* Create
router.post("/", createProduct);

//* UPDATE

router.put("/:id",  updateProduct);

//* DELETE

router.delete("/:id/:typeid",  deleteProduct);

//* GET

router.get("/find/:id", getProduct);

//* GET ALL

router.get("/", getAllProducts);



export default router;
