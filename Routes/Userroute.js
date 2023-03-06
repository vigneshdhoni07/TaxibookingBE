const usercontroller=require("../Controller/Usercontroller")
const middleware=require("../Middleware/authmiddleware")
module.exports=(app)=>{
    app.get("/Taxibooking/getall",usercontroller.getallusers)
    app.post("/Taxibooking/Signin",usercontroller.createuser)
    app.post("/Taxibooking/login",usercontroller.userlogin)
    app.patch("/Taxibooking/edituser",middleware.verifytoken,usercontroller.editprofile)
    app.delete("/Taxibooking/deleteuser",middleware.verifytoken,usercontroller.deleteuser)
}