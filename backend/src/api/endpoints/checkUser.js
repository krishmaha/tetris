import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    // fill in with the details you expect from a user
    username: {type: String, required: true, unique: true} ,
    password: {type: String, required: true, minlength: 5}
});

userSchema.plugin(uniqueValidator);

var u = mongoose.model('users1', userSchema);

// import everything with the name user from this file

export const checkUserEndpoint = async () => {

    const allUsers = await u.find({});
    allUsers.map((u) => {
        console.log(u.username)
    });

    return allUsers;
    
}