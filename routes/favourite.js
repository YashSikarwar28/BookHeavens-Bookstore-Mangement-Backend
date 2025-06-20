//Backend code consists of adding book to favourite , removing book from favourite , and adding favourite book for a particular user using populate() function to get all the data of the book which the user has put in the favourites.

const router = require("express").Router()
const User = require("../models/user")
const {authenticateToken} = require("./userAuth")


//add book to favourite
router.put("/add-book-to-fav",authenticateToken,async (req,res)=>{
    try {
        
        const{bookid,id} = req.headers //bookid is the id of thar particular book and id is the user id who is logged in
        const userdata = await User.findById(id)
        const isBookFav = userdata.favourites.includes(bookid) //favourites is from the user.js file in the models folder

        if(isBookFav){
            return res.status(200).json({message:"Book is already in favourites"})
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}}) //push is used to add the book into favourites as it is an array
        return res.status(200).json({message:"Book added to favourite"})

    } catch (error) {
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
})


//remove book from favourite
router.put("/remove-book-from-fav",authenticateToken,async (req,res)=>{
    try {
        
        const{bookid,id} = req.headers //bookid is the id of thar particular book and id is the user id who is logged in
        const userdata = await User.findById(id)
        const isBookFav = userdata.favourites.includes(bookid) //favourites is from the user.js file in the models folder

        if(isBookFav){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
            return res.status(200).json({message:"Book removed from favourites"})
        }

        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}}) //push is used to add the book into favourites as it is an array
        return res.status(200).json({message:"Book added to favourite"})

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})


//adding favourite books for a particular user
router.get("/get-fav-books",authenticateToken,async(req,res)=>{
    try {
        
        const{id}=req.headers
       
        const userdata = await User.findById(id).populate("favourites")//using id to get the data of particular user and then using populate to add book to the favourites array

        const favbooks= userdata.favourites
        return res.status(200).json({
            status:"Success",
            data:favbooks   
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
})


module.exports = router