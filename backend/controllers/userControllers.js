const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');


// Register Functionality
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, pic } = req.body;

        // If user already exists
        const userExists = await User.findOne({ email});
        if(userExists){
            res.status(400);
            throw new Error("This User Already Exists!");
        }

        // Create New User in DataBase
        const user = await User.create({
            name,
            email,
            password,
            pic,
        })
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id),
            });
        } else{
            throw new Error("Error Occured!")
        }

    } catch (error) {
        res.send(error.message);
    }
});


// Login Functionality
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else{
        throw new Error("Invalid Email or Password!")
    }
});



module.exports = {registerUser, authUser};
