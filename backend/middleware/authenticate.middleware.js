import { getUser, refreshToken, setUser } from "../service/authenticate.service.js";

// Schema model
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
const { verify } = jwt;


// Middleware function to authenticate a logged-in user using a cookie
const checkAuthenticationCookie = (cookieName) => {
  return async (req, res, next) => {
    try {
      const cookie = req.cookies[cookieName];

      // Check if the cookie exists
      if (!cookie) {
        return res.status(401).json({ message: "Unauthorized: No cookie provided.",statusCode:401 });
      }

      // Validate the cookie and get the user data
      const user = await getUser(cookie);
      if(user.error){
        // let's get cookie of refreshToken
        const refreshTokenCookie = req.cookies.refresh_token
        if(!refreshToken){
          return res.status(401).json({ message: "Unauthorized: No refresh token provided." });
        }
        const {id}=await verify(refreshTokenCookie,process.env.REFRESH_TOKEN_SECRET);
        if(!id){
          return res.status(401).json({ message: "your token has been expired" });
        }

       
        //let fetch user from database 
        const userFromDB = await User.findById(id).select("-password -salt -salt -refreshToken ");

        const newAccessToken=await setUser(userFromDB);
        const newRefreshToken=await refreshToken(userFromDB);

        req.user=userFromDB

        res.status(200).cookie('accessToken',newAccessToken,{
          httpOnly:true,
          secure:true,
      }).cookie("refresh_token",newRefreshToken,{
          httpOnly:true,
          secure:true,
      }).json(new ApiResponse(
          200,
      
              loginUser
          ,
          "user logged in successfully"
      ))

        
 
       // const id=refreshToken
      }
      if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
      }

      // Retrieve user details from the database (excluding sensitive data)
      const currentUserDetail = await User.findById(user.id).select("-password -salt");
      if (!currentUserDetail) {
        return res.status(404).json({ message: "User not found." });
      }

      // Attach user details to the request object
      req.user = currentUserDetail;
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
     // console.error("Authentication error:", error.message || error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
};

export { checkAuthenticationCookie };
