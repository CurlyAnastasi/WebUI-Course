const Joi = require('joi');

module.exports = Joi.object({
    products: Joi.string().pattern(new RegExp('[a-zA-Z]+')),
    manufactures: Joi.string().pattern(new RegExp('[a-zA-Z]+')),
    categories: Joi.string().pattern(new RegExp(/^(,?[0-9])+$/))
})