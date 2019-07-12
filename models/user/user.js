const db = require('../../config/dbUtil').getConnection();

let collection = db.collection('users');

module.exports = {
  async createUser(data) {
    try {
      console.log('registration');

      let user = {
        email: data.email,
        name: data.name,
        pass: data.pass,
        avatar: '',
        rate: '',
        description: ''
      };
      let res = await collection.insertOne(user);
      if (res.result.ok == 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  },
  async checkUserEmail(email) {
    try {
      let query = { email: email };

      let res = await collection.findOne(query);

      if (res == null) return true;
      return false;
    } catch (error) {
      throw error;
    }
  },
  async loginUser(email, pass) {
    try {
      let query = { email };
      let res = await collection.findOne(query);
      if (res == null) return false;
      return { email: res.email, id: res._id, pass: res.pass };
    } catch (error) {}
  }
};
