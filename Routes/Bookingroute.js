var BookingController=require("../Controller/BookingController")
var middleware=require("../Middleware/authmiddleware")

module.exports=(app)=>{
    app.post("/Taxibooking/Userreq",middleware.verifytoken,BookingController.createbooking)
    app.get("/Taxibooking/getAllbooking",BookingController.getallbookings)
    app.patch("/Taxibooking/Driverreq/:id",middleware.verifytoken,BookingController.acceptbooking)
    app.get("/Taxibooking/Bookingbyplace/:place",middleware.verifytoken,BookingController.getallbyplace)
    app.get("/Taxibooking/BookingAccept",middleware.verifytoken,BookingController.getuserbookings)
}