var exp=require("express")
var cors=require("cors")
var app=exp()
app.use(exp.json())
app.use(cors())
var db
const{getDb,connectDB}=require("./db")
connectDB((err)=>{
    if(!err)
    {
        app.listen(8000,()=>{
            console.log("app running at 8000")
        })
        db=getDb()
        require("./Controller/Usercontroller").getdb(db)
        require("./Controller/BookingController").getdb(db)
        require("./Middleware/authmiddleware").getdb(db)
    }
    else{
        console.log(err)
    }
})

require("./Routes/Userroute")(app)
require("./Routes/Bookingroute")(app)

