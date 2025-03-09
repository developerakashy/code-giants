import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../model/user.model.js";
import cookieParser from "cookie-parser";
//import EmailOtp from "../model/emailOTP.model.js";
import nodemailer from "nodemailer";
//import Area from "../model/area.model.js";
import { createHmac, randomBytes } from "node:crypto";
import crypto from "crypto";
import redis from "redis";


const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379', // Adjust the URL based on your Redis setup
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();



 const userRegister=asyncHandler(async(req,res)=>{


    try{
      const {fullName,email,password}=req.body;
        console.log(req.body)
        if([fullName,email,password].some(property=>property?.trim()==="")){
            throw new apiError("please fill all the field",400,)
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            throw new apiError("user already exist",400)
        }
        const userObject={
            fullName:fullName,
            email:email,
            password:password,
        }
        if(!userObject){
            throw new apiError("user object is empty",400)
        }
        const createUser=await User.create(userObject);
       const isUserCreated=await User.findById(createUser._id).select("-password -salt -refreshToken")
       if(!isUserCreated){
        throw new apiError("user not created",500)
       }
        return res.status(201).json( new ApiResponse(201,isUserCreated,"user created successfully"))

    }
    catch(error){
        console.log(error);
    }
 })




/*
 const generateOtp=asyncHandler(async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email){
            throw new apiError("please fill all the field",400)
        }
        const emailOtp=await EmailOtp.findOne({email})
         const OTP = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

        const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
        const salt = randomBytes(16).toString("hex");
        const hashOtp = createHmac("sha256", salt).update(OTP.toString()).digest("hex");

        if (emailOtp) {
          await EmailOtp.findOneAndUpdate(
            { email },
            {
              $set: {
                otp: hashOtp, // Set hashed OTP
                salt: salt,   // Set the new salt
                expireTime: expireTime, // Update expiry time
              },
            }
          );
        }

        else{
            const emailOtpObject={
                email:email,
                otp:OTP,
                expireTime:expireTime
            }
            await EmailOtp.create(emailOtpObject);

        }
        // let's send email to user
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "sumit8104608630@gmail.com",
                pass: process.env.COMPANY_EMAIL_PASSWORD, // Your Gmail app password
            },
        });

        //Email  message configuration
        const mailOptions = {
            from: process.env.COMPANY_EMAIL, // sender address
            to: email,
            subject: OTP,
            text: `Your OTP is ${OTP} and it will expire in 5 minutes` //
        };
        //send email
         transporter.sendMail(mailOptions).then(()=>{

            return res.status(201).json( new ApiResponse(200,"OTP send successfully"))

         })

    }
    catch(error){
        console.log(error);
    }

 })

 */







 const generateOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new apiError('Please fill all the field', 400);
    }

    // Generate a more secure OTP
    const OTP = crypto.randomInt(1000, 9999); // More secure way to generate OTP
    const expireTime = 1 * 60; // 5 minutes expiration time (in seconds)

    const otpData = {
      otp: OTP.toString(),
      expiresAt: Date.now() + expireTime * 1000,
    };

    // Store OTP in Redis with email as the key and expiration time
    await client.set(email,JSON.stringify(otpData),{EX:expireTime})

    // Send OTP to email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.COMPANY_EMAIL, // Avoid hardcoding email
        pass: process.env.COMPANY_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Your OTP Code - Fixlet Fast',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">

          <h2 style="text-align: center; color: #f97316;">Fixlet Fast - OTP Verification</h2>

          <p style="color: #374151; font-size: 16px;">Dear User,</p>

          <p style="color: #374151; font-size: 16px;">
            Your One-Time Password (OTP) for verification is:
          </p>

          <p style="text-align: center; font-size: 24px; font-weight: bold; color: #f97316; border: 2px dashed #f97316; padding: 10px; display: inline-block; margin: 20px auto;">
            ${OTP}
          </p>

          <p style="color: #374151; font-size: 16px;">
            This OTP will expire in <strong>1 minutes</strong>. Please do not share it with anyone.
          </p>

          <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 20px;">
            Thank you for using Fixlet Fast!
          </p>
        </div>
      `,
    };


    try {
    const very=  await transporter.sendMail(mailOptions);
      res.status(201).json(new ApiResponse(200,"",'OTP sent successfully'));
    } catch (err) {
      console.log(err);
      res.status(500).json(new apiError('Error sending email', 500));
    }
  });


  const verify_otp = asyncHandler(async (req, res) => {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        throw new apiError('Please fill all the fields', 400);
      }

      // Get OTP from Redis
      const storedOtpData = await client.get(email);
      if (!storedOtpData) {
       return res.status(404).json(new ApiResponse(404, '', 'Email verified successfully'));
      }

      const { otp: storedOtp, expiresAt } = JSON.parse(storedOtpData);

      // Check if OTP is expired
      if (Date.now() > expiresAt) {
        throw new apiError('OTP has expired', 400);
      }

      if (storedOtp !== otp) {
        return res.status(404).json(new ApiResponse(404, '', 'OTP is Invalid'));
      }

      // OTP is correct, clear OTP from Redis
      await client.del(email)

      res.status(200).json(new ApiResponse(200, '', 'Email verified successfully'));
    } catch (error) {
      console.log(error);
      res.status(500).json(new apiError('Internal Server Error', 500));
    }
  });



/*
 // let's create API to check weather the OTP is correct or not
 const verify_otp=asyncHandler(async(req,res)=>{
    try{
        const{email,otp}=req.body;
        if(!email||!otp){
            throw new apiError("please fill all the field")
        }
        const emailOtp=await  EmailOtp.findOne({email});
        if(!emailOtp){
            throw new apiError("please write correct emailID ");
        }
        const response=await EmailOtp.verify_otp(email,otp);
        if(response){
            res.status(200).json( new ApiResponse(200,"","email is verified successfully"))
        }
        else{
            throw new apiError("otp verified unsuccessful",404)
        }
    }
    catch(error){
        console.log(error);
    }
 })

*/


// let's create the user login algorithm to create user functionality
const userLogin=asyncHandler(async(req,res)=>{
    /*
    1.get user detail from the frontend
    2.check validation all possible validation

    */
    try{
        const {email,password}=req.body;
        if([email,password].some(property=>property?.trim()==="")){
            throw new apiError("please fill all the field",400)
        }
        const user=await User.findOne({email});
        if(!user){
            throw new apiError("user not found",404)
        }
      const token=await User.matchPasswordGenerateToken(email,password);

        const refresh_token=token?.refresh_token;
        user.refreshToken=refresh_token;
        await user.save({validateBeforeSave:false});
        const loginUser=await User.findOne({email}).select("-password -salt -refreshToken");


        const accessToken=token.token;
        res.status(200).cookie('accessToken',accessToken,{
            httpOnly:true,
            secure:true,
            sameSite: "None" // Cross-origin पर काम करने के लिए

        }).cookie("refresh_token",refresh_token,{
            httpOnly:true,
            secure:true,
            sameSite: "None" // Cross-origin पर काम करने के लिए

        }).json(new ApiResponse(
            200,

                loginUser
            ,
            "user logged in successfully"
        ))
    }
    catch(error){
        return res.status(401).json({
          statusCode:401,
          message:"incorrect password",
          error:error.message
        });
    }
});

// let's create the functionality of logout
const userLogout=asyncHandler(async(req,res)=>{
    try{
        const _id=req.user._id;
        console.log(_id)

        await  User.findByIdAndUpdate(_id,{
         $set:{refreshToken:undefined},
        },{ new: true });

        res.status(200).clearCookie('accessToken',{
            httpOnly:true,
            secure:true,
            sameSite: "None" // Cross-origin पर काम करने के लिए

        }).clearCookie('refresh_token',{
                httpOnly:true,
                secure:true,
                sameSite: "None" // Cross-origin पर काम करने के लिए


        }).json(new  ApiResponse(200,"logout successfully"));

    }
    catch(error){
        console.log(error);
    }
})

const userInfo=asyncHandler(async(req,res)=>{
    try{
    const userInfo=req.user;
    if(!userInfo){
        return new ApiResponse(401,"user not found");
    }
    res.status(200).json(
        new ApiResponse(
            200,
            userInfo,
            "user info",
        )
    )
    }
    catch(error){
        console.log(error);
    }

})




// let's write controller for changing password
const changePassword = asyncHandler(async (req, res) => {
  try {
    let { email, fullName, password } = req.body;
    console.log(req.user)
    if(!req.user){
      fullName=""
    }
    else{
      if(fullName===""){
        fullName=req.user.fullName;
      }
    }




    // Check if any required field is missing
    if ([email, password].some(item => item === "")) {
      return res.status(400).json(new ApiResponse("Invalid request: Missing required fields", 400));
    }

    // Find user in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json(new ApiResponse("User not found", 404));
    }

    // Generate salt and hash the password
    const salt = randomBytes(16).toString().trim();
    const hashAlgorithm = createHmac("sha256", salt).update(password).digest("hex");

    // Update the user's password and fullName
    await User.findOneAndUpdate({ email: email }, {
      $set: { fullName: fullName, password: hashAlgorithm, salt: salt }
    });

    // Return success response
    return res.status(200).json(new ApiResponse(200,"","Password changed successfully"));

  } catch (error) {
    // Log the error for debugging
    console.error(error);
    return res.status(500).json(new ApiResponse("Something went wrong in the server", 500));
  }
});

const checkPassword=asyncHandler(async(req,res)=>{
 try {
  const {password}=req.body;
  const {email}=req.user;

  if(!password){
    return res.status(400).json(new ApiResponse("Invalid request: Missing required fields", 400))
  }
  const user=await User.findOne({email:email});
  if(!user){
    return res.status(404).json(new ApiResponse("User not found",404));
  }
  const matchPassword=await User.matchPassword(email,password);
  if(!matchPassword){
    return res.status(401).json(new ApiResponse("incorrect password",401))
  }
  return res.status(201).json(new ApiResponse(201,matchPassword,"password verified"))


 } catch (error) {
  throw new apiError("some thing went wrong in server",500)
}
})



const changeEmail=asyncHandler(async(req,res)=>{
  try {
    const {password,newEmail}=req.body;
    const {email}=req.user;
    const user=await User.findOne({email:email});
    if(!user){
      return res.status(404).json(new ApiResponse("User not found",404));
    }
    const matchPassword=await User.matchPassword(email,password);
    if(!matchPassword){

      return res.status(401).json(new ApiResponse("incorrect password",401))

    }else{
    await User.findOneAndUpdate({email:email},{$set:{email:newEmail}})
    return res.status(200).json(new ApiResponse(200,"","Email changed successfully"))
    }

  } catch (error) {
    console.log(error);
    throw new apiError("some thing went wrong in server",500)
  }
})

const isUserAvailable = asyncHandler(async (req, res) => {
  const { fullName, email } = req?.body

  if(  !email?.trim()) throw new ApiError(400, 'username or email field is mandatory')

  try {


      if(email){
          const user = await User.findOne({email})

          if(!user?.email) return res.status(200).json(new ApiResponse(200, {exist: false}, 'email address does not exist'))

          return res.status(200).json(new ApiResponse(200, {exist: true}, 'email address exist'))
      }

  } catch (error) {
      throw new apiError(400, error?.message || 'something went while getting username')
  }
})


export {
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
};
