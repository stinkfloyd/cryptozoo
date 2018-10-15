// Define DB connections for different environments
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/dbname-dev'
  },
  test: {
    // Intentionally left empty
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}