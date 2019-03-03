import Players from '../models/player';
import Teams from '../models/team';
import fs from 'fs'

export default {
  async update(req, res, next) {
	//TODO adding, changing, removing from team list, insert data about team
	  
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
	if(req.body.id){
	  if(req.body.remove){
		try {
	      await Players.findByIdAndRemove(req.body.id);
		  return res.status(200).send({data:'Removed successfully'}); 
	    }catch(error) {
	      return res.status(500).send({error: 'Player not found!'});
	    }
	  }
	  if(data.imgUrl == 'def')
		  delete data.imgUrl;
	  try {
	    player = await Players.findByIdAndUpdate(req.body.id, data);
		if(data.imgUrl)	//remove old image
		  fs.unlink(process.cwd() + '/photos/players/' + player.imgUrl +'.png', function(err){}); //remove old image
	  }catch(error) {
	    return res.status(500).send({error: 'Player not found!'});
	  }
	}else
	  player = await Players.create(data);
	
	
    return res.status(200).send({data: player, message: `Player was saved`});
  },

  async find(req, res, next) {
	var data;
	if(req.body.id){
		try{
		  data = await Players.findById(req.body.id);
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
	if(!req.body.id)
		return res.status(500).send({error: 'No requested id!'});
	
	var player;
	try{
	  player = await Players.findById(req.body.id);
	}catch(err){
	  return res.status(500).send({data: "Player not found!"})
	}
	if(!player)
	  return res.status(500).send({data: "Player not found!"})
	var file = player.imgUrl;
	
    return res.status(200).sendFile(process.cwd() + '/photos/players/' + file +'.png');
  }
}