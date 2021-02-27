import Joi from "@hapi/joi";

import joiObjectid from "joi-objectid";

import HttpError from "@utils/HttpError";

Joi.objectId = joiObjectid(Joi);

class CustomerValidator {
    index(req, res, next) {
        const schema = Joi.object({
            page: Joi.number().required(),
        });

        const { error } = schema.validate(req.query, { abortEarly: false });

        if (error) {
            throw new HttpError("Validation Failed", 400);
        }

        next();
    }

    store(req, res, next) {
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            throw new HttpError("Validation Failed", 400);
        }

        next();
    }

    update(req, res, next) {
        const schema = Joi.object({
            id: Joi.objectId().required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        });

        const { error } = schema.validate({ ...req.body, ...req.params });
        if (error) {
            throw new HttpError("Validation Failed", 400);
        }

        next();
    }

    delete(req, res, next) {
        const schema = Joi.object({
            id: Joi.objectId().required(),
        });

        const { error } = schema.validate(req.params);
        if (error) {
            throw new HttpError("Validation Failed", 400);
        }

        next();
    }
}

export default new CustomerValidator();
