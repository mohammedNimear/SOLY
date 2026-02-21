import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  
} from "../controllers/users.js";
import { verfiyAdmin, verfiyUser } from "../utils/verfiyToken.js";

const router = express.Router();

// * UPDATE

router.put("/:id", verfiyUser, updateUser);

// * DELETE

router.delete("/:id", verfiyUser, deleteUser);

// * GET

router.get("/find/:id", verfiyUser, getUser);

// * GET ALL

router.get("/", verfiyAdmin, getAllUsers);

export default router;
