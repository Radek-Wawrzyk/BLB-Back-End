import mongoose from 'mongoose';

const Match = mongoose.Schema({
    date: Date,
    loc: String,
    facts:[{
		type: Number,				//TODO nubers
		player:{
			name: String //id is by default
		},
		player2:{
			name: String
		}
	}],
	hosts:{
		_id: String,
		name: String,
		players:[{
			name: String,
			stats:{}
		}]
	},
	guests:{
		_id: String,
		name: String,
		players:[{
			name: String,
			stats:{}
		}]
	},
	score:{ hosts: Number, guests: Number},
	held: Boolean,
	round: Number
});

export default mongoose.model('Matches', Match);