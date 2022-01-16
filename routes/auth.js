const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try {
        const token=req.header('auth-token')
        if(!token){
            res.send("Access denied.");
        }else{
            if(token===process.env.AUTH_SECRET){
                req.userId='Google'
                next();
            }else{
                const userId=jwt.verify(token,process.env.JWT_SECRET)
                req.userId=userId
                next();
            }
        }
    } catch (error) {
        res.send('Invalid token')
    }
}

module.exports=auth