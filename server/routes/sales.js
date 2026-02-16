import express from "express";
import { createSale, deleteSale, getAllSales, getSale, updateSale,  } from "../controllers/sales.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();


//* Create
router.post("/", createSale);

//* UPDATE

router.put("/:id", updateSale);

//* DELETE

router.delete("/:id", deleteSale);

//* GET

router.get("/find/:id", getSale);

//* GET ALL

router.get("/", getAllSales);



export default router;
