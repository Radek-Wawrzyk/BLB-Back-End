import Teams from '../models/team';
import fs from 'fs'

export default {
  async create(req, res, next) {
	var imgUrl = 'def';
	if(req.files && req.files.photo){
	  imgUrl = Math.random().toString(36).substr(2, 9);
	  req.files.photo.mv('photos/teams/' + imgUrl +'.png', function(err) {
	    if (err)  console.log(err);
	  });
	}
	
	var data = req.body;
	data.imgUrl = imgUrl;
    const team = await Teams.create(data);
	
    return res.status(200).send({data: team, message: `Team was saved`});
  },

  async findAll(req, res, next) {
    const teams = await Teams.find();

    return res.status(200).send({data: teams});
  },
  
  async uploadPhoto(req, res, next) {
	if(!req.body.id)
		return res.status(500).send({error: 'No requested id!'});
	if(!req.files || !req.files.photo)
		return res.status(500).send({error: 'No file sent!'});
	
	var file = Math.random().toString(36).substr(2, 9);
	req.files.photo.mv('photos/teams/' + file +'.png', function(err) {
	  if (err)
		return res.status(500).send(err);
    });
	
	
	var team = await Teams.findById(req.body.id);
	console.log(process.cwd() + '/photos/teams/' + team.imgUrl +'.png');
	fs.unlink(process.cwd() + '/photos/teams/' + team.imgUrl +'.png', function(err){}); //remove old image
	team.imgUrl = file;
	team.save(function(){
	  return res.status(200).send({data: 'done'});
	});
  },
  
  async getPhoto(req, res, next) {
	if(!req.body.id)
		return res.status(500).send({error: 'No requested id!'});
	
    const team = await Teams.findById(req.body.id);
	var file = team.imgUrl;
	
    return res.status(200).sendFile(process.cwd() + '/photos/teams/' + file +'.png');
  }
}