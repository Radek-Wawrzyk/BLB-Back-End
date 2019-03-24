import mongoose from 'mongoose';

const Match = mongoose.Schema({
	title: String,
	imgUrl: String,
	date: Date,
	content: String,
	comments: [{ //in future
	}]
});

export default mongoose.model('Teams', Team);