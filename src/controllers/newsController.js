import News from '../models/news';

export default {
  async update(req, res, next) {
	if(!req.userInfo || !req.userInfo.permissions || !req.userInfo.permissions.news)
		return res.status(500).send({error: 'Permission deined!'});
	
	if(req.body.id){
	  if(req.body.remove){
	    try {
	      await News.findByIdAndRemove(req.body.id);
		  return res.status(200).send({data:'Removed successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'News not found!'});
	    }
      }else{
	    try {
	      const news = await News.findByIdAndUpdate(req.body.id, req.body);
		  return res.status(200).send({data: news, message:'News was saved successfully'});
	    }catch(error) {
	      return res.status(500).send({error: 'News not found!'});
	    }
	  }
	}else{
	  const news = await News.create(req.body);
      return res.status(200).send({data: news, message: `News was saved`});
	}
  },

  async findAll(req, res, next) {
    var news;
    if(req.body.id)
      try{
		news = await News.findById(req.body.id);
	  }catch(err){
		res.status(500).send({data:"News not found"});
	  }
    else
      news = await News.find(req.body);
 
    return res.status(200).send({data: news});
  }
}