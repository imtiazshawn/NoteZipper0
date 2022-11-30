const registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, pic } = req.body;
    
        res.status(201).json({
            name, 
            email,
            password,
            pic
        })
    } catch (error) {
        res.send(error.message);
    }
};


module.exports = registerUser;
