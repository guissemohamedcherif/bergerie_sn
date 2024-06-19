const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require ('bcrypt');
const { validate } = require('deep-email-validator');

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
}
// refreshTokens
let refreshTokens = []
function generateRefreshToken(user) {
    const refreshToken = 
    jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
    refreshTokens.push(refreshToken)
    return refreshToken
}

exports.RegisterUser = async (req, res) => {
    
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        const accessToken = generateAccessToken({user: savedUser.email})
        res.status(201).json(
            {
                user:user,
                token:accessToken
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }};


userLogin = async (req, res) => {

    // const checkEmail = validate(req.body.email);
    // if (!checkEmail.valid) {
    //     return res.status(400).send({
    //         status: 'error',
    //         message: 'Email is not valid. Please try again!',
    //     });
    // }
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken ({user: req.body.email})
            const refreshToken = generateRefreshToken ({user: req.body.email})
            res.json ({
                data: user,
                accessToken: accessToken,
                refreshToken: refreshToken})
        }
        else {
            res.status(401).send("Password Incorrect!");
        }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { generateAccessToken, userLogin};