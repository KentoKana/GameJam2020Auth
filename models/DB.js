const MongoClient = require("mongodb").MongoClient;

class DB {
  constructor() {
    this.connectionString = `mongodb+srv://token:${process.env.DB_PASSWORD}@game-jam-2020-5qab3.mongodb.net/test?retryWrites=true&w=majority`;
    this.client = new MongoClient(this.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  /**
   * Database connection method
   * Returns a promise of "game" database
   */
  async connect() {
    try {
      await this.client.connect();
      return await this.client.db("game");
    } catch (error) {
      return error;
    }
  }

  /**
   * Close database connection method
   */
  close = () => {
    this.client.close();
  };
}

module.exports = DB;
