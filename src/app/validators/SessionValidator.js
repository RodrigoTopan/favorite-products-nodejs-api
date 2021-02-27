import Joi from "@hapi/joi";

import HttpError from "@utils/HttpError";

class SessionValidator {
    store(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            throw new HttpError("Validation Failed", 400);
        }

        next();
    }
}

export default new SessionValidator();
