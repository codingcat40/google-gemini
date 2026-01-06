const User = require('../models/userModel.js')


exports.createUser = async (req, res) =>  {
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message: 'One or more fields are empty'})

        }
        const user = User.create({
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