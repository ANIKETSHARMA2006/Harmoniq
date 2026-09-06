import {User} from "../models/user.model.js"


const authCallback = async(req,res)=>{
    try {
        const {id,firstName,lastName,imageUrl} = req.body
        //check if user exists
        const user = await User.findOne({clerkId: id});

        if (!user) {
            await User.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl, 
            })
        }
        res.status(200).json({success: true});

    } catch (error) {
        console.log("Error in auth callback ", error);
        res.send(500).json({message: "Internal server error", error})
    }
}

export {
    authCallback,

}