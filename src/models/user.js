import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = mongoose.Schema({
    name: String,
    surName: String,
    age: Number,
    location: String,
    email: String,
	password: String, //md5
	permissions: {
		teams: Boolean,		//write
		players: Boolean,	//write
		news: Boolean,		//write
		matches: Boolean,	//write
		users: Boolean		//read/write
	}
});

User.pre('save', function(next){
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

export default mongoose.model('Users', User);