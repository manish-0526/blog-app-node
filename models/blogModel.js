const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    summery: {
        type: String,
        required: true
    },
    readCount: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: false
    }
}, { timestamps: true })

var populateCreatorField = function (next) {
    this.populate('creator', '_id fname lname')
    next()
}

blogSchema.pre('find', populateCreatorField)
blogSchema.pre('findOne', populateCreatorField)

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;