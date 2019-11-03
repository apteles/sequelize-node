const User = require("../models/User");
const Tech = require("../models/Tech");

class TechsController {
  async index(req, res) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: { association: "techs", through: { attributes: [] } } // To omit the associations attributes this line is necessary
    });

    return res.json(user);
  }

  async create(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const [tech] = await Tech.findOrCreate({ where: { name } });

    await user.addTech(tech);

    return res.json(tech);
  }

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const tech = await Tech.findOne({ where: { name } });

    await user.removeTech(tech);

    return res.json();
  }
}

module.exports = new TechsController();
