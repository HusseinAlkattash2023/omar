const router = require("express").Router()
const User = require("../models/user");
const bcrypt = require("bcrypt");


// ================== get all users =============//
router.get("/users" , async(req , res) => {
    try{
        const user = await User.find({})
        res.status(200).json(user);
    }catch(error){
        res.status(400).json(error)
    }
})

// ---- get user by id -----
router.get("/:id" , async(req , res) => {
    try{
        const user = await User.findById(req.params.id)
        const{password , ...other} = user._doc
        res.status(200).json(other);
    }catch(error){
        res.status(400).json(error)
    }
})


//----update----
router.put("/:id" , async(req , res)=>{
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password , salt);
        }
        try{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {
                    new:true
                }
            )
            res.status(200).json(updateUser)
        }catch(error){
            res.status(500).json(error);
        }
})


//---- delete user ----
router.delete("/:userId", async (req, res) => {
    try{
    let userId = req.params.userId;
    await User.deleteOne({_id: userId});
    res.status(200).json("user has been deleted...")
    }catch(error){
        res.status(500).json(error)
    }
});

module.exports = router;

