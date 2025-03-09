import express from "express";
const userRoute = express.Router();
import { checkAuthenticationCookie } from "../middleware/authenticate.middleware.js";

// Importing all the functions
import {
  userRegister,
  userLogin,
  userLogout,
  userInfo,
  generateOtp,
  verify_otp,

  changePassword,
  changeEmail,
  checkPassword,
  isUserAvailable
} from "../controllers/user.controller.js";


//let's create the route for registration and for login
userRoute.post("/user_register",userRegister);
userRoute.post("/user_login",userLogin);
userRoute.get("/user_info",checkAuthenticationCookie("accessToken"),userInfo)
userRoute.post("/user_logout",checkAuthenticationCookie("accessToken"),userLogout);
userRoute.post("/user_otp",generateOtp);
userRoute.post("/verify_user_otp",verify_otp);
userRoute.post("/change_password",changePassword);
userRoute.post("/changeEmail",checkAuthenticationCookie("accessToken"),changeEmail);
userRoute.post("/check_password",checkAuthenticationCookie("accessToken"),checkPassword);
userRoute.post('/exist', isUserAvailable)


export default userRoute;
