import jwt from "jsonwebtoken";
const jwtSecret = 'c779d5151c977254056d21937d52d7caacc224b6c063f798f80abc2a8e5e92fa99c194';

function auth(req, res, next){
  try{
    const token = req.cookies.jwt
    console.log("verifying token:");
    console.log(token);
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).json({ message: "Not authorized" })
        } else {
            next()
        }
      })
    }else{
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" })
    }
  }catch{
    res.status(401).json({
    error: new Error('Invalid request!')
    });
  }
    
  }

export default auth;