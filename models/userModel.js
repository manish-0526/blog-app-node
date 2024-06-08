const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;
    next();
})

userSchema.methods.isPasswordValid = async function (password) {
    const compare = await bcrypt.compare(password, this.password);

    return compare;
}

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;