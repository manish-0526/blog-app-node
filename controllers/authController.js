const userModel = require('../models/userModel')
const { createToken } = require('../utils/jwt')

const signup = async (fname, lname, email, password) => {
    const user = await userModel.findOne({
        email: email,
    });

    if (user) {
        return {
            error: {
                messages: [
                    'User with this email already exists'
                ],
                data: {
                    fname,
                    lname,
                    email,
                    password
                }
            }
        }
    }

    try {
        const newUser = await userModel.create({
            fname: fname,
            lname: lname,
            email: email,
            password: password,
        });

        const token = createToken(newUser);

        return {
            token
        }
    }
    catch (error) {
        return {
            error: {
                messages: [
                    error
                ],
                data: {
                    fname,
                    lname,
                    email,
                    password
                }
            }
        }
    }
}

const login = async (email, password) => {
    if (!email || !password) {
        return {
            error: {
                messages: [
                    'Email and Password is required'
                ],
                data: {
                    email,
                    password
                }
            }
        }
    }

    const user = await userModel.findOne({
        email: email
    })


    if (!user) {
        return {
            error: {
                messages: [
                    'User with this email does not exists'
                ],
                data: {
                    email,
                    password
                }
            }
        }
    }

    const isPasswordValid = await user.isPasswordValid(password)

    if (!isPasswordValid) {
        return {
            error: {
                messages: [
                    'Wrong Password'
                ],
                data: {
                    email,
                    password
                }
            }
        }
    }

    const token = createToken(user);

    return {
        token
    }
}

module.exports = {
    signup,
    login
}