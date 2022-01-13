const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try {
        const token=req.header('auth-token')
        if(!token){
            res.status(403).send("Access denied.");
        }else{
            const userId=jwt.verify(token,process.env.JWT_SECRET)
            req.userId=userId
            next()
        }
    } catch (error) {
        res.status(400).send('Invalid token')
    }
}

module.exports=auth