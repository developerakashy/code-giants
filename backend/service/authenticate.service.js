// let's get the jwt 
import jwt from "jsonwebtoken";
const secret=process.env.SECRET;

const setUser=(user)=>{
    if(!user){
        return {error:"user not found"};
    }
    const payLoad={
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        role:user.role
    };
    const token=jwt.sign(payLoad,secret,{
        expiresIn:process.env.EXPIRE
    });
    return token;
}
const refreshToken=async(user)=>{
    if(!user){
        return {error:"user not found"};
    }
    const payLoad={
        id:user._id,
    };
    const refresh_token=jwt.sign(payLoad,process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:process.env.REFRESH_EXPIRE
    });
    return refresh_token;
    
}

// let's write the code for getUser function 
// basically i am putting user info in req.user object for basic crud operation
const getUser=async (token)=>{
    try{
        if(token){
            const payLoad= jwt.verify(token,secret);
            if(!payLoad){
                return ({
                    error:"invalid token",
                    status:401,
                    success:false
                })
            }
            return payLoad
        }
        else{
            return null
        }
    }
    catch(error){
        return ({
            error:"invalid token",
            status:401,
            success:false
        })
       // console.log(error);
        
    }
}



export {
    setUser,
    getUser,
    refreshToken
};
