import mongoose from 'mongoose';

const News = mongoose.Schema({
	title: String,
	imgUrl: String,
	date: Date,
	content: String,
	comments: [{ //in future
	}]
});

export default mongoose.model('News', News);