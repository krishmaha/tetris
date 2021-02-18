import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // fill in with the details you expect from a user
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5}
});

userSchema.plugin(uniqueValidator);

// User is our model
export const User = mongoose.model('users', userSchema);