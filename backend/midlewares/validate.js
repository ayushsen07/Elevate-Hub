const joi = require("joi")

const httpStatus = require("../utils/httpStatus")
const ApiError = require('../helper/apiError.js')
// const { schema } = require("../models/user.model.js")

const validationSource = {
    BODY: 'body',
    QUERY: 'query',
    PARAM: 'params',
    HEADER: 'headers'
}

module.exports = (schema, source = validationSource.BODY) => {
    return (req, res, next) => {
        console.log("Validate.js is running on path:", req.path);

        try {
            const { error } = schema.validate(req[source]);
            if (!error) return next();
            const { details } = error;
            const message = details.map((i) => i.message.replace(/['"]+/g, "")).join(",")
            console.log(message)
            next(new ApiError(httpStatus.badrequest, message))
        } catch (error) {
            next(error)
        }
    }
}