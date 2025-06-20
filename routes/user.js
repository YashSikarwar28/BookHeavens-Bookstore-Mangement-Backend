//Signin , Signup form and other functionality

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//Signup form authentication
router.post("/signup", async (req, res) => {
  try {
    const { username, password, email, address } = req.body;

    //checking username length
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    //checking if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //checking existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //checking password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 6" });
    }

    const hashpass = await bcrypt.hash(password, 15); //using bcrypt so that no one can see the password

    const newUser = new User({
      username: username,
      email: email,
      password: hashpass,
      address: address,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignUp Successful" });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

//Signin form authentication
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.username },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookstore123", {
          expiresIn: "30d",
        });

        return res.status(200).json({
          id: existingUser._id,
          role: existingUser.role,
          token: token,
        });
      } else {
        return res.status(400).json({ messasge: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//get user information
router.get("/get-user-info", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password"); //-password means that password will not be shown in the response and findById it will get the user info for that particular id.
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//update address
//for updating anything we use "put" request
router.put("/update-address",authenticateToken,async(req,res)=>{
  try {

    const {id} = req.headers //req.headers means we'll extract the id from the header and then compare it.
    
    const {address} = req.body//req.body means the response we get after sending request we'll take the address from it and then compare.
    
    await User.findByIdAndUpdate(id,{address:address})
    return res.status(200).json({message:"Address updated successfully"})
  
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
  }
});

module.exports = router;
