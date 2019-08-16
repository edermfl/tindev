const axios = require('axios');
const Dev = require('../models/Dev');

module.exports={
    async index(req, res){
        console.log(req.headers);
        if(!req.headers){
            return res.status(400).json({error: "Header not found!"})
        }
        const {user} = req.headers;
        console.log(user);

        const loggedUser = await Dev.findById(user);
        const users = await Dev.find({
            $and:[
                {_id: {$ne: user} },
                {_id: {$nin: loggedUser.likes} },
                {_id: {$nin: loggedUser.dislikes} }
            ],
        })
        return res.json(users);
    },

    async store(req, res){
        const {username} = req.body;

        const userExists = await Dev.findOne({user: username});
        if(userExists){
            return res.json(userExists);
        }
        console.log(`https://api.github.com/users/${username}`);
        const response = await axios.get(`https://api.github.com/users/${username}`);
        const {name, bio, avatar_url} = response.data;

        const dev = await Dev.create({ 
            name: name ? name : username,
            user: username,
            bio: bio,
            avatar: avatar_url
         })

        return res.json(dev);
    }
};
