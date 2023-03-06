const{MongoClient}=require("mongodb")


var dbconnection
module.exports={
    connectDB:(cb)=>{
        MongoClient.connect("mongodb://localhost:27017/Taxibooking").then((client)=>{
            dbconnection=client.db();
            return cb()

        }).catch((err)=>{
            console.log(err);
            return cb(err)
        })
    },
    getDb:()=>dbconnection

    
}