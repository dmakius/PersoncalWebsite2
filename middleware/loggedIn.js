import jwt from "jsonwebtoken";
const jwtSecret = 'c779d5151c977254056d21937d52d7caacc224b6c063f798f80abc2a8e5e92fa99c194';

function verifyToken(req , res, next){ 
    const token = req.cookies.jwt
        
    if(token){
            jwt.verify(token, jwtSecret, async (err, decodedToken) =>{        
                if(err){
                    console.log("AN ERROR OCCURED!");
                    res.locals.user = null;
                    return false;
                }
                else{
                    res.locals.user = decodedToken;
                    return true;
                }  
            })
    }else{
            res.locals.user = null;
            return false;
        }   
}

export default verifyToken;
