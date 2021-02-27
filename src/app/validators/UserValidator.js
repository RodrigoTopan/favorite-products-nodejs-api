import * as Yup from "yup";

import HttpError from "@utils/HttpError";

class UserValidator {
    async store(req, res, next) {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            next();
        } catch (error) {
            throw new HttpError("Validation fails", 400);
        }
    }
}

export default new UserValidator();
