module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './model/database.sqlite3'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'example'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   }
  // }
};
