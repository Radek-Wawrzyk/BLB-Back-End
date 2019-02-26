import mongoose from 'mongoose';

const Team = mongoose.Schema({
    name: String,
    imgUrl: String,
    stats: {},
    players: {},
});

export default mongoose.model('Teams', Team);