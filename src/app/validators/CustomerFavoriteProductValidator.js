import * as Yup from "yup";

import HttpError from "@utils/HttpError";

class CustomerValidator {
    async store(req, res, next) {
        try {
            const schema = Yup.object().shape({
                customerId: Yup.string().required(),
                productId: Yup.string().required(),
            });

            await schema.validate(req.params, { abortEarly: false });

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }

    async delete(req, res, next) {
        try {
            const schema = Yup.object().shape({
                customerId: Yup.string().required(),
                productId: Yup.string().required(),
            });

            await schema.validate(req.params, { abortEarly: false });

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }
}

export default new CustomerValidator();
