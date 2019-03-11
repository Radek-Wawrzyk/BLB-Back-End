import Teams from '../models/team';
import fs from 'fs'

export default {
  async addPlayer(teamId, playerData){
	var team;
	  try{
		  team = await Teams.findByIdAndUpdate(teamId, {"$push":{"players": playerData}});
	  }catch(err){
		  return {'err': "cannot find team!"};
	  }
	  if(!team)
	    return {'err': "cannot find team!"};
	  return {'data': team};
  },
  async removePlayer(teamId, playerId){
	var team;
	try{
		team = await Teams.findByIdAndUpdate(teamId, {"$pull":{"players": {"_id":playerId}}});
	  }catch(err){
		return {'err': err};
	  }
	return {'data': team};
  },
  
  async update(req, res, next) {
	var imgUrl = 'def';
	if(req.files && req.files.photo){
	  imgUrl = Math.random().toString(36).substr(2, 9);
	  req.files.photo.mv('photos/teams/' + imgUrl +'.png', function(err) {
	    if (err)  console.log(err);
	  });
	}
	
	var data = req.body;
	delete data.players;
	data.imgUrl = imgUrl;
	
	var team;
	if(req.body.id){
	  if(req.body.remove){
		try {
	      team = await Teams.findByIdAndRemove(req.body.id);
		  return res.status(200).send({data:'Removed successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'Team not found!'});
	    }
	  }
	  if(data.imgUrl == 'def')
		  delete data.imgUrl;
	  try {
	    team = await Teams.findByIdAndUpdate(req.body.id, data);
		if(data.imgUrl)
		  fs.unlink(process.cwd() + '/photos/teams/' + team.imgUrl +'.png', function(err){}); //remove old image
	  }catch(error) {
	    return res.status(500).send({error: 'Team not found!'});
	  }
	}else{
	  team = await Teams.create(data);
	}
	
    return res.status(200).send({data: team, message: `Team was saved`});
  },

  async find(req, res, next) {
    var teams;
    if(req.body.id)
      try{
		teams = await Teams.findById(req.body.id);
	  }catch(err){
		res.status(500).send({data:"Team not found"});
	  }
    else
      teams = await Teams.find();
 
    return res.status(200).send({data: teams});
  },
  
  async getPhoto(req, res, next) {
	if(!req.body.id)
		return res.status(500).send({error: 'No requested id!'});
	
    const team = await Teams.findById(req.body.id);
	var file = team.imgUrl;
	
    return res.status(200).sendFile(process.cwd() + '/photos/teams/' + file +'.png');
  }
}