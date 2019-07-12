const db = require('../../config/dbUtil').getConnection();

let collection = db.collection('blogs');
module.exports = {
  async getBlog(id) {
    try {
      let query = { id };
      let res = await collection.findOne(query);
      return res;
    } catch (error) {
      throw error;
    }
  },
  async putBlog(data) {
    try {
      data.comments = [];
      data.likes = 0;
      data.views = 0;
      return await collection.insertOne(data);
    } catch (error) {
      throw error;
    }
  }
};
