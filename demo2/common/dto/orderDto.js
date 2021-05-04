const Joi = require('joi');

module.exports = Joi.object({
    products: Joi.array().items(Joi.object({
        id: Joi.number().required(),
        count:Joi.number().required()
    }))
})