import express from "express";
import { createSale, deleteSale, getAllSales, getCashSalesDetails, getCashTotals, getChartDetails, getCreditSalesDetails, getDistributionSalesDetails, getSale, getSalesDetails, updateSale,  } from "../controllers/sales.js";
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

//* GET CASHBOX 

router.get("/cash/totals", getCashTotals );
router.get("/cash/details", getSalesDetails );

router.get("/cash/details/cash", getCashSalesDetails);
router.get("/cash/details/credit", getCreditSalesDetails);
router.get("/cash/details/distribution", getDistributionSalesDetails);


// Chart
router.get("/chart", getChartDetails);

export default router;
