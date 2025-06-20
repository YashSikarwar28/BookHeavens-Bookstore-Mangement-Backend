const router = require("express").Router()
const {authenticateToken} = require("./userAuth")
const Book = require("../models/book")
const Order = require("../models/order")
const  User = require("../models/user")


//placing order code
router.post("/place-order",authenticateToken,async(req,res)=>{
    try {
        const{id} = req.headers
        const{order} = req.body

        //we use for loop because order is inside an array and to visit each element inside an array we use loop
        for(const orderdata of order){
            const newOrder = new Order({user:id,book:orderdata._id})
            const orderdatafromDB = await newOrder.save()
            
            //adding order to cart
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderdatafromDB._id}
            })
            //removing order from cart
            const bookIds = order.map(orderdata=>orderdata._id)
            await User.findByIdAndUpdate(id,{
                $pull:{cart:{$in:bookIds}} //cart is the cart array from the user schema
            })
        }
        return res.json({
            status:"Success",
            message:"Order placed successfully"
        })
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", error:error.message})
    }
})


//getting order history
router.post("/get-order-history",authenticateToken,async(req,res)=>{
    try {
        
        const {id} = req.headers
        const userdata = await User.findByIdAndUpdate(id).populate({
            path:"orders",
            populate:{path:"book"}
        })

        const orderdata = userdata.orders.reverse()
        return res.json({
            status:"Success",
            data:orderdata
        })

    } catch (error) {
        return res.status(500).json({message:"Internal serveer error",error:error.message})
    }
})


//getting all orders - admin
router.get("/get-all-orders",authenticateToken,async(req,res)=>{
    try {
        
        const userData = await Order.find()
        .populate({
            path:"book"
        })
        .populate({
            path:"user"
        })
        .sort({createdAt:-1})

        return res.json({
            status:"Success",
            data:userData
        })
    } catch (error) {
        return res.status(500).json({message:"Internal serveer error",error:error.message})
    }
})


//update order - admin
router.put("/update-status/:id",authenticateToken,async(req,res)=>{
    try {
        
        const {id} = req.params
        await User.findByIdAndUpdate(id,{status:req.body.status})
        return res.json({
            status:"Success",
            message:"Order updated successfully"
        })

    } catch (error) {
        return res.status(500).json({message:"Internal server eroor"})
    }
})


module.exports = router