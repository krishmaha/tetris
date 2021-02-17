import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // fill in with the details you expect from a user
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5}
});

userSchema.plugin(uniqueValidator);

var u = mongoose.model('users', userSchema);

// import everything with the name user from this file

export const createUserEndpoint = async () => {
    const user = new u({
        username: "username3",
        password: "something"
    });
    await user.save();
    return user;
}
