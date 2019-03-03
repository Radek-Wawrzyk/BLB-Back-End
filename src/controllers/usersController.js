import Users from '../models/user';

export default {
  async update(req, res, next) {
	if(req.body.id){
	  if(req.body.remove){
	    try {
	      await Users.findByIdAndRemove(req.body.id);
		  return res.status(200).send({data:'Removed successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'User not found!'});
	    }
      }else{
	    try {
	      const user = await Users.findByIdAndUpdate(req.body.id, req.body);
		  return res.status(200).send({data: user, message:'User was saved successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'User not found!'});
	    }
	  }
	}else{
	  const user = await Users.create(req.body);
      return res.status(200).send({data: user, message: `User was saved`});
	}
  },

  async findAll(req, res, next) {
    const users = await Users.find();

    return res.status(200).send({data: users});
  }
}