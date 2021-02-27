import * as Yup from "yup";

import HttpError from "@utils/HttpError";

class CustomerValidator {
    async index(req, res, next) {
        try {
            const schema = Yup.object().shape({
                page: Yup.number().required(),
            });

            await schema.validate(req.query, { abortEarly: false });

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }

    async store(req, res, next) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }

    async update(req, res, next) {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().required(),
                name: Yup.string().required(),
                email: Yup.string().email().required(),
            });

            await schema.validate(
                { ...req.body, ...req.params },
                { abortEarly: false }
            );

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }

    async delete(req, res, next) {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().required(),
            });
            await schema.validate(req.params, { abortEarly: false });

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }
}

export default new CustomerValidator();
