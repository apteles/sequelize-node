module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "secret",
  database: "sequelize_node",
  define: {
    timestamps: true,
    underscored: true
  }
};
