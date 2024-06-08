require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign({
        user: {
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email
        }
    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    return token
}

const verifyToken = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET)

    return data
}


module.exports = {
    createToken,
    verifyToken
}