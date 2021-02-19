import { User } from '../models/user.js'

export const checkUserEndpoint = async (req, res) => {

    const userpwd = await User.find({username:req.body.username});
    // debugger;
    console.log(req.body);

    const check = userpwd[0].password == req.body.password 
    
    if (check==true){
       res.json({ message: "Accepted"});
        console.log('Accepted');
        // return re
    } else {
        res.json({message: "Rejected"});
        console.log('Rejected') 
        return rejected
    }
    
    return res;
}
