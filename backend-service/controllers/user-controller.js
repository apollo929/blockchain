const User = require("../models/User");

exports.Signup = (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
        //check for exisiting user
        User.findOne(
            { user_id: user_id }.then((user) => {
                if (user) return res.status(400).json("User already exists");

                //new user created
                const newUser = new User({
                    user_id,
                });
                newUser
                    .save()
                    .then(res.json("Successfully Registered"))
                    .catch((err) => console.log(err));
            })
        );
    } else {
        res.status(422).json(result.error.details[0].message);
    }
};

exports.ChangeProfile = (req, res) => {
    const {
        user_id,
        username,
        bio,
        email,
        instagram,
        tiktok,
        youtube,
        twitter,
        anothersocial,
    } = req.body;
    //check
    // User.findOne({user_id: user_id}.then(user) => {
    //     if(user) {
    //         return res.json(user);
    //     }else {

    //     }
    // })
};
