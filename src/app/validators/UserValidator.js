import Joi from "@hapi/joi";
import HttpError from "@utils/HttpError";

class UserValidator {
    async store(req, res, next) {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            throw new HttpError("Validation fails", 400);
        }

        next();
    }
}

export default new UserValidator();
