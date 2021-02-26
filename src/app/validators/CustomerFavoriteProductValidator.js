import * as Yup from "yup";

const OBJECTID_REGEX = /^[0-9a-fA-F]{24}$/;
class CustomerValidator {
    async store(req, res, next) {
        try {
            const schema = Yup.object().shape({
                customerId: Yup.string().matches(OBJECTID_REGEX).required(),
                productId: Yup.string().matches(OBJECTID_REGEX).required(),
            });

            await schema.validate(req.params, { abortEarly: false });

            next();
        } catch (error) {
            return res.status(400).json({ error: "Validation fails" });
        }
    }

    async delete(req, res, next) {
        try {
            const schema = Yup.object().shape({
                customerId: Yup.string().matches(OBJECTID_REGEX).required(),
                productId: Yup.string().matches(OBJECTID_REGEX).required(),
            });

            await schema.validate(req.params, { abortEarly: false });

            next();
        } catch (error) {
            return res.status(400).json({ error: "Validation fails" });
        }
    }
}

export default new CustomerValidator();
