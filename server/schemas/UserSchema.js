const Joi = require('joi');


const UserSchema = Joi.object({
    username: Joi.string().required().min(4),
    password: Joi.string().required().min(4),
    isAdmin: Joi.boolean().required()
})


module.exports = UserSchema;