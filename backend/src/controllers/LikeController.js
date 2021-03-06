const axios = require('axios');
const Dev = require('../models/Dev');

module.exports={
    async store(req, res){
        const {devId} = req.params;
        const {user} = req.headers;

        console.log(devId);
        console.log(user);

        const loggedDev = await Dev.findById(user);
        console.log(loggedDev)
        const targetDev = await Dev.findById(devId);
        console.log(targetDev)
        if(!targetDev){
            return res.status(400).json({error: "Dev not exists"});
        }
        if(targetDev.likes.includes(loggedDev._id)){
            console.log("Deu match");
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);


    }
};
