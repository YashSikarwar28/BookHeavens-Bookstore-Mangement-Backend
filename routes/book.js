//adding,updating and deleting books by admin and other book functionality available for all the user  


const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
const book = require("../models/book");


//add book backend functionality - admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    //checking whether the person is admin or not using "id"
    const { id } = req.headers;
    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res.status(400).json({ message: "You are not the admin" });
    }

    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
    });

    await book.save();
    return res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});


//update book backend functionality - admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {

      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      description: req.body.description,
      language: req.body.language,
    
    });

    return res.status(200).json({message:"Book updated successfully"})

  } catch (error) {
    
    return res
      .status(500)
      .json({ message: "An error occured", error: error.message });
  
    }
});


//delete book - admin
//we use "delete" to delete something from database
router.delete("/delete-book",authenticateToken,async (req,res) => {
    try {
        
        const {bookid} = req.headers
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({message:"Book Deleted Successfully"})

    } catch (error) {
        return res.status(500).json({message:"An error occured",error:message.error})
    }
})


//getting books data to display - public not restricted to admin
router.get("/get-all-books",async(req,res)=>{
    try {

        const books = await Book.find().sort(({createdAt:-1}))
        return res.status(200).json({status:"Success",data:books})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
})


//recently added books limit to 4 - public not restricted to admin
router.get("/get-recent-books",async(req,res)=>{
    try {
        
        const books = await Book.find().sort({createdAt:-1}).limit(4)
        return res.status(200).json({
            status:"Success",
            data:books,
        })

    } catch (error) {
        return res.status(500).json({message:"Internal server error"})
    }
})


//getting the details of the book by id - public not restricted to admin
router.get("/get-book-by-id/:id", async(req,res)=>{
    try {
        
        const {id} = req.params // params will extract the book id parameter from the url
        const book = await Book.findById(id)
        return res.status(200).json({status:"Success",data:book})

    } catch (error) {

        return res.status(500).json({message:"Internal server error",error:message.error})
    }
})

module.exports = router;
