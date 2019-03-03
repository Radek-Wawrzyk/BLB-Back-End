import mongoose from 'mongoose';

const Player = mongoose.Schema({
	name: String,
	imgUrl: String,
	stats:{},
	team: {
		id: String,
		name: String,
		imgUrl: String
	}
});

export default mongoose.model('Players', Player);