const User = require("../models/User");

class UserControllers {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  }

  async create(req, res) {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    return res.json(user);
  }
}

module.exports = new UserControllers();
