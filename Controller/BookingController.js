var db
var bcrypt=require("bcrypt")
var jwt=require("jsonwebtoken")
const { ObjectId } = require("mongodb")
exports.getdb=(dbConnection)=>{
    db=dbConnection
}

exports.createbooking=async(req,res)=>{
    var obj={
        origin:null,uid:null,destination:null,did:null,pickuptime:null,price:null,isdriveravailable:null,drivername:null
    }
    console.log(req.role)
    if(req.role=="user")
    {
        let{origin,destination,pickuptime}=req.body
        obj.origin=origin
        obj.destination=destination
        obj.pickuptime=pickuptime
        obj.uid=req.uid
        obj.did=null
        obj.price=null
        obj.isdriveravailable=false
        obj.drivername=null
    }
   try{
    var booking=await db.collection("Booking").insertOne(obj)
    
    res.status(200).json(booking)

   }
   catch(err)
   {
    res.status(500).json(err)
   }
    
    
}
exports.getallbookings=async(req,res)=>{
    try {
        var bookings=[]
        await db.collection("Booking").find().forEach((e)=>{bookings.push(e)})
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getuserbookings=async(req,res)=>{
    try {
        var bookings=[]
        await db.collection("Booking").find({uid:req.uid}).forEach((e)=>{
            
            
            bookings.push(e)
            
        })
        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getallbyplace=async(req,res)=>{
    try{
        var place=req.params.place
        if(req.role=="driver")
        {var allbooking=[]
            await db.collection("Booking").find({$or:[{origin:place},{destination:place}]}).forEach((e)=>{
                if(!e.isdriveravailable)
                {
                allbooking.push(e)
                }
            })
            
            res.status(200).json(allbooking)
        }
        else{
            res.status(400).json("Access Denied")
        }
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
exports.acceptbooking=async(req,res)=>{
    var bid=req.params.id
    if(req.role!="driver")
    {
        res.json("Access Denied")
    }
    var {pickuptime,price}=req.body       
    var book={
        pickuptime:pickuptime,
        price:price,
        did:req.did,
        isdriveravailable:true,
        drivername:req.dname
    }       
    
    if(ObjectId.isValid(bid))
    {
        var bookid=new ObjectId(bid)
        try {
            var booking=await db.collection("Booking").updateOne({_id:bookid},{$set:book})
            res.status(200).json(booking)
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
    else{
        res.status(400).json("invalid Id")
    }
}