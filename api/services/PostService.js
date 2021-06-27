const PostModel = require('../models/PostModel')

class PostService {
  static async create (postData) {
    await PostModel.create({
      user_id: postData.userId,
      content: postData.content,
      post_timestamp: new Date(Date.now()).toISOString()
    })
  }

  static async update (postData) {
    await PostModel.update({
      content: postData.content
    },
    {
      where: {
        id: postData.postId,
        user_id: postData.userId
      }
    })
  }

  static async read (postData) {
    const post = await PostModel.findOne({
      where: {
        id: postData.postId
      }
    })
    return post
  }

  static async delete (postData) {
    PostModel.destroy({
      limit: 1,
      where: {
        user_id: postData.userId,
        id: postData.postId
      }
    })
  }
};

module.exports = PostService
