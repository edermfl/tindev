const axios = require('axios');
const Dev = require('../models/Dev');

module.exports={
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
