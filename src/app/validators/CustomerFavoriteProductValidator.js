import Joi from "@hapi/joi";
import HttpError from "@utils/HttpError";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi);

class CustomerValidator {
    store(req, res, next) {
        const schema = Joi.object({
            customerId: Joi.objectId().required(),
            productId: Joi.string().guid().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            throw new HttpError("Validation Failed", 400);
        }

        next();
    }

    delete(req, res, next) {
        const schema = Joi.object({
            customerId: Joi.objectId().required(),
            productId: Joi.string().guid().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            throw new HttpError("Validation Failed", 400);
        }
        next();
    }
}

export default new CustomerValidator();
