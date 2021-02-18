import { Test } from '../models/testTable.js'

export const getTestEndpoint = async (req, res) => {
    //Display the request body in terminal so we can test and debig it's the correct value
    console.log("Request body/content: " + req.body);

    // We try to save a user to the database
    try {
        // Get all result from db 
        const resultsInDb = await Test.find({});

        // If we want a scpecific result we can filter the search
        // const resultsInDb = await Test.find({text: "I want the text with this message"});

        // Print the results in terminal to debug
        console.log(resultsInDb);

        // send a response for the request
        // if you don't send a response, the request will not know if it was finished and it keeps loading
        res.json({ results: resultsInDb});


    } catch(err) {
        // if we have errors, we catch them and we send them as a response
        res.json(err);
    }
}