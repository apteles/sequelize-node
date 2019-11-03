const Address = require("../models/Address");
const User = require("../models/User");

class AddressController {
  async create(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      user_id
    });

    return res.json(address);
  }

  async index(req, res) {
    const { user_id } = req.params;

    /**
     * instead of do this
     */

    // const user = await User.findByPk(user_id);

    /**
     * I do this.
     */
    const user = await User.findByPk(user_id, {
      include: {
        association: "addresses" // this association only works if on model has the method associate indicate wich cardinality is using.
      }
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    // This line is not necessary beacause of association did above, in line 31.
    //const address = await Address.findAll({ where: { user_id } });

    return res.json(user);
  }
}

module.exports = new AddressController();
