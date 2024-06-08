const blogModel = require('../models/blogModel')

const getBlog = async (id) => {
    const blog = await blogModel.findOne({
        _id: id
    })

    return blog
}

const getBlogs = async (count = 0) => {
    const blogs = await blogModel.find()
        .sort({ createdAt: -1 })
        .limit(count)

    return blogs
}

const getBlogsByCreator = async (id) => {
    const blogs = await blogModel.find({ creator: id })
        .sort({ createdAt: -1 })

    return blogs
}

const saveBlog = async (title, summery, readCount, body, user) => {
    await blogModel.create({
        creator: user._id,
        title: title,
        summery: summery,
        readCount: readCount,
        body: body,
    })
}

const updateBlog = async (id, title, summery, readCount, body, user) => {
    await blogModel.findByIdAndUpdate(id, {
        creator: user._id,
        title: title,
        summery: summery,
        readCount: readCount,
        body: body,
    })
}

const deleteBlog = async (id) => {
    await blogModel.findByIdAndDelete(id)
}

const increaseBlogReadCount = async (blog) => {
    await blogModel.findByIdAndUpdate(blog._id, {
        readCount: blog.readCount + 1,
    })
}

module.exports = {
    getBlog,
    getBlogs,
    getBlogsByCreator,
    saveBlog,
    updateBlog,
    deleteBlog,
    increaseBlogReadCount
}