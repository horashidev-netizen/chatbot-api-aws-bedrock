export default () => ({
  port: parseInt(process.env.PORT ?? '8000', 10),
  database: {
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
});