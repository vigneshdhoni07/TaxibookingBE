var jwt=require("jsonwebtoken")
const { ObjectId } = require("mongodb")
var db
var bcrypt=require("bcrypt")
var jwt=require("jsonwebtoken")
const getdb=(dbConnection)=>{
    db=dbConnection
}
const verifytoken=(req,res,next)=>{
    var token=req.headers["x-token"]
    
    if(!token)
    {
        res.status(400).json("jwt missing")
    }
    jwt.verify(token,"virat",async (err,decoded)=>{
        if(err)
        {
            res.status(400).json("unauthorised token")
        }
        var id=decoded.id
        if(ObjectId.isValid(id))
        {
            try{
                var id=new ObjectId(id)
                var user=await db.collection("Users").findOne({_id:id})
                if(user.role=="user")
                {
                    req.uid=id
                    req.role="user"
                    //console.log(req.role)
                }
                else if(user.role=="driver")
                {
                    req.did=id
                   req.dname=user.name
                    req.role="driver"
                }
                
                next()
            }
           
            catch(err)
            {
                res.status(500).json(err)
            }
        }
    })
}
module.exports={
    verifytoken,
    getdb
}