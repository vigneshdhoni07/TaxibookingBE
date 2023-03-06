var db
var bcrypt=require("bcrypt")
var jwt=require("jsonwebtoken")
exports.getdb=(dbConnection)=>{
    db=dbConnection
}

exports.getallusers=(req,res)=>{
    var us=[]
    db.collection("Users").find().forEach((e)=>{us.push(e)}).then(()=>res.json(us)).catch((err)=>res.json(err))
}

exports.createuser=(req,res)=>{
    var {name,password,mailId,role}=req.body
    password=bcrypt.hashSync(password,5)

    var user={
        name:name,
        password:password,
        mailId:mailId,
        role:role
    }

    db.collection("Users").insertOne(user).then((newuser)=>res.status(200).json(newuser)).catch((err)=>res.json(err))
}

exports.userlogin=async(req,res)=>{
    var{name,password}=req.body
    try {
        var user=await db.collection("Users").findOne({name:name})
        console.log(user)
       var isValid= bcrypt.compareSync(password,user.password)
       if(isValid)
       {
        console.log(user._id)
        var token=jwt.sign({id:user._id},"virat",{})
        res.status(200).json([token,user.role])
       }
       else{
        res.status(401).json({message:"Wrong Password"})
       }
    } catch (error) {
        res.status(500).json(error||"something went wrong")
    }
    
}
exports.editprofile=async(req,res)=>{
    var updates=req.body
    try{
        var user=await db.collection("Users").updateOne({_id:req.uid},{$set:updates})
        res.status(200).json(user)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
    
}
exports.deleteuser=async(req,res)=>{
    try {
        var user=await db.collection("Users").deleteOne({_id:req.uid})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}