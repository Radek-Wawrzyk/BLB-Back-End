import Players from '../models/player';
import teams from '../controllers/teamsController';
import fs from 'fs'

export default {
  async changeTeamInfo(teamInfo){
	  console.log(teamInfo);
	  
    await Players.update({"team._id": teamInfo._id}, {'$set': {'team.name': teamInfo.name, 'team.imgUrl': teamInfo.imgUrl}}, {'multi': true});
  },
  
  async update(req, res, next) {
	var imgUrl = 'def';
	if(req.files && req.files.photo){
	  imgUrl = Math.random().toString(36).substr(2, 9);
	  req.files.photo.mv('photos/players/' + imgUrl +'.png', function(err) {
	    if (err)  console.log(err);
	  });
	}
	
	var data = req.body;
	data.imgUrl = imgUrl;
	
	var player;
	if(data._id){
	  if(data.remove){
		try {
	      player = await Players.findByIdAndDelete(data._id);
		  if(player.team && player.team._id)
		    teams.removePlayer(player.team._id, player._id);
		  return res.status(200).send({data:'Removed successfully'}); 
	    }catch(error) {
	      return res.status(500).send({error: 'Player not found!'});
	    }
	  }
	  
	  if(data.imgUrl == 'def')
		  delete data.imgUrl;
	  try {
	    player = await Players.findByIdAndUpdate(data._id, data);
		if(data.imgUrl)	//remove old image
		  fs.unlink(process.cwd() + '/photos/players/' + player.imgUrl +'.png', function(err){}); //remove old image
		if(player.team && player.team._id)
		  if(data.team && data.team._id){
		    teams.removePlayer(player.team._id, player._id);
		  }else{
			teams.updatePlayer(player.team._id, {"_id": player._id, "name": data.name || player.name, "imgUrl":data.imgUrl || player.imgUrl});
		  }
	  }catch(error) {
	    return res.status(500).send({error: 'Player not found!'});
	  }
	}else
	  player = await Players.create(data);
	
	if(data.team && data.team._id && !data.remove){
	  var resp = await teams.addPlayer(data.team._id, {"_id": player._id, "name": data.name || player.name, "imgUrl":data.imgUrl || player.imgUrl});
	  player = await Players.findByIdAndUpdate(data._id||player._id, {"team": resp.data});
	  if(resp.err)
		return res.status(500).send({data: player, message: 'Team not found!'});
	}
	
    return res.status(200).send({data: player, message: `Player was saved`});
  },

  async find(req, res, next) {
	var data;
	if(req.body._id){
		try{
		  data = await Players.findById(req.body._id);
		}catch(err){
          return res.status(500).send({data: "Player not found!"})
		}
  	  if(!data)
	    return res.status(500).send({data: "Player not found!"})
	}else
		data = await Players.find();

    return res.status(200).send({data: data});
  },
  
  async getPhoto(req, res, next) {
	if(!req.body._id)
		return res.status(500).send({error: 'No requested id!'});
	
	var player;
	try{
	  player = await Players.findById(req.body._id);
	}catch(err){
	  return res.status(500).send({data: "Player not found!"})
	}
	if(!player)
	  return res.status(500).send({data: "Player not found!"})
	var file = player.imgUrl;
	
    return res.status(200).sendFile(process.cwd() + '/photos/players/' + file +'.png');
  }
}