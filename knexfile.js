// Update with your config settings.

module.exports = {
  development: {
    client: process.env.NEXT_PUBLIC_DB_CLIENT,
    connection: {
      host: process.env.NEXT_PUBLIC_DB_HOST,
      user: process.env.NEXT_PUBLIC_DB_USER,
      password: process.env.NEXT_PUBLIC_DB_PASS,
      database: process.env.NEXT_PUBLIC_DB_NAME,
    },
  },
}
