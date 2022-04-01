import joi from '@hapi/joi'

const validateUser = joi.object({
    firstName : joi.string().max(100).required(),
    lastName : joi.string().max(100).required(),
    userName : joi.string().max(100).required(),
    email : joi.string().email().required(),
    password : joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
})

export { validateUser }