const User = require('../models/userModel.js')



// controller function for creating user
exports.createUser = async (req, res) =>  {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: 'One or more fields are empty'})

        }
        
        const existingUser = User.findOne({username: username})
        if(existingUser){
            return res.status(409).json({
                message:  "Username already exists"
            });
        }
        
        const user = await User.create({
            username,
            email,
            password,
        })

        res.status(201).json({'message': 'Form submitted successfully'}, user)
    }
    catch(err){
        res.status(500).json({'message':  'Server error occured'})
    }
}



// login controller function
