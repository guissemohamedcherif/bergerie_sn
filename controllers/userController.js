const User = require('../models/user');
const { generateAccessToken } = require('../controllers/authController'); // Correct import path
const jwt = require("jsonwebtoken");


function generatePassword() {
    const password_charset = process.env.PASS_GENERATION_DATAS 
    var length = 8,
        retVal = "";
    for (var i = 0, n = password_charset.length; i < length; ++i) {
        retVal += password_charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const pass = generatePassword();
        user.password = pass;
        const savedUser = await user.save();
        const accessToken = generateAccessToken({user: savedUser.email})
        res.status(201).json(
            {
                user:user,
                generate_password: pass,
                token:accessToken
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

exports.updateUser = async (req, res) => {
    try {
        const user =
            await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
        if (!user) {
            return res.status(404)
                .json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404)
            .json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const result = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const currentUser = await User.findOne({email: result.user});
        if(!currentUser) {
            return res.status(404).json({ error: 'No user connected' });
        }
        res.json(currentUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };