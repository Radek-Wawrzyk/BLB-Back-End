import Users from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default {
  async update(req, res, next) {
	if(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.users)
		return res.status(500).send({error: 'Permission deined!'});
	
	if(req.body._id){
	  if(req.body.remove){
	    try {
	      await Users.findByIdAndRemove(req.body._id);
		  return res.status(200).send({data:'Removed successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'User not found!'});
	    }
      }else{
	    try {
	      const user = await Users.findByIdAndUpdate(req.body._id, req.body);
		  if(!user) return res.status(500).send({error: 'User not found!'});
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
	if(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.users)
		return res.status(500).send({error: 'Permission deined!'});
	
    var users;
    if(req.body._id)
      try{
		users = await Users.findById(req.body._id);
	  }catch(err){
		res.status(500).send({data:"User not found"});
	  }
    else
      users = await Users.find(req.body);
 
    return res.status(200).send({data: users});
  },
  
  async authenticate(req, res, next){
    Users.findOne({name:req.body.name}, function(err, user){
	  if (err || !req.body.password || !user) {
	    res.status(500).send({message: "Invalid email/password!", data:null});
      } else {
	    if(bcrypt.compareSync(req.body.password, user.password)) {
	      const token = jwt.sign({id: user._id, 'userInfo': user}, req.app.get('secretKey'), { expiresIn: '1h' });
	      return res.status(200).send({message: "logged in", data:{user: user, token:token}});
	    }else{
	      return res.status(500).send({message: "Invalid email/password!", data:null});
	    }
      }
	});
  },
  
  async validate(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        return res.status(500).send({message: err.message, data:null});
      }else{
        // add user data to request
		req.userInfo = decoded.userInfo;
        next();
      }
    });
  }
}