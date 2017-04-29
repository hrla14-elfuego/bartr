module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/database.sqlite3'
    },
    migrations: {
      directory: './db/migrations'
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
