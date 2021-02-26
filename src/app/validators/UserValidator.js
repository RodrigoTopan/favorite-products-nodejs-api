import * as Yup from "yup";

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
            return res.status(400).json({ error: "Validation fails" });
        }
    }
}

export default new UserValidator();
