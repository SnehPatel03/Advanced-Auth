import express, { Router } from "express";
import {
  forgetPassword,
  login,
  logout,
  otpVerify,
  register,
  resetPassword,
  updatePassword,
} from "../controllers/authController.js";
import { authorize } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", otpVerify);  
router.post("/login", login);
router.get("/logout" ,authorize, logout);
router.post("/password/forgot", forgetPassword);
router.put("/password/reset/:token", resetPassword);
router.put("/password/update", authorize,updatePassword);

export default router;
