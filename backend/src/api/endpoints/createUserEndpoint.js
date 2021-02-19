import { User } from '../models/user.js'


export const createUserEndpoint = async (req, res) => {
    //Display the request body in terminal so we can test and debig it's the correct value
    console.log("Request body/content: " + req.body.username + req.body.password);

    // We try to save a user to the database
    try {
        // Create a new variable of type User 
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user to the db
        await user.save();

        // send a response for the request
        // if you don't send a response, the request will not know if it was finished and it keep loading
        res.json({ message: "The user was created"});


    } catch(err) {
        // if we have errors, we catch them and we send them as a response
        res.json(err);
    }
}

// How to fix ' ValidationError: users validation failed: name: Path , In your code I can see that you are setting newUser as User() model object, then setting that to a plain javascript object. Which is wrong syntactically as well. ValidationError: User validation failed: username: Path username is required. I am a Beginner at Node JS and Mongo DB. Hence I am not able to understand what is going wrong.