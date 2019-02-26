import Teams from '../models/team';

export default {
  async create(req, res, next) {
    const user = await Teams.create(req.body);
	
    return res.status(200).send({data: user, message: `Team was saved`});
  },

  async findAll(req, res, next) {
    const users = await Teams.find();

    return res.status(200).send({data: users});
  }
}