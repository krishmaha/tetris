import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    // fill in with the details you expect from a user
    score: {type: Number, required: true}
});

scoreSchema.plugin(uniqueValidator);

// User is our model
export const Scores = mongoose.model('score', scoreSchema);

