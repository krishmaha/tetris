import { apiRouter } from '../apiRouter.js'

export const signin_userpwd = async (req, res) => {

    const userpwd = req.body;
    
    console.log(req.body)

    // const check = userpwd[0].password == req.body.password 
    
    // if (check==true){
    //     res.json({ message: "Accepted"});
    //     console.log('Accepted') 
    // } else {
    //     res.json({ message: "Rejected"});
    //     console.log('Rejected') 
    // }
    
    return userpwd;
}