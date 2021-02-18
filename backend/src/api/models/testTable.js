import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const testSchema = new Schema({
    // fill in with the details you expect from a table
    text: {type: String, required: true}
});

testSchema.plugin(uniqueValidator);

// User is our model
export const Test = mongoose.model('test', testSchema);