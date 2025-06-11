import express from "express";
import authMiddleware from "../middlewares/authmiddleware.js";
import { deposit, getProfile, getReferrals, getUserbyId, levelIncome, login, logout, pageReload, register,  withdrawMoney } from "../controllers/usercontoller.js";
import { requestOTP, verifyOTP } from "../controllers/kycController.js";
import { blockuser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/adminController.js";
import { upload } from "../middlewares/multermiddleware.js";
import {  getPlanById, uploadSst, VerifySst } from "../controllers/PlanController.js";
import { completeTask } from "../controllers/taskController.js";
import { forgotPassword, resetPassword, verifyOtp } from "../controllers/forgetPasswordController.js";
import { getOther, updateUserCount } from "../controllers/otherController.js";


const router = express.Router();

router.patch("/update-count",authMiddleware, updateUserCount);
router.get("/get-other",getOther);
// router.post("/update-count",authMiddleware, updateUserCount);

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete-user/:userId", deleteUser);
router.patch("/block-user/:userId",blockuser);

router.post("/request-otp", forgotPassword);
router.post("/verify-forgot-otp", verifyOtp);
router.post("/change-password", resetPassword);

router.post("/kyc/request-otp", authMiddleware, requestOTP);
router.post("/kyc/verify-otp", authMiddleware, verifyOTP);
router.get("/referrals/:userId",  getReferrals);
router.get("/profile", authMiddleware, getProfile);
router.post("/deposit", authMiddleware, deposit);
// router.post("/withdraw", authMiddleware, withdraw);


router.get("/users", authMiddleware, getAllUsers); // View all users
router.get("/user/:userId", getUserById); // Get a single user
router.put("/user", authMiddleware, updateUser); // Modify a user

router.post("/withdraw-money/:userId", authMiddleware,withdrawMoney);
router.post("/upload-sst", authMiddleware, upload.single("image"), uploadSst);
router.post("/verify-sst",   VerifySst);
router.get("/plan/:planId",   getPlanById);
router.post("/level-income", authMiddleware, levelIncome);
router.post("/streak", authMiddleware, completeTask);

router.get('/start',pageReload);

export default router;
