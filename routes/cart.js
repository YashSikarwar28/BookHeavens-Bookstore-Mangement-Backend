//adding book , removing book and getting cart of the user - it's similar to the favourite route


const router = require("express").Router()
const User = require("../models/user")
const {authenticateToken} = require("./userAuth")


//adding book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try {
        
        const{bookid,id} = req.headers
        const userdata = await User.findById(id)
        const isbookincart = userdata.cart.includes(bookid)

        if(isbookincart){
            return res.json({
                status:"Success",
                message:"Book is already in cart"
            })
        }

        await User.findByIdAndUpdate(id,{
            $push : {cart:bookid}
        })

        return res.json({
            status:"Success",
            message:"Book added to cart"
        })

    } catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
})


//removing book from cart - we do not use delete route because we don't want to delete the item we want to update it. If we use delete it will get removed from database.
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try {
        //we can use params or headers our choice
        const{bookid} = req.params
        const {id} = req.headers
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        })

        return res.json({
            status:"Success",
            message:"Book removed from cart"
        })

    } catch (error) {
         return res.status(500).json({message:"Internal server error",error:error.message})
    }
})


//getting a cart of a particular person
router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try {
        
        const {id} = req.headers
        const userdata = await User.findById(id).populate("cart")
        const cart = userdata.cart.reverse() //the book which the user enters the latest will be displayed at the top of the cart using reverse()

        return res.json({
            status:"Success",
            data:cart,
        })

    } catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
})

module.exports = router