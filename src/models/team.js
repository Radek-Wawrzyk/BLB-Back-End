import mongoose from 'mongoose';

const Team = mongoose.Schema({
    name: String,
    imgUrl: String,
    stats: {
		wins: Number,
		looses: Number,
	},
    players: [{
		name: String,
		imgUrl: String
	}],
});

export default mongoose.model('Teams', Team);