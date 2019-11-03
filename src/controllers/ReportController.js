const User = require("../models/User");
const { Op } = require("sequelize");
class ReportController {
  async show(req, res) {
    /**
     * Task:
     * 1. Find all user that has email that end with @gmail.com
     * 2. From this users you should to find for everyone that lives on street 'Henrique Perim',
     * 3. By the end, you should to find by all tecnologies of user that  starts with React
     */

    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: "%gmail.com"
        }
      },
      include: [
        {
          association: "addresses",
          where: { street: "Rua henrique perim" }
        },
        {
          association: "techs",
          required: false,
          where: {
            name: {
              [Op.iLike]: "NodeJs%"
            }
          }
        }
      ]
    });

    return res.json(users);
  }
}

module.exports = new ReportController();
