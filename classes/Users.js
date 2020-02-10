const DB = require("../models/DB");

class Users {
  constructor() {
    this.dbConn = new DB();
  }

  /**
   * Get the users collection
   */
  getUsersCollection = async () => {
    const db = await this.dbConn.connect();
    return await db.collection("users");
  };

  /**
   * Retrieves user with username and password match
   * @param {Object}
   * @param {string} user.username
   * @param {string} user.password
   * @returns {Promise} MongoDB user object from users collection
   *
   */
  getUser = async ({ username, password }) => {
    try {
      const users = await this.getUsersCollection();
      const user = await users.findOne({
        username: username,
        password: password
      });
      return user;
    } catch (error) {
      return console.log(error);
    }
  };

  /**
   * Find if username already exists in the database.
   * @param {Object}
   * @param {string} user.username
   * @returns {Promise} MongoDB user object from users collection
   */
  findExistingUsername = async ({ username }) => {
    try {
      const users = await this.getUsersCollection();
      const user = await users.findOne({
        username: username
      });
      return user;
    } catch (error) {
      return console.log(error);
    }
  };

  /**
   * Inserts user into username and password into users collection
   * @param {Object}
   * @param {string} user.username
   * @param {string} user.password
   * @returns {Promise} MongoDB insert cursor for users collection
   *
   */
  insertUser = async ({ username, password }) => {
    try {
      const users = await this.getUsersCollection();
      const insertCursor = await users.insertOne({
        username: username,
        password: password
      });
      console.log(`${await insertCursor.insertedCount} document inserted`);
      return insertCursor;
    } catch (error) {
      return console.log(error);
    }
  };
}

module.exports = Users;
