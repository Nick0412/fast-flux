const PostModel = require('../models/PostModel');
const jwt = require('jsonwebtoken');

class PostService {
    static async create(postData) {
        try {
            await PostModel.create({
                user_id: postData.user_id,
                content: postData.content,
                post_timestamp: new Date(Date.now()).toISOString()
            });
            return {
                status: 200,
                message: "Post created successfully."
            }
        }
        catch (ex) {
            return {
                status: 400,
                message: "Post not created."
            }
        }
    }
};