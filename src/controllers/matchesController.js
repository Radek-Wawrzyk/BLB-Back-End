import Matches from '../models/match';

export default {
  async update(req, res, next) {
	if(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.matches)
		return res.status(500).send({error: 'Permission deined!'});
	
	if(req.body.id){
	  if(req.body.remove){
	    try {
	      await Matches.findByIdAndRemove(req.body.id);
		  return res.status(200).send({data:'Removed successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'Match not found!'});
	    }
      }else{
	    try {
	      const match = await Matches.findByIdAndUpdate(req.body.id, req.body);
		  return res.status(200).send({data: match, message:'Match was saved successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'Match not found!'});
	    }
	  }
	}else{
	  const match = await Matches.create(req.body);
      return res.status(200).send({data: match, message: `Match was saved`});
	}
  },

  async findAll(req, res, next) {
    var matches;
    if(req.body.id)
      try{
		matches = await Matches.findById(req.body.id);
	  }catch(err){
		res.status(500).send({data:"Match not found"});
	  }
    else
      matches = await Matches.find(req.body);
 
    return res.status(200).send({data: matches});
  },
  
  async findUpcoming(req, res, next){
     var matches;
    try{
	  matches = await Matches.find({'date':{'$gt':Date.now()}}, null, {'sort': 'date'});
    }catch(err){
	  res.status(500).send({data:"Match not found"});
    }
 
    return res.status(200).send({data: matches});
  }
}