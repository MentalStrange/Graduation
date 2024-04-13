import jwt from 'jsonwebtoken'
export const authentication = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
      return res.status(401).json({
        status:"fail",
        message:"Unauthorized"
      })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  }catch(error){
    return res.status(401).json({
      status:"fail",
      message:"Unauthorized"
    })
  }
}