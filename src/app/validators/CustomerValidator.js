import * as Yup from "yup";

const OBJECTID_REGEX = /^[0-9a-fA-F]{24}$/;
class CustomerValidator {
    async index(req, res, next) {
        try {
            const schema = Yup.object().shape({
                page: Yup.number().required(),
            });

            await schema.validate(req.query, { abortEarly: false });

            next();
        } catch (error) {
            return res.status(400).json({ error: "Validation fails" });
        }
    }

    async store(req, res, next) {
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().required(),
            });

            await schema.validate(req.body, { abortEarly: false });

            next();
        } catch (error) {
            return res.status(400).json({ error: "Validation fails" });
        }
    }

    async update(req, res, next) {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().matches(OBJECTID_REGEX).required(),
                name: Yup.string().required(),
                email: Yup.string().required(),
            });

            await schema.validate(
                { ...req.body, ...req.params },
                { abortEarly: false }
            );

            next();
        } catch (error) {
            return res.status(400).json({ error: "Validation fails" });
        }
    }

    async delete(req, res, next) {
        try {
            const schema = Yup.object().shape({
                id: Yup.string().matches(OBJECTID_REGEX).required(),
            });
            await schema.validate(req.params, { abortEarly: false });

            next();
        } catch (error) {
            return res.status(400).json({ error: "Validation fails" });
        }
    }
}

export default new CustomerValidator();
